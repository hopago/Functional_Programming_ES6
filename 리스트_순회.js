const log = val => console.log(val);

/**
 * ES6 리스트 순회
 * for i++
 * for of
 */

// 기존 리스트 순회
const list = [1, 2, 3];
for (let i = 0; i < list.length; i++) {
    log(list[i])
}

const str = "abc";
for (let i = 0; i < str.length; i++) {
    log(str[i])
}

for (const item of list) {
    console.log(item);
}

for (const char of str) {
    console.log(char);
}

/**
 * Array
 */

const arr = [1, 2, 3];
for (const item of arr) {
    log(item);
}
/*
arr[Symbol.iterator] = null;
for (const item of arr) {
    log(item);
    // TypeError: arr is not iterable
}
*/

/**
 * iterable / iterator protocol
 * iterable: [Symbol.iterator]()를 가진 값, 이터레이터를 return
 * iterator: next()를 가진 값, { value, done } 객체를 return
 * iterable / iterator protocol: 이터러블을 for ...of, 전개 연산자 등과 함께 동작하도록 한 규약
 */
const arrIterator = arr[Symbol.iterator]();
const { value, done } = arrIterator.next();
console.log(value, done);

/**
 * Set
 */

const set = new Set([1, 2, 3]);
for (const item of set) log(item);

log(set[0], set[1]) // undefined

/**
 * Map
 */

const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (const item of map) log(item);

log(map[1], map[2]) // undefined

const newArr = [1, 2, 3];
let iterator = newArr[Symbol.iterator]();
iterator.next();
iterator.next();
iterator.next();
const { done: newArrDone } = iterator.next();
console.log(newArrDone);

const newArr1 = [1, 2, 3];
let iter = newArr1[Symbol.iterator]();
iter.next();
iter.next();
for (const x of iter) log(x);

const set1 = new Set([1, 2, 3]);
for (const x of set1) log(x);

const a = map[Symbol.iterator]();
log(a.next());

var iter1 = map[Symbol.iterator]();
for (const x of iter1) log(x);

log(map);

const mIterator = map.keys();
mIterator.next();

const mValues = map.values();
mValues.next();

const mEntries = map.entries();

log(mIterator);
log(mValues);

const it = mIterator[Symbol.iterator]();
// 자기 자신 호출
log(it.next());