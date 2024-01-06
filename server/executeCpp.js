const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, userInput) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  try {
    // Compile the C++ source file and capture both stdout and stderr
    const compileCommand = `g++ ${filepath} -o ${outPath} 2>&1`;
    const childCompile = execSync(compileCommand, {
      input: userInput,
      stdio: "pipe",
    });

    const compilationOutput = removeFilePathFromError(childCompile.toString());

    if (compilationOutput) {
      // Compilation error
      return { error: true, message: compilationOutput };
    }

    // Execute the compiled binary based on the operating system and capture its stdout
    let childExecute;
    if (os.platform() === "win32") {
      if (
        childCompile
          .toString()
          .includes(
            "Windows Subsystem for Linux has no installed distributions"
          )
      ) {
        return {
          error: true,
          message:
            "Compilation error: Windows Subsystem for Linux is not configured.",
        };
      }
      childExecute = execSync(`${outPath}`, {
        input: userInput,
        stdio: "pipe",
      });
    } else {
      const command = `./${jobId}.out`;

      // Execute with timeout
      const timeout = 5000; // 5 seconds in milliseconds

      childExecute = new Promise((resolve, reject) => {
        const childProcess = exec(
          command,
          { input: userInput },
          (error, stdout, stderr) => {
            if (error) {
              reject(removeFilePathFromError(stderr.toString()));
            } else {
              resolve(stdout.toString());
            }
          }
        );

        const timer = setTimeout(() => {
          childProcess.kill(); // Terminate the process if it exceeds the time limit
          reject({ error: true, message: "Time Limit Exceeded" });
        }, timeout);
      });
    }

    return Promise.race([
      childExecute,
      new Promise((_, reject) => {
        setTimeout(() => {
          reject({ error: true, message: "Time Limit Exceeded" });
        }, timeout);
      }),
    ])
      .then((executionOutput) => {
        // Perform deletion of the output file after execution
        fs.unlinkSync(outPath); // Delete the compiled output file

        return { error: false, message: executionOutput.toString() }; // Convert output to string
      })
      .catch((error) => {
        // If there's an error during execution, still attempt to delete the output file
        try {
          fs.unlinkSync(outPath); // Delete the compiled output file
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }

        return { error: true, message: error.toString() }; // Convert error to string
      });
  } catch (error) {
    return {
      error: true,
      message: removeFilePathFromError(error.stdout.toString()),
    };
  }
};

function removeFilePathFromError(errorOutput) {
  const pathRemovedError = errorOutput.replace(/\S+\:\S+\:\S+\:\S+\:/g, "");
  return pathRemovedError.trim();
}

module.exports = {
  executeCpp,
};
