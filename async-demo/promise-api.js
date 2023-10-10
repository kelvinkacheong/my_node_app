// creating settled promises
const p = Promise.resolve({id: 1});

p.then(result => console.log(result));

// -----------------------------------------

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async operation 1....");
        // reject(new Error('beacuse something failed...'));
        resolve(1);
    }, 2000);
});

const p2 = new Promise(resolve => {
    setTimeout(() => {
        console.log("Async operation 2....");
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log(error.message));

// Promise will be considered fulfiled after the 1st one is completed, and triggered then
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log(error.message));