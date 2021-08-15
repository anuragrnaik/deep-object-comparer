export default function deepObjectComparer(
  lho,
  rho,
  testVar,
  compareResult,
  { skipProps = [], inKey = undefined, firstTime = true, sortProps, arrayCompare = [] } = {}
) {

  if (firstTime) {
    compareResult.isMatch = true;
  }

  if (skipProps && skipProps.some((key) => key === inKey)) {
    testVar[inKey] = true;
  } else {
    try {
      if (Array.isArray(lho) && lho && rho) {
        if (inKey !== null && inKey !== undefined) {
            testVar[inKey] = [];
        } else if (!firstTime) {
          testVar = [];
        }
        const sortData = sortProps
          ? sortProps.find((sort) => sort.key === inKey)
          : false;

        if (sortData) {
          lho.sort((elA, elB) => elA[sortData.sortKey] - elB[sortData.sortKey]);
          rho.sort((elA, elB) => elA[sortData.sortKey] - elB[sortData.sortKey]);
        }

        lho.forEach((a, pos) => {
          const comparePos =
            arrayCompare && arrayCompare.length
              ? arrayCompare.findIndex(({prop: key}) =>
                  firstTime ? key === 0 : key === inKey
                )
              : -1;
          if (comparePos !== -1) {
            const bPos = rho.findIndex(
              (prop) =>
                prop[arrayCompare[comparePos].compareKey] ===
                lho[pos][arrayCompare[comparePos].compareKey]
            );
            deepObjectComparer(
              lho[pos],
              rho[bPos],
              inKey !== null && inKey !== undefined ? testVar[inKey] : testVar,
              compareResult,
              {
                inKey: pos,
                skipProps,
                sortProps,
                arrayCompare,
              }
            );
          } else {
            deepObjectComparer(
              lho[pos],
              rho[pos],
              inKey !== null && inKey !== undefined ? testVar[inKey] : testVar,
              compareResult,
              {
                inKey: pos,
                skipProps,
                sortProps,
                arrayCompare,
              }
            );
          }
        });
      } else if (typeof lho === "object" && lho && rho) {
        if (inKey !== null && inKey !== undefined) {
          testVar[inKey] = {};
        } else if (!firstTime) {
          testVar = {};
        }

        Object.keys(lho).forEach((key) =>
          deepObjectComparer(
            lho[key],
            rho[key],
            inKey !== null && inKey !== undefined ? testVar[inKey] : testVar,
            compareResult,
            {
              inKey: key,
              skipProps,
              sortProps,
              arrayCompare,
            }
          )
        );
      } else {
        let result = true;
        if (typeof lho === "number" && rho !== null) {
          lho = Number(lho.toFixed(2));
          rho = Number(rho.toFixed(2));
          result = lho === rho;
        } else {
          result = !(
            (lho === null || lho === undefined) &&
            (rho === null || rho === undefined)
          )
            ? lho === rho
            : true;
        }

        if (!result) {
          compareResult.isMatch = result;
        }

        testVar[inKey || "comparison"] = {
          result,
          key: inKey,
          lhVal: lho,
          rhVal: rho,
        };
      }
    } catch (error) {
      compareResult.isMatch = false;
      testVar[inKey] = {
        result: false,
        key: inKey,
        error: error.message,
      };
    }
  }
}
