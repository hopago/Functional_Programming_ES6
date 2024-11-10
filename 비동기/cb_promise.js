import { find } from "../take2.js";

var log = val => console.log(val);

var add10 = function (val, cb) {
    setTimeout(() => {
        return cb(val + 10)
    }, 100);
}

var cbA = add10(5, res => {
    add10(res, res => {
        add10(res, res => {
            log(res)
        })
    })
})

var add20 = function (val) {
    return new Promise(resolve => setTimeout(() => resolve(val + 20)), 100)
}

var promiseA = add20(10)
    .then(add20)
    .then(add20)
    .then(log)

// 비동기를 값으로 만드는 Promise instance
var promiseB = promiseA.then(v => v - 5);

const delay100 = v => new Promise(resolve => setTimeout(() => resolve(v), 100))

export const go = (v, f) => v instanceof Promise ? v.then(f) : f(v);
const add5 = v => v + 5;
log(go(10, add5));
log(go(delay100(10), add5))

console.clear();
var r0 = go(10, add5);
var r1 = go(delay100(100), add5)

go(go(10, add5), log)
go(go(delay100(100), add5), log)

const g = v => v + 1;
const f = v => v * v;

log(f(g(1)));

[1, 2, 3].map(g).map(f).forEach(r => log(r));

Promise.resolve(1).then(g).then(f).then(r => log(r))

new Promise(resolve => setTimeout(() => resolve(2)))
    .then(g)
    .then(f)
    .then(r => log(r));

// Kleisli Composition
/*
    f, g

    f(g(x)) = f(g(x)) / 실무에선 오류, side-effects의 이유로 성립하지 않는 경우도 있다

    f(g(x)) = g(x) / x의 상태에 따라서 합성 결과가 원하지 않는 값을 만들었을 때,
    g()의 return 값이 f를 합성 했음에도 불구하고 마치 합성하지 않은 것처럼 합성하는 규칙
*/

var users = [
    { id: 1, name: "123" },
    { id: 2, name: "456" },
    { id: 3, name: "789" },
];

let getUserById = (id) => find(user => user.id === id, users);

const f0 = ({ name }) => name;
const g0 = getUserById;

const fg = id => f0(g0(id));

console.clear();

let fr = fg(2);
log(fr);

// 실무에서 users의 변형
users.pop();
users.pop();
users.pop();

fr = fg(2);
log(fr);

const fq = id => Promise.resolve(id).then(g0).then(f0);
fq.then(log);

getUserById = id => find(u => u.id === id, users) || Promise.reject("유저가 없습니다");
