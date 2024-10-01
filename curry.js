export const cCurry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const mult = cCurry((a, b) => a * b);
console.log(mult(1)(3));

const mult5 = mult(5);
console.log(mult5(7));