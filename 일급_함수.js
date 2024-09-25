const log = (value) => console.log(value);

const add5 = a => a + 5;
log(add5);
log(add5(5));

const f1 = () => () => 1;
log(f1());

const f2 = f1();
log(f2);
