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

let names = [];
for (const p of products) {
    names.push(p.name);
}

names = products.map(p => p.name);

// 이터러블 프로토콜을 따르는 개체를 순회하는 Custom Map
export const cMap = (cb, iter) => {
    let res = [];
    for (const i of iter) {
        res.push(cb(i));
    }
    return res;
}
const cNames = cMap(p => p.name, products);

// console.log(document.querySelectorAll("*").map(el => el.nodeName));
if (global.document) {
    console.log(cMap(el => el.nodeName, document?.querySelectorAll("*")));
    const iterator = document?.querySelectorAll("*")[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}

function* gen() {
    yield 1;
    if (Math.random() > 0.3) yield 3;
    yield 5;
}
console.log(cMap(val => val * val, gen()));

let m = new Map();
m.set("a", 10);
m.set("b", 30);
m.set("c", 50);
const it = m[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());

// const nM = cMap(new Map(([k, v]) => [k, v * 3]), m);