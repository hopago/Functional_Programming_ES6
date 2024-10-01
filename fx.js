import {
    reduceGo
} from "./go.js"
import {
    cMap
} from "./map.js";
import {
    cFilter
} from "./filter.js";
import {
    cPipe,
} from "./pipe.js";
import {
    cReduce
} from "./reduce.js";
import { cCurry } from "./curry.js";

const log = value => console.log(value);

const products = [
    {
        name: "반팔티",
        price: 15000,
        reviewScore: 5,
        quantity: 1,
    },
    {
        name: "긴팔티",
        price: 20000,
        reviewScore: 4,
        quantity: 2,
    },
    {
        name: "핸드폰케이스",
        price: 15000,
        reviewScore: 3,
        quantity: 3,
    },
    {
        name: "후드티",
        price: 30000,
        reviewScore: 2,
        quantity: 4,
    },
    {
        name: "바지",
        price: 25000,
        reviewScore: 5,
        quantity: 1,
    }
];

const add = (a, b) => a + b;

const sum = cCurry((f, iter) => reduceGo(
    iter,
    cMap(f),
    cReduce(add),
));

const total_reviewScore = sum(p => p.reviewScore);
console.log(total_reviewScore(products))

const total_price = sum(p => p.price * p.quantity);
console.log(total_price(products))

document.querySelector("#cart").innerHTML = products.map((p, i) => {
    return `
        <table>
            <tr>
                <th>상품 이름</th>
                <th>가격</th>
                <th>수량</th>
                <th>총 가격</th>
            </tr>
            <tr>
                <td>${p.name}</td>
                <td>${p.price.toLocaleString()}</td>
                <td>
                  <input type="number" value="${p.quantity}" />
                </td>
                <td>${(p.price * p.quantity).toLocaleString()}</td>
            </tr>
        </table>
        <hr />
    `;
}).join("");

document.querySelector("#total").innerHTML = `
    <h1>총 합계</h1>
    <p>${total_price(products).toLocaleString()}</p>
`;