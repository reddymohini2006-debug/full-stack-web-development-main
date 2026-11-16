const _ = require("lodash");

const studentName = "rahul reddy";

const formattedName = _.startCase(studentName);

console.log("Original Name:", studentName);
console.log("Formatted Name:", formattedName);

const numbers = [10, 20, 30, 40, 50];

console.log("Sum:", _.sum(numbers));
console.log("Maximum:", _.max(numbers));
console.log("Minimum:", _.min(numbers));