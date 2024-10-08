import { take } from "./take.js";
import { cReduce } from "./reduce.js";
import { reduceGo } from "./go.js";
import { cMap } from "./map.js";
import { cFilter } from "./filter.js";
import { cCurry } from "./curry.js";

console.clear(); // node 프로토콜_지연평가.js

const log = value => console.log(value);

const L = {};

L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        log(i, "lazy-range")
        yield i;
    }
};

// L.map
L.map = cCurry(function* (f, iterable) {
    let cur;

    const iter = iterable[Symbol.iterator]();
    while (!(cur = iter.next()).done) {
        const item = cur.value;
        yield f(item);
    }
});

// 값 선언 자체로 평가 X, 값을 호출 할 때 평가, 필요한 시점에 평가된다
var it = L.map(v => v + 10, [1, 2, 3]);
const arr = [...it];
console.log(arr);

// L.filter
L.filter = cCurry(function* (f, iterable) {
    let cur;

    const iter = iterable[Symbol.iterator]();
    while (!(cur = iter.next()).done) {
        const item = cur.value;
        if (f(item)) yield item;
    }
})

var it = L.filter(v => v % 2, [1, 2, 3, 4, 5]);
var arr1 = [...it];
console.log(arr1);

console.clear();

console.log("프로토콜 지연평가")

reduceGo(L.range(10), L.map(n => n + 10), L.filter(n => n % 2), take(3), log);