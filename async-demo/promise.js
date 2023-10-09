const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1);
        reject(new Error('Error message'));
    }, 2000);
});

p
    .then(result => console.log('result: ', result))
    .catch(err => console.log(err.message));