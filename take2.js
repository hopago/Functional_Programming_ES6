import { cCurry } from "./curry.js";
import { cFilter } from "./filter.js";
import { reduceGo } from "./go.js";
import { cMap } from "./map.js";
import { take } from "./take.js";
import { L } from "./프로토콜_지연평가.js";

const log = v => console.log(v);

const users = [
    { age: 32 },
    { age: 24 },
    { age: 21 },
    { age: 39 },
    { age: 20 },
    { age: 30 },
    { age: 39 },
    { age: 10 },
    { age: 18 },
    { age: 32 },
];

const find = cCurry((f, iter) => reduceGo(
    iter,
    L.filter(f),
    take(1),
    ([a]) => a,
));

console.clear();
log(find((u) => u.age < 30)(users));

console.clear();
reduceGo(
    users,
    L.map(u => u.age),
    find(n => n < 30),
    log
); 