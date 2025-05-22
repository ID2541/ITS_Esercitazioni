class Course {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.students = [];
        this.teachers = [];
        this.tutors = [];
        this.subjects = [];
    }

    getDetails() {
        return `Course Name: ${this.name}, Duration: ${this.duration} months`;
    }

    AddStudent(student) {
        this.students.push(student);
    }

    removeStudent(student) {
        const index = this.students.indexOf(student);
        if (index > -1) {
            this.students.splice(index, 1);
        }
    }

    getStudents() {
        return this.students;
    }

    AddTeacher(teacher) {
        this.teachers.push(teacher);
    }

    removeTeacher(teacher) {
        const index = this.teachers.indexOf(teacher);
        if (index > -1) {
            this.teachers.splice(index, 1);
        }
    }

    getTeachers() {
        return this.teachers;
    }

    AddTutor(tutor) {
        this.tutors.push(tutor);
    }

    removeTutor(tutor) {
        const index = this.tutors.indexOf(tutor);
        if (index > -1) {
            this.tutors.splice(index, 1);
        }
    }

    getTutors() {
        return this.tutors;
    }

    AddSubject(subject) {
        this.subjects.push(subject);
    }

    removeSubject(subject) {
        const index = this.subjects.indexOf(subject);
        if (index > -1) {
            this.subjects.splice(index, 1);
        }
    }

    getSubjects() {
        return this.subjects;
    }

    getStudentCount() {
        return this.students.length;
    }

    getTeacherCount() {
        return this.teachers.length;
    }

    getTutorCount() {
        return this.tutors.length;
    }

    getSubjectCount() {
        return this.subjects.length;
    }
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

class Student extends Person {
    constructor(name, age, studentId) {
        super(name, age);
        this.studentId = studentId;
        this.grades = {};
    }

    study() {
        console.log(`${this.name} is studying.`);
    }

    addGrade(subject, grade) {
        if (!this.grades[subject]) {
            this.grades[subject] = [];
        }
        this.grades[subject].push(grade);
    }

    getGrades() {
        return this.grades;
    }

    getAverage(subject) {
        const grades = this.grades[subject];
        if (!grades || grades.length === 0) return 0;
        const sum = grades.reduce((a, b) => a + b, 0);
        return sum / grades.length;
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    teach() {
        console.log(`${this.name} is teaching ${this.subject}.`);
    }
}

class Tutor extends Teacher {
    constructor(name, age, subject, studentId) {
        super(name, age, subject);
        this.studentId = studentId;
    }

    tutor() {
        console.log(`${this.name} is tutoring student with ID: ${this.studentId}.`);
    }
}

// === CREAZIONE OGGETTI ===

const student1 = new Student("Bob", 20, "S123");
const student2 = new Student("Anna", 21, "S124");
const student3 = new Student("Luca", 22, "S125");

const teacher1 = new Teacher("Charlie", 40, "Math");
const teacher2 = new Teacher("Laura", 35, "JavaScript");
const teacher3 = new Teacher("Marco", 38, "Web Design");

const tutor1 = new Tutor("David", 35, "Math", "S123");
const tutor2 = new Tutor("Sara", 33, "JavaScript", "S124");
const tutor3 = new Tutor("Elisa", 36, "Web Design", "S125");

// === CREAZIONE CORSO ===

const course = new Course("Full Stack Web Development", 6);

// Aggiunta di soggetti
course.AddSubject("JavaScript Basics");
course.AddSubject("Advanced JavaScript");
course.AddSubject("HTML & CSS");
course.AddSubject("Web Design");

// Aggiunta di studenti
course.AddStudent(student1);
course.AddStudent(student2);
course.AddStudent(student3);

// Aggiunta di docenti
course.AddTeacher(teacher1);
course.AddTeacher(teacher2);
course.AddTeacher(teacher3);

// Aggiunta di tutor
course.AddTutor(tutor1);
course.AddTutor(tutor2);
course.AddTutor(tutor3);

// === AGGIUNTA VOTI STUDENTI ===

student1.addGrade("JavaScript Basics", 28);
student1.addGrade("JavaScript Basics", 30);
student1.addGrade("Advanced JavaScript", 27);

student2.addGrade("JavaScript Basics", 25);
student2.addGrade("HTML & CSS", 29);
student2.addGrade("Web Design", 30);

student3.addGrade("Advanced JavaScript", 26);
student3.addGrade("Web Design", 28);
student3.addGrade("HTML & CSS", 27);

// === OUTPUT ===

console.log("\n----------------------------");
console.log(course.getDetails());
console.log("----------------------------");
console.log("Students:", course.getStudents().map(s => s.name));
console.log("Teachers:", course.getTeachers().map(t => t.name));
console.log("Tutors:", course.getTutors().map(t => t.name));
console.log("Subjects:", course.getSubjects());
console.log("----------------------------");

console.log("Student Count:", course.getStudentCount());
console.log("Teacher Count:", course.getTeacherCount());
console.log("Tutor Count:", course.getTutorCount());
console.log("Subject Count:", course.getSubjectCount());
console.log("----------------------------");

// === RIEPILOGO VOTI E MEDIE ===

const printStudentGrades = (student) => {
    console.log(`\nPagella di ${student.name} (ID: ${student.studentId})`);
    const grades = student.getGrades();
    for (const subject in grades) {
        const media = student.getAverage(subject).toFixed(2);
        console.log(` - ${subject}: voti = [${grades[subject].join(", ")}], media = ${media}`);
    }
};

printStudentGrades(student1);
printStudentGrades(student2);
printStudentGrades(student3);
console.log("\n----------------------------");
