import { cReduce } from "./reduce.js";
import { cFilter } from "./filter.js";
import { cMap } from "./map.js";

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

const add = (a, b) => a + b;
const priceList = cReduce(
    add,
    cMap(p => p.price,
        cFilter(p => p.price < 20000, products)));

console.log(priceList);

console.log(
    cReduce(
        add,
        cMap(p => p.price,
            cFilter(p => p.price < 20000, products)
        ) // 숫자로 이루어진 배열로 평가
    )
)