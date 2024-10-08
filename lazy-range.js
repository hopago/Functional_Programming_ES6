import {
    cReduce
} from "./reduce.js";

console.log("lazy-range")

const log = value => console.log(value);

const add = (a, b) => a + b;

export const L = {};
L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        log(i, "lazy-range")
        yield i;
    }
};

var list = L.range(4);
log(cReduce(add, list));

function test(name, time, f) {
    console.time(name);
    while (time--) f();
    console.timeEnd(name);
}

test("L.range", 10, () => cReduce(add, L.range(100)))