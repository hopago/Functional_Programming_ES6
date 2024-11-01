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

const go = (v, f) => v instanceof Promise ? v.then(f) : f(v);
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
  .then(r => log(r))
