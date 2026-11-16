// JavaScript Function

function greet(name) {
    return "Hello " + name;
}

console.log(greet("Rahul"));


// JavaScript Class

class Student {
    constructor(name, course) {
        this.name = name;
        this.course = course;
    }

    displayDetails() {
        console.log(
            "Name: " + this.name +
            ", Course: " + this.course
        );
    }
}


// Creating multiple objects from the same class

const student1 = new Student("Rahul", "BCA");
const student2 = new Student("Priya", "B.Sc");
const student3 = new Student("Arjun", "B.Tech");

student1.displayDetails();
student2.displayDetails();
student3.displayDetails();