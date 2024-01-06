const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executePython = (filepath, userInput) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  try {
    // Execute the Python source file and capture both stdout and stderr
    const executeCommand = `python ${filepath} 2>&1`;
    const childExecute = execSync(executeCommand, {
      input: userInput,
      stdio: "pipe",
    });

    const executionOutput = childExecute.toString().trim(); // Trim any leading/trailing spaces

    if (executionOutput) {
      // Split output by newline characters to get an array of lines
      const lines = executionOutput.split(/\r?\n/);
      const formattedOutput = lines.join("\n"); // Join array elements with newline character
      return { error: false, message: formattedOutput }; // Return formatted output as a string
    }

    return { error: false, message: "" }; // No output
  } catch (error) {
    return {
      error: true,
      message: removeFilePathFromError(error.stdout.toString()),
    };
  } finally {
    try {
      // Delete the output file after execution
      if (fs.existsSync(outPath)) {
        fs.unlinkSync(outPath);
      }
    } catch (unlinkError) {
      console.error("Error deleting file:", unlinkError);
    }
  }
};

function removeFilePathFromError(errorOutput) {
  const pathRemovedError = errorOutput.replace(/\S+\:\d+\:/g, "");
  return pathRemovedError.trim();
}

module.exports = {
  executePython,
};
