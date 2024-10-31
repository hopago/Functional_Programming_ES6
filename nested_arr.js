import { reduceGo } from "./go.js";
import {
    flatten,
    L,
} from "./프로토콜_지연평가.js";
import { cFilter } from "./filter.js";
import { take } from "./take.js";

const arr = [
    [1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10]
];

reduceGo(
    arr,
    L.flatten,
    L.filter(v => v % 2),
    take(Infinity),
    log,
)