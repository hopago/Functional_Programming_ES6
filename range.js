import {
    cReduce
} from "./reduce.js";

console.log("range")

const log = value => console.log(value);

const add = (a, b) => a + b;

export const range = l => {
    let i = -1;
    let res = [];

    while (++i < l) {
        res.push(i)
    }

    return res;
};

log(range(5));
log(range(3));

var list = range(4);
log(cReduce(add, list));
