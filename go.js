import { cReduce } from "./reduce.js";

export const reduceGo = (...args) => cReduce((a, f) => f(a), args);

reduceGo(
    10,
    a => a + 1,
    a => a + 1,
    a => a + 101,
    a => console.log(a)
)
