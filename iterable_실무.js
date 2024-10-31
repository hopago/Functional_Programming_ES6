import { reduceGo } from "./go.js";
import { L } from "./프로토콜_지연평가.js";
import { take } from "./take.js";
import { cReduce } from "./reduce.js";

const log = v => console.log(v);

const users = [
    {
        name: "u1",
        age: 20,
        family: [
            { name: "u11", age: 40 },
            { name: "u12", age: 50 },
        ],
    },
    {
        name: "u2",
        age: 21,
        family: [
            { name: "u21", age: 60 },
            { name: "u22", age: 70 },
        ],
    },
    {
        name: "u3",
        age: 22,
        family: [
            { name: "u31", age: 20 },
            { name: "u32", age: 30 },
        ],
    },
];

log(
    reduceGo(
        users,
        L.map(u => u.family),
        L.flatten,
        L.filter(u => u.age > 20),
        L.map(u => u.age),
        take(5),
        ages => {
            const sum = cReduce((acc, age) => acc + age, 0, ages);
            return Math.round(sum / ages.length);
        }
    )
);