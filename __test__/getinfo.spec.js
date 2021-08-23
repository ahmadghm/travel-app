// Import the js file to test
import { getInfo } from "../src/client/js/getInfo.js";
import "babel-polyfill";
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe('Testing', () => {
    test('get info', async () => {
          // Define the input for the function, if any, in the form of variables/array
          // Define the expected ourespotput, if any, in the form of variables/array
          // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
          // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
      //const respo = checkUrl();
   //  expect(checkUrl(url)).toBeDefined();
   expect(getInfo).toBeDefined();
});
});
