"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const pgConfig_1 = __importDefault(require("./pgConfig"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
        return res.status(400).send('Invalid request payload');
    }
    try {
        const filteredOrders = items.filter((item) => {
            return item.OrderBlocks.lineNo % 3 !== 0;
        });
        for (const order of filteredOrders) {
            yield (0, service_1.createOrder)(order.orderID);
        }
        return res.status(200).send('Orders filtered and stored successfully');
    }
    catch (error) {
        console.error('Error filtering and storing orders:', error);
        return res.status(500).send('Internal Server Error');
    }
}));
//2. Excercise with the all array functions
app.post('/arrayfunctions', (req, res) => {
    try {
        const array = req.body.array;
        res.status(200).send('Array received successfully');
        // Concat
        const newArray1 = array.concat([6, 7, 8]);
        console.log("Concat:", newArray1);
        // LastIndexOf
        const index = array.lastIndexOf(3);
        console.log("LastIndexOf:", index);
        // Push
        array.push(6);
        console.log("Push:", array);
        // Splice
        const splicedArray = array.splice(1, 2);
        console.log("Splice:", splicedArray);
        // Pop
        const poppedItem = array.pop();
        console.log("Pop:", poppedItem);
        // Slice
        const slicedArray = array.slice(1, 3);
        console.log("Slice:", slicedArray);
        // map
        const mappedArray = array.map((item) => item * 2);
        console.log("Map:", mappedArray);
        // Shift
        const shiftedItem = array.shift();
        console.log("Shift:", shiftedItem);
        // Filter
        const filteredArray = array.filter((item) => item > 2);
        console.log("Filter:", filteredArray);
        // Unshift
        array.unshift(0);
        console.log("Unshift:", array);
        // ForEach
        array.forEach((item) => console.log("ForEach:", item));
        // Flat
        const nestedArray = [[1, 2], [3, 4], [5, 6]];
        const flattenedArray = nestedArray.flat();
        console.log("Flat:", flattenedArray);
        // Find
        const foundItem = array.find((item) => item === 3);
        console.log("Find:", foundItem);
        // Join
        const joinedString = array.join("-");
        console.log("Join:", joinedString);
        // FindIndex
        const foundIndex = array.findIndex((item) => item === 4);
        console.log("FindIndex:", foundIndex);
        // toString
        const stringRepresentation = array.toString();
        console.log("ToString:", stringRepresentation);
        // Some
        const someResult = array.some((item) => item > 3);
        console.log("Some:", someResult);
        // split
        const stringToSplit = "Hello World";
        const splitArray = stringToSplit.split(" ");
        console.log("Split:", splitArray);
        // Every
        const everyResult = array.every((item) => item > 0);
        console.log("Every:", everyResult);
        // replace
        const replacedString = stringToSplit.replace("World", "Universe");
        console.log("Replace:", replacedString);
        // Includes
        const includesResult = array.includes(3);
        console.log("Includes:", includesResult);
        // IndexOf
        const indexOfItem = array.indexOf(2);
        console.log("IndexOf:", indexOfItem);
    }
    catch (err) {
        console.error('Error receiving array:', err);
        res.status(500).send('Internal Server Error');
    }
});
//4
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
console.log("Students who passed:");
console.log((0, service_1.filterPassedStudents)(students));
console.log("\nStudent names:");
console.log((0, service_1.getStudentNames)(students));
console.log("\nStudents sorted by grade:");
console.log((0, service_1.sortStudentsByGrade)(students));
console.log("\nAverage age of students:");
console.log((0, service_1.getAverageAge)(students));
// 5. Table existence check function
function checkTableExistence() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pgConfig_1.default.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders')");
            const exists = result.rows[0].exists;
            if (!exists) {
                yield pgConfig_1.default.query("CREATE TABLE orders (id SERIAL PRIMARY KEY, orderID CHARACTER VARYING(255))");
                console.log("table is not exists ");
            }
            else {
                console.log("table  exists ");
            }
        }
        catch (err) {
            console.error('Error checking table existence:', err);
        }
    });
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
