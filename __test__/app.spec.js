// Import the js file to test
import { recDATA } from "../src/client/js/app.js";
import "babel-polyfill";
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests

describe('Testing recDATA' , () => {
     test('should return a function/ok', async () => {
           expect(typeof recDATA).toBe("function");
         });
      });
