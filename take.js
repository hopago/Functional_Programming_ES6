import { range } from "./range.js";
import { L } from "./lazy-range.js";
import { cCurry } from "./curry.js";
import { reduceGo } from "./go.js";
import { cReduce } from "./reduce.js";

const arr = range(10);
const add = (a, b) => a + b;
const log = value => console.log(value);

export const take = cCurry((limit, iterable) => {
    let res = [];

    let cur;

    const iter = iterable[Symbol.iterator]();
    while (!(cur = iter.next()).done) {
        const item = cur.value;
        res.push(item);
        if (res.length === limit) return res;
    }

    return res;
});

console.clear();
log(take(5, arr));
log(take(5, L.range(Infinity)));

reduceGo(
    L.range(100),
    take(10),
    cReduce(add),
    log,
)