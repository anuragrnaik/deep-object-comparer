# deep-object-comparer
A simple javascript function that deep compares two javascript objects are returns comparison results of all the properties having primitive values
This utility method can be used to compare two complex javascript objects, once executed, it'll fill the comparison object (third parameter) with the individual property values from the provided left-hand side object (first parameter) and the right-hand side object (second-parameter).

It also adds a "isMatch" property to the result object (fourth parameter) denoting the final comparison result (true: if objects match, false: if objects comparison failed)


## Usage
### Parameters
* lho: First object for comparison
* rho: Second object for comparison
* comparisonObj: The 'deepObjectCompare' util method will use this parameter for storing the entire property-by-property comparison. This parameter can be used to verify and use the property comparison results in your code further.
  >*Always pass an object as the comparisonObj parameter*
* result: Will store the final comparison result in this object. Use the "isMatch" property to get the comparison result
  >*Always pass an object as the comparisonObj parameter*
* options: Options object, for finer comparison
  * skipProps: List of properties that can be skipped from comparison
  * sortProps: List the array properties that are to be sorted before starting the comparison
  * arrayCompare: Can provide a array of objects with the property name and the compare key which will have a unique value so as to pick the correct element from rho.
    >*Can be used in cases where the array based property has a unique identifier that is present in both the lho and rho, the comparison logic will take the current lhs element and use the id to pick the correct element from rhs, sorting won't be required*
  Example:
  ```javascript
    {
      skipProps: ["prop_name1", "prop_name2"],
      sortProps: ["prop_name3"],
      arrayCompare: [{
        "prop": "prop_name4",
        "compareKey": "id"
      }]
    }
  ```

### Example
```javascript
  const lho = {
      testProp1: {
        prop1: 'a',
        prop2: [1, 2, 3]
      },
      testProp2: [{
        prop1: 'a',
        prop2: 'b'
      }, {
        prop1: 'c',
        prop2: 'd'
      }]
    };

  const rho = {
    testProp1: {
      prop1: 'a',
      prop2: [1, 2, 3]
    },
    testProp2: [{
      prop1: 'a',
      prop2: 'b'
    }, {
      prop1: 'c',
      prop2: 'e'
    }]
  };

  const comparisonObj = {};
  const result = {};

  deepCompare(lho, rho, comparisonObj, result);
```

The comparisonObj and result values will be

```javascript
  // comparisonObj
  {
    testProp1: {
      prop1: { result: true, key: "prop1", lhVal: "a", rhVal: "a" },
      prop2: [
        { result: true, key: 1, lhVal: 2, rhVal: 2 },
        { result: true, key: 2, lhVal: 3, rhVal: 3 }
      ]
    },
    testProp2: [
      {
        prop1: { result: true, key: "prop1", lhVal: "a", rhVal: "a" },
        prop2: { result: true, key: "prop2", lhVal: "b", rhVal: "b" }
      },
      {
        prop1: { result: true, key: "prop1", lhVal: "c", rhVal: "c" },
        prop2: { result: false, key: "prop2", lhVal: "d", rhVal: "e" }
      }
    ]
  }

  // result
  { isMatch: false }
```
