// Array 
let numbers = [10, 20, 30, 40, 50]; 
// Function to calculate sum 
function calculateSum(arr) { 
    let sum = 0; 
    for (let i = 0; i < arr.length; i++) { 
        sum = sum + arr[i]; 
    }  
    return sum; 
} 
// Function to calculate average 
function calculateAverage(arr) { 
    return calculateSum(arr) / arr.length; 
} 
// Function calls 
let sum = calculateSum(numbers); 
let average = calculateAverage(numbers); 
// Display output 
console.log("Array:", numbers); 
console.log("Sum:", sum); 
console.log("Average:", average); 
