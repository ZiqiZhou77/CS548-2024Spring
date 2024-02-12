// 4. Implement a function that takes an array and an asynchronous mapping function. The function should return a new array with the results of applying the mapping function to each element, maintaining the order. Use async/await for handling asynchronous operations.
async function mapping(values, asyncMapping) {
  const result = [];

  for (const value of values) {
    const newValue = await asyncMapping(value);
    result.push(newValue);
  }

  return result;
}

async function asyncMapping(value) {
  return new Promise(resolve => setTimeout(() => resolve(value * 10), 100));
}

const values = [2, 0, 2, 4, 0, 2, 1, 1];

mapping(values, asyncMapping)
  .then(result => {
    console.log("Array after mapping:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });