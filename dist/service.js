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
exports.getAverageAge = exports.sortStudentsByGrade = exports.getStudentNames = exports.filterPassedStudents = exports.createOrder = void 0;
const pgConfig_1 = __importDefault(require("./pgConfig"));
function createOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO orders (orderID) VALUES ($1)';
        yield pgConfig_1.default.query(query, [orderID]);
    });
}
exports.createOrder = createOrder;
function filterPassedStudents(students) {
    return students.filter((student) => student.grade >= 50);
}
exports.filterPassedStudents = filterPassedStudents;
function getStudentNames(students) {
    return students.map((student) => student.name);
}
exports.getStudentNames = getStudentNames;
function sortStudentsByGrade(students) {
    return students.slice().sort((a, b) => a.grade - b.grade);
}
exports.sortStudentsByGrade = sortStudentsByGrade;
function getAverageAge(students) {
    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
}
exports.getAverageAge = getAverageAge;
