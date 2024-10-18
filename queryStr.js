import { reduceGo } from "./go.js";
import { cMap } from "./map.js";
import { cReduce } from "./reduce.js";

// reduce
const log = value => console.log(value);

export let queryStr = obj => obj;

queryStr = obj => reduceGo(
    obj,
    Object.entries,
    cMap(([k, v]) => `${k}=${v}`),
    cReduce((a, b) => `${a}&${b}`),
);
log(queryStr({
    limit: 10,
    offset: 10,
    type: "notice"
}));