// Write a example function of callback hell and give another solution how you can optimize that code. Discuss the problems of Callback hell in Async programming
function CallbackHell(callback) {
    setTimeout(() => {
        console.log("Step 1");
        setTimeout(() => {
            console.log("Step 2");
            setTimeout(() => {
                console.log("Step 3");
                callback();
            }, 100);
        }, 100);
    }, 100);
}

CallbackHell(() => {
    console.log("Callback hell");
});

//Optimization
function step1() {
    return new Promise(resolve => setTimeout(() => {
        console.log("Step 1"), resolve()
    }, 1000));
}

function step2() {
    return new Promise(resolve => setTimeout(() => {
        console.log("Step 2"), resolve()
    }, 1000));

}

function step3() {
    return new Promise(resolve => setTimeout(() => {
        console.log("Step 3"), resolve()
    }, 1000));

}

function promises() {
    step1()
        .then(() => step2())
        .then(() => step3())
        .then(() => {
            console.log("Optimization solution");
        });
}

promises();

//Discuss the problem for callback hell
//1. difficult to read and maintain
//2. hard to debug/handling error in callback hell
//3. difficult to scale