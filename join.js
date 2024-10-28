import { cCurry } from "./curry.js";
import { cReduce } from "./reduce.js";
import { L } from "./프로토콜_지연평가.js";
import { cPipe } from "./pipe.js";

// reduce
const log = value => console.log(value);

L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]]
}

const join = cCurry((sep = "", iter) => cReduce((a, b) => `${a}${sep}${b}`, iter));

export let queryStr = obj => obj;

queryStr = cPipe(
    L.entries,
    L.map(([k, v]) => `${k}=${v}`),
    join('&'),
);
log(queryStr({
    limit: 10,
    offset: 10,
    type: "notice"
}));

function* a() {
    yield 10;
    yield 11;
    yield 12;
    yield 13;
    yield 14;
    yield 15;
}

log(join(", ", a()))

var it = L.entries({ limit: 10, offset: 10, type: "notice" });
log(it.next());