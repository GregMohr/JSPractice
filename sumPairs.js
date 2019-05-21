/*
Distinct pairs for targeted sum
input: int array i of n length: numbers to compose pairs, int t: target sum
output: array of distinct pairs of ints from i that equal t
*/

function sumPairs(pairs, target){
  let distinctInts = new Set(pairs),
    result = [];

  distinctInts.forEach((ele) => {
    console.log(`ele: ${ele}`);
    if(ele < target){
      targetOperand = target - ele;
      if(distinctInts.has(targetOperand)){
        result.push([ele, targetOperand]);
        distinctInts.delete(targetOperand);
      }
    }
  })

  return result;
}

function reduceSumPairs(pairs, target){
  // Is this considered a Greedy algo?
  // console.dir(pairs);
  let result = [];
  // Sort array
  pairs.sort((a,b) => {return a - b});

  // no dedup array, just check Prevs for dup and skip. building result is most efficient, inplace doesn't make sense
  // Iterate array, 2 pointers: l/r, condition l <= r
  for(let l = 0, r = pairs.length - 1; l < r; l++, r--){
    // Break if remainder of array > target
    if (pairs[l] > target) break;

    // Skip elements greater than target
    while (pairs[r] > target) r--;

    // Skip duplicates from both sides
    while (pairs[l] == pairs[l + 1]) l++;
    while (pairs[r] == pairs[r - 1]) r--;

    if(pairs[l] + pairs[r] == target){
      result.push([pairs[l], pairs[r]])
    } else {
      // do these conditions properly test for unmatchable within a sorted array?
      // (test l unmatchable, r unmatchable, both unmatchable)
      while (target - pairs[l] > pairs[r]) l++
      while (target - pairs[r] < pairs[l]) r--
    }
  }
}
// Can this be done in a sorted array, in place, by swapping between pairs after deleting dups progressively, maybe go backwards?
// target: 7 | [1,2,3,4,5,6]
// if pair rightshift remainder of array, unless last 1 or 2 elems
// 1,6 pair [1,6,2,3,4,5]
// 2,5 pair [1,6,2,5,3,4]

// test array with all positive, all negative, mixed pos/neg, all 0's, all 1's
// test target with positive and negative

// [1, 2, 10, 3, 4, 5, 5, 1, 6, 4]; // [1, 1, 2, 3, 4, 4, 5, 5, 6, 10] [1, 2, 3, 4, 5, 6, 10]
// t: 11
// [10,9,1,20,5,6,9,10,20,10] [1,5,6,9,10,20]
// t: 21, 16, 15, 11
// [0]
// [1,2]
// [1,1]
inputArray = [10,9,1,20,5,6,9,10,20,10];
inputTarget = 15;

result = sumPairs(inputArray, inputTarget);

console.dir(result);