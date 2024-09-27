const nums = [1, 2, 3, 4, 5];

let total = 0;

for (const n of nums) {
    total += n;
}

console.log(total);

export const cReduce = (cb, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]()
        acc = iter.next().value;
    }

    for (const i of iter) {
        acc = cb(acc, i)
    }

    return acc;
};

const add = (a, b) => a + b;

console.log(cReduce(add, 0, [1, 2, 3]));
console.log(cReduce(add, "", ["1", 2, "3"]));
console.log(cReduce(() => add(2, add(3, 4)), 0, [1]))
console.log(cReduce(add, [1, 2, 3]))

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

console.log(cReduce((total, product) => total + product.price, 0, products));
