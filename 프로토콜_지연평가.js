import { take } from "./take.js";
import { cReduce } from "./reduce.js";
import { reduceGo } from "./go.js";
import { cMap } from "./map.js";
import { cFilter } from "./filter.js";
import { cCurry } from "./curry.js";
import { cPipe } from "./pipe.js";

console.clear(); // node 프로토콜_지연평가.js

const log = value => console.log(value);

export const L = {};

L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        log(i, "lazy-range")
        yield i;
    }
};

// L.map
L.map = cCurry(function* (f, iterable) {
    for (const i of iterable) yield f(i)
});

// 값 선언 자체로 평가 X, 값을 호출 할 때 평가, 필요한 시점에 평가된다
var it = L.map(v => v + 10, [1, 2, 3]);
const arr = [...it];
console.log(arr);

// L.filter
L.filter = cCurry(function* (f, iterable) {
    for (const i of iterable) if (f(i)) yield i;
})

var it = L.filter(v => v % 2, [1, 2, 3, 4, 5]);
var arr1 = [...it];
console.log(arr1);

console.clear();

console.log("프로토콜 지연평가")

reduceGo(L.range(10), L.map(n => n + 10), L.filter(n => n % 2), take(3), log);

/** Map filter 결합 법칙 
 * 사용하는 데이터 타입 무관
 * 보조 함수와 순수 함수라면 무엇이든
 * 결합한다면 결과가 같다
 * 
 * [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
 * =
 * [[mapping, filtering, mapping], [mapping, filtering, mapping]]
*/

/**
 * L.flatten
 * [...[1, 2], 3, 4, ...[5, 6, 7], 8, ...[9]]
 */

console.clear();

export const isIterable = i => i && i[Symbol.iterator];

L.flatten = function* (iterable) {
    for (const i of iterable) {
        if (isIterable(i)) yield* i;
        else yield i;
    }
}

L.deepFlat = function* f(iterable) {
    for (const i of iterable) {
        if (isIterable(i)) yield* f(i);
        else yield i;
    }
}

var it = L.flatten([...[1, 2], 3, 4, ...[5, 6, 7], 8, ...[9]]);
console.log([...it]);

export const flatten = cPipe(L.flatten, take(Infinity));
console.log(flatten([...[1, 2], 3, 4, ...[5, 6, 7], 8, ...[9]]))

// export const map = cCurry(cPipe(reduceGo(
//     L.map,
//     take(Infinity),
// )));

// export const filter = cCurry(cPipe(L.filter, take(Infinity)))

console.clear();
// flatMap, L.flatMap
console.log([[1, 2, 3], [4, 5, 6], [7, 8, 9, [10, 11, 12]]].flatMap(a => a));
console.log([[1, 2, 3], [4, 5, 6], [7, 8, 9, [10, 11, 12]]].flatMap((a) => a.flatMap((a) => {
    if (Array.isArray(a)) {
        const val = a.flatMap(a => a * a);
        return val;
    } else {
        return a * a;
    }
})));

log(L.flatten([[1, 2, 3], [4, 5, 6], [7, 8, 9]].map(a => a.map(a => a * a))));

L.flatMap = function* (f, iterable) {
    yield* L.flatten(L.map(f, iterable));
};
export const flatMap = cCurry(cPipe(L.flatMap, take(Infinity)));

console.clear();
const nestedArr = [1, 2, 3, [4, 5, 6]];
const fmIt = L.flatMap((v) => (Array.isArray(v) ? v : [v * v]), nestedArr);
log([...fmIt])
log(flatMap(v => v, [1, 2, 3, [4, 5, 6], [7, 8, 9]]))
