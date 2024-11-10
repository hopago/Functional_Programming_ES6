// 중첩된 resolve 값 이후 then으로 한 번에 확인 가능
Promise.resolve(Promise.resolve(Promise.resolve(10))).then(console.log);

new Promise(resolve => resolve(new Promise(resolve => resolve(1)))).then(console.log);
