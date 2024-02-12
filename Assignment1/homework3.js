// 3. Create an asynchronous function that iterates over an array of values and performs an asynchronous operation on each element. Ensure that the operations are executed sequentially, not concurrently.
async function processSequentially(values) {
    for (const value of values) {
        await asyncOperation(value);
    }
}

function asyncOperation(value) {
    return new Promise(resolve => setTimeout(() => {
        console.log(`${value}`), resolve()
    }, 100));
}

const values = [2, 0, 2, 4, 0, 2, 1, 1];

processSequentially(values)
    .then(() => {
        console.log("All the operations are executed sequentially");
    })
    .catch(error => {
        console.error("Error:", error);
    });