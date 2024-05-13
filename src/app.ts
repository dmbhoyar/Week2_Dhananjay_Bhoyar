import express, { Request, Response } from 'express';
import { Student, createOrder, filterPassedStudents, getStudentNames, sortStudentsByGrade,getAverageAge} from './service';
import pool from './pgConfig';

const app = express();
app.use(express.json());

app.post('/orders', async (req: Request, res: Response) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items)) {
    return res.status(400).send('Invalid request payload');
  }

  try {
    const filteredOrders = items.filter((item: any) => {
      return item.OrderBlocks.lineNo % 3 !== 0;
    });

    for (const order of filteredOrders) {
      await createOrder(order.orderID);
    }

    return res.status(200).send('Orders filtered and stored successfully');
  } catch (error) {
    console.error('Error filtering and storing orders:', error);
    return res.status(500).send('Internal Server Error');
  }
});



//2. Excercise with the all array functions
app.post('/arrayfunctions', (req: Request, res: Response) => {
    try {
         const array: any[] = req.body.array;
        res.status(200).send('Array received successfully');

            // Concat
            const newArray1: number[] = array.concat([6, 7, 8]);
            console.log("Concat:", newArray1);

            // LastIndexOf
            const index: number = array.lastIndexOf(3);
            console.log("LastIndexOf:", index);

            // Push
            array.push(6);
            console.log("Push:", array);

            // Splice
            const splicedArray: number[] = array.splice(1, 2);
            console.log("Splice:", splicedArray);

            // Pop
            const poppedItem: number | undefined = array.pop();
            console.log("Pop:", poppedItem);



            // Slice
            const slicedArray: number[] = array.slice(1, 3);
            console.log("Slice:", slicedArray);

            // map
            const mappedArray: number[] = array.map((item) => item * 2);
            console.log("Map:", mappedArray);

            // Shift
            const shiftedItem: number | undefined = array.shift();
            console.log("Shift:", shiftedItem);

            // Filter
            const filteredArray: number[] = array.filter((item) => item > 2);
            console.log("Filter:", filteredArray);

            // Unshift
            array.unshift(0);
            console.log("Unshift:", array);

            // ForEach
            array.forEach((item) => console.log("ForEach:", item));

            // Flat
            const nestedArray: number[][] = [[1, 2], [3, 4], [5, 6]];
            const flattenedArray: number[] = nestedArray.flat();
            console.log("Flat:", flattenedArray);

            // Find
            const foundItem: number | undefined = array.find((item) => item === 3);
            console.log("Find:", foundItem);

            // Join
            const joinedString: string = array.join("-");
            console.log("Join:", joinedString);

            // FindIndex
            const foundIndex: number = array.findIndex((item) => item === 4);
            console.log("FindIndex:", foundIndex);

            // toString
            const stringRepresentation: string = array.toString();
            console.log("ToString:", stringRepresentation);

            // Some
            const someResult: boolean = array.some((item) => item > 3);
            console.log("Some:", someResult);

            // split
            const stringToSplit: string = "Hello World";
            const splitArray: string[] = stringToSplit.split(" ");
            console.log("Split:", splitArray);

            // Every
            const everyResult: boolean = array.every((item) => item > 0);
            console.log("Every:", everyResult);

            // replace
            const replacedString: string = stringToSplit.replace("World", "Universe");
            console.log("Replace:", replacedString);
            
            // Includes
            const includesResult: boolean = array.includes(3);
            console.log("Includes:", includesResult);

            // IndexOf
            const indexOfItem: number = array.indexOf(2);
            console.log("IndexOf:", indexOfItem);
        
    } catch (err) {
        console.error('Error receiving array:', err);
        res.status(500).send('Internal Server Error');
    }
});


//4
const students: Student[] = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];


console.log("Students who passed:");
console.log(filterPassedStudents(students));

console.log("\nStudent names:");
console.log(getStudentNames(students));

console.log("\nStudents sorted by grade:");
console.log(sortStudentsByGrade(students));

console.log("\nAverage age of students:");
console.log(getAverageAge(students));


// 5. Table existence check function
async function checkTableExistence(): Promise<void> {
    try {
        const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders')");
        const exists = result.rows[0].exists;
        if (!exists) {
            await pool.query("CREATE TABLE orders (id SERIAL PRIMARY KEY, orderID CHARACTER VARYING(255))");
            console.log("table is not exists ")
        }
        else {
            console.log("table  exists ")
        
        }
    } catch (err) {
        console.error('Error checking table existence:', err);
    }
}

// Check table existence when the server starts
checkTableExistence().then(() => {
    // Start the server
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.error('Error starting server:', err);
});