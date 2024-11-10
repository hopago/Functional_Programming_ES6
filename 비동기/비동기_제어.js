import { reduceGo } from "../go.js";
import { cPipe } from "../pipe.js";
import { cReduce } from "../reduce.js";
import { take } from "../take.js";
import { L } from "../프로토콜_지연평가.js";

reduceGo(
    Promise.resolve(50),
    v => v + 10,
    v => Promise.resolve(v + 100),
    v => v + 10,
    v => Promise.reject("Something went wrong.."),
    console.log
).catch(err => console.log(err));

console.clear();
reduceGo(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    L.map(v => v + 10),
    take(2),
    console.log,
)