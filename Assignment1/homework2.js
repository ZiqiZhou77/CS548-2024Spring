// 2. Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds. It can resolve any value.
function sleep(millis) {
    return new Promise(resolve => setTimeout(() => resolve("result"), millis));
}

let t = Date.now();
sleep(100).then(() => {
    console.log(Date.now() - t); // Output should be close to 100
});