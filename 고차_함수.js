const log = val => console.log(val);

/**
 * #고차 함수
 * 함수를 값으로 다루는 함수
 * 함수를 인자로 받아서 실행
 * 함수를 만들어 return (closure)
 */

const apply1 = f => f(1);
const add2 = a => a + 2;
log(apply1(add2));
log(apply1(a => a - 1));

const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i);
}
times(log, 3);

const addMaker = a => b => a + b;
const add10 = addMaker(10);
log(add10(5));
