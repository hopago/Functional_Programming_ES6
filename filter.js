import { cCurry } from "./curry.js";

const products = [
    {
        name: "반팔티",
        price: 15000
    },
    {
        name: "긴팔티",
        price: 20000
    },
    {
        name: "핸드폰케이스",
        price: 15000,
    },
    {
        name: "후드티",
        price: 30000
    },
    {
        name: "바지",
        price: 25000
    }
];

let under20000 = [];
for (const p of products) {
    if (p.price < 20000) {
        under20000.push(p);
    }
}
console.log(under20000);

export const cFilter = cCurry((condition, iter) => {
    const res = [];

    for (const a of iter) {
        if (condition(a)) res.push(a)
    }

    return res;
});

console.log(cFilter(p => p.price < 20000, products));

const iter = cFilter(p => p.price < 20000, products)[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(cFilter(n => n % 2, function* () {
    yield 1
    yield 2
    yield 3
}()));