// ==========================================
// 1. ARROW FUNCTION
// ==========================================

const addMarks = (a, b) => {
    return a + b;
};

console.log("Total Marks:", addMarks(80, 90));


// ==========================================
// 2. ANONYMOUS FUNCTION
// ==========================================

const calculatePercentage = function(total, subjects) {
    return total / subjects;
};

console.log("Percentage:", calculatePercentage(450, 5));


// ==========================================
// 3. CALLBACK FUNCTION
// ==========================================

function processStudent(name, callback) {
    console.log("Student Name:", name);

    // Calling the callback function
    callback();
}

processStudent("Akshaya", function() {
    console.log("Student details processed successfully");
});


// ==========================================
// 4. CALLBACK FUNCTION WITH ARROW FUNCTION
// ==========================================

function calculateResult(marks, callback) {
    let total = marks[0] + marks[1] + marks[2];

    callback(total);
}

calculateResult([80, 85, 90], (total) => {
    console.log("Total:", total);
});


// ==========================================
// 5. CALLBACK HELL
// ==========================================

function getStudent(callback) {
    setTimeout(() => {
        console.log("1. Getting student details...");
        callback();
    }, 1000);
}

function getMarks(callback) {
    setTimeout(() => {
        console.log("2. Getting student marks...");
        callback();
    }, 1000);
}

function calculateResult2(callback) {
    setTimeout(() => {
        console.log("3. Calculating result...");
        callback();
    }, 1000);
}

function displayResult() {
    setTimeout(() => {
        console.log("4. Displaying final result");
    }, 1000);
}


// Nested callbacks = Callback Hell
getStudent(() => {

    getMarks(() => {

        calculateResult2(() => {

            displayResult();

        });

    });

});