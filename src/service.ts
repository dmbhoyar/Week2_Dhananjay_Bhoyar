
import pool from './pgConfig';


async function createOrder(orderID: string): Promise<void> {
  const query = 'INSERT INTO orders (orderID) VALUES ($1)';
  await pool.query(query, [orderID]);
}


interface Student {
    name: string;
    age: number;
    grade: number;
}

function filterPassedStudents(students: Student[]): Student[] {
    return students.filter((student) => student.grade >= 50);
}

function getStudentNames(students: Student[]): string[] {
    return students.map((student) => student.name);
}

 function sortStudentsByGrade(students: Student[]): Student[] {
    return students.slice().sort((a, b) => a.grade - b.grade);
}

 function getAverageAge(students: Student[]): number {
    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
}



export { Student, createOrder, filterPassedStudents, getStudentNames, sortStudentsByGrade,getAverageAge};
