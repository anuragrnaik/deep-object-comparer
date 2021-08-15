import deepObjectCompare from '../../../src/index';

describe("deepObjectCompare", () => {
  it("should work- complex object compare", () => {
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

    deepObjectCompare(lho, rho, comparisonObj, result);

    expect(comparisonObj).toHaveProperty(["testProp2", 1, "prop1"], {
      result: true,
      key: "prop1",
      lhVal: "c",
      rhVal: "c"
    });
    expect(comparisonObj).toHaveProperty(["testProp2", 1, "prop2"], {
      result: false,
      key: "prop2",
      lhVal: "d",
      rhVal: "e"
    });
    expect(result).toHaveProperty("isMatch", false);
  });

  it("should work- complex object compare with skip property", () => {
    const lho = {
      testProp1: {
        prop1: 'a',
        prop2: [1, 2, 3]
      },
      testProp2: [{
        propToSkip: 'b',
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
        propToSkip: 'a',
        prop2: 'b'
      }, {
        prop1: 'c',
        prop2: 'd'
      }]
    };

    const comparisonObj = {};
    const result = {};

    deepObjectCompare(lho, rho, comparisonObj, result, {skipProps: ["propToSkip"]});

    expect(comparisonObj).toHaveProperty(["testProp2", 1, "prop1"], {
      result: true,
      key: "prop1",
      lhVal: "c",
      rhVal: "c"
    });
    expect(result).toHaveProperty("isMatch", true);
  });

  it("should work - complex object compare 2", () => {
    const lho = {
      testProp1: 'b',
      testProp2: [{
        prop1: 'a',
        prop2: 'b'
      }, {
        prop1: 'c',
        prop2: 'd'
      }]
    };

    const rho = {
      testProp1: 'b',
      testProp2: [{
        prop1: 'a',
        prop2: 'b'
      }, {
        prop1: 'c',
        prop2: 'd'
      }]
    };

    const comparisonObj = {};
    const result = {};

    deepObjectCompare(lho, rho, comparisonObj, result);
    expect(result).toHaveProperty("isMatch", true);
  });

  it("should work - simple string compare", () => {
    const lho = "test-1";
    const rho = "test-2";

    const compareObj = {};
    const result = {};

    deepObjectCompare(lho, rho, compareObj, result);
    expect(compareObj).toHaveProperty("comparison", {
      result: false,
      lhVal: "test-1",
      rhVal: "test-2"
    });
    expect(result).toHaveProperty("isMatch", false);
  });
});
