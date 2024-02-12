// 1. Write a function that takes an array of promises as input and returns a new promise. The new promise should resolve with an array of results once all input promises are resolved. Implement this without using Promise.all
function completeAllPromises(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let count = 0;

        function handleResult(index, result) {
            results[index] = result;
            count++;

            if (count == promises.length) {
                resolve(results);
            }
        }

        function handleError(error) {
            reject(error);
        }

        promises.forEach((promise, index) => {
            promise
                .then((result) => handleResult(index, result))
                .catch(handleError);
        });
    });
}

const promise1 = new Promise(resolve => setTimeout(() => resolve("result1"), 100));
const promise2 = new Promise(resolve => setTimeout(() => resolve("result2"), 100));
const promise3 = new Promise(resolve => setTimeout(() => resolve("result3"), 100));
const promises = [promise1, promise2, promise3];

completeAllPromises(promises)
    .then((results) => {
        console.log("All the promises has resolved:", results);
    })
    .catch((error) => {
        console.error("Error:", error);
    });