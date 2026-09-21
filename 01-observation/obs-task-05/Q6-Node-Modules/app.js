const os = require("os");
const path = require("path");
const fs = require("fs");


// OS Module

console.log("Operating System Information");
console.log("----------------------------");

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Home Directory:", os.homedir());
console.log("CPU Cores:", os.cpus().length);


// Path Module

console.log("\nPath Module");
console.log("-----------");

const filePath = path.join(
    "students",
    "data",
    "student.txt"
);

console.log("File Path:", filePath);
console.log("File Name:", path.basename(filePath));
console.log("Directory:", path.dirname(filePath));


// File System Module

console.log("\nFile System Module");
console.log("------------------");

const fileName = "student.txt";
const content = "Rahul - BCA";

fs.writeFileSync(fileName, content);

console.log("File created successfully.");

const data = fs.readFileSync(fileName, "utf8");

console.log("File Content:", data);