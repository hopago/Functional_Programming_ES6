const iterable = {
    [Symbol.iterator]() {
        let i = 3;

        return {
            next() {
                return i === 0 ? { done: true } : { value: i--, done: false }
            },
            [Symbol.iterator]() {
                return this;
            }
        }
    }
};
for (const val of iterable) {
    console.log(val);
}

const iterator = iterable[Symbol.iterator]();
console.log(iterator.next());

// 잘 구현된 이터러블은 이터레이터를 만들었을 때, 진행 한 뒤 순회 || iterator를 for of 문에 넣었을 때 모든 값을 순회 가능
const arr = [1, 2, 3];
const iterator2 = arr[Symbol.iterator]();
iterator2.next();
for (const x of iterator2) {
    console.log(x);
}

console.log(document.querySelectorAll("*"));
for (const node of document.querySelectorAll("*")) console.log(node);
const all = document.querySelectorAll("*");
console.log(all[Symbol.iterator]().next());
const iter3 = all[Symbol.iterator]();
for (const node of iter3) {
    console.log(node);
}