const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

// if (!fs.existsSync(dirCodes)) {
//   fs.mkdirSync(dirCodes, { recursive: true });
// }
const generateFile = async (language, code) => {
  // console.log(language, code);
  const jobId = uuid();
  const fileName = `${jobId}.${language}`;
  // console.log(fileName);
  try {
    await fs.mkdir(dirCodes, { recursive: true });
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFile(filePath, code);
    return filePath;
  } catch (err) {
    throw err;
  }
};

const dirCodes2 = path.join(__dirname, "codeOutput");
const generateOutputFile = async (problemName, output) => {
  // console.log(language, code);
  const jobId = uuid();
  const fileName = `${problemName}.txt`;
  // console.log(fileName);
  try {
    await fs.mkdir(dirCodes, { recursive: true });
    const filePath = path.join(dirCodes2, fileName);
    await fs.writeFile(filePath, output);
    return filePath;
  } catch (err) {
    throw err;
  }
};

const deleteFile = async (filePath) => {
  if (fs.existsSync) {
    fs.unlink(filePath, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log("File deleted!");
    });
  } else {
    console.log("No such path exists");
  }
};

module.exports = {
  generateFile,
  deleteFile,
  generateOutputFile,
};
