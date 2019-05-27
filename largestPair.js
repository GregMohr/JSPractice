/*
Note for another approach:
remove o(nlogn) in sorting the array.
Instead assuming that the sum we looking for is k, i will divide the array into 2 arrays.
First array will contain all values which are less than k/2
Second array will contain all values &gt; k/2
This is bcoz in a sum if one number is less than k/2, the other has to be larger.
I will iterate over the smaller array of the 2 since they would rarely be equal.
For each x in array 1, i will find the k-x in array 2.
Complexity will be O(n).

recap: find pair with single largest operand that add to target

input:
truckSpace - int, 30 of this needs to be reserved for safety
packagesSpace - [] of int, each index is package ID, each value is individual package space

output:
result - [] of int, the indexes of the chosen pair

test:
110
20, 70, 90, 30, 60, 110
result: 0,4

110
20, 70, 90, 30, 50, 110
result: 3,4
*/


function getPackages(truckSpace, packagesSpace){
  let available = truckSpace - 30,
      p1 = 0,
      p2 = packagesSpace.length - 1, 
      sorted = [...packagesSpace].sort((a,b) => a - b);

  while(p1 < p2){
    let sum = sorted[p1] + sorted[p2];
    if(sum == available){
      return [packagesSpace.indexOf(sorted[p1]), packagesSpace.indexOf(sorted[p2])].sort((a,b) => a - b);
    } else if (sum > available) {
      p2--
    } else {
      p1++
    }
  }

  return []
}

let truckSpace = 160, 
    packagesSpace = [20, 70, 90, 30, 50, 110];

let result = getPackages(truckSpace, packagesSpace);

console.log(result);