function* gen() {
    yield 1;
    if (Math.random() < 0.5) yield 2;
    yield 3;
    return 100;
}

const newIter = gen();

console.log(newIter[Symbol.iterator]() == newIter);

console.log(newIter.next());
console.log(newIter.next());
console.log(newIter.next());
console.log(newIter.next());
console.log(newIter.next());

for (const x of newIter) {
    console.log(x);
}

// ex: odds
function* infinity(i = 0) {
    while (true) {
        yield i++;
    }
}
function* limit(l, iter) {
    for (const x of iter) {
        yield x;
        if (x === l) return;
    }
}
function* odds(l) {
    for (const x of limit(l, infinity(1))) {
        if (x % 2) yield x;
    }
}

const oddsIter = odds(10);
console.log(oddsIter.next());
console.log(oddsIter.next());
console.log(oddsIter.next());

for (const x of odds(30)) {
    console.log(x);
}

// for of, 전개 연산자, 구조 분해, 나머지 연산자

console.log(...odds(10));
console.log(...odds(10), ...odds(30));

const [head, ...tail] = odds(5);
console.log(head, tail);
