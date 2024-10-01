import { reduceGo } from "./go.js";

export const cPipe = (f, ...fs) => (...params) => reduceGo(f(...params), ...fs);

const f = cPipe(
    (a, b) => a + b,
    a => a + 1,
    a => a + 11,
    a => a + 111,
);

console.log(f(0, 1));