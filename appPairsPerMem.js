/*
R: Find Optimal (as close to availableMem without going over) background/foreground app pairs. 
- return ties where multiple app IDs have similar 'largest' reqMems
- ie availMem: 10 fore: 1,2 2,1 3,4 4,6 back: 1,1 2,5 3,4 4,4 
- would return 4,3 and 4,4 matching the same foreground app against two different background apps
- with the same reqMem

I:
availableMem: int representing available memory
foregroundApps/backgroundApps: array of int pair arrays representing appID/reqMem

O:
result: array of int pair arrays. Each int in the pair representing 1 fore and 1 back app id

This function may be less efficient timewise, due to the sort, but is more space efficient with no
new data structure being created for the input arrays. It also has a better Omega due to the short circuits
that can be implemented with sorted arrays
*/
function appPairsPerMem(availableMem, foregroundApps, backgroundApps){
  let result = [];

  // Sort both arrays by requiredMem
  foregroundApps.sort(valueCompare);
  backgroundApps.sort(valueCompare);

  console.log("availableMem: ", availableMem);
  console.log("fore: ", foregroundApps);
  console.log("back: ", backgroundApps);
  

  // While loop iterate both arrays looking for valid pairs and add to result
  let opt = 0,
      valid = false,
      l = 0,
      r = backgroundApps.length - 1,
      curSum = 0,
      fLen = foregroundApps.length;

  //if !valid and l === fLen - 1 and r === 0, no more valid pairs
  while(l < fLen && r >= 0){
    curSum = foregroundApps[l][1] + backgroundApps[r][1];
    valid = (curSum >= opt && curSum <= availableMem);
    if(valid){
      // Check if opt has changed, reset result and opt if so
      if(curSum > opt){
        opt = curSum;
        result = [];
      }
    
      // Add ID pair to result
      result.push([foregroundApps[l][0],backgroundApps[r][0]]);
    }

    // Make a move decision
    let leftInc = (l < fLen-1 ? foregroundApps[l+1][1] : foregroundApps[fLen-1][1]) + backgroundApps[r][1],
        rightDec = foregroundApps[l][1] + (r > 0 ? backgroundApps[r-1][1] : backgroundApps[0][1]);
    
    if (r > 0 && (rightDec >= opt && rightDec <= availableMem || curSum > availableMem)){
      r--;
    } else if (leftInc >= opt && leftInc <= availableMem){
      l++;
    } else {
      //no more valid pairs
    }
    // if (curSum === leftInc && curSum === rightDec){

    // }
    // if (curSum > availableMem && r > 0){
    //   // if curSum is greater than availableMem, but r <= 0, we've reached an end to valid pairs
    //   r--;
    // } else if (curSum <= availableMem){

    // } else {
    //   break;
    // }

    // if (curSum <= availableMem){
    //   r--;
    // } else if (curSum > availableMem && r > 0){
    //   r--;
    // } else if (leftInc <= availableMem){
    //   l++; 
    // } else if (r > 0 && rightDec >= curSum){
    //   r--;
    // } else {
    //   break;
    // }
    
    // Do we just reset valid to false here? How do we defer to the top of the loop? We have to decide which direction to move?
  }


  return result;
}

function valueCompare(a,b){
  if(a[1] > b[1]) return 1;
  return 0;
}

/*
Test
- all app mem combos are too large for availableMem
*/

let availableMem = 6,
    foregroundApps = [[1,4],[2,2],[3,8],[4,1],[5,6]],
    backgroundApps = [[1,3],[2,1],[3,6],[4,7],[5,3]];

// first 2 sets of app pairs are perfect optimal
// let availableMem = 8,
//     foregroundApps = [[1,4],[2,1],[3,8],[4,1],[5,6]],
//     backgroundApps = [[1,3],[2,1],[3,7],[4,7],[5,3]];

// First pair perfect optimal
// let availableMem = 8,
//     foregroundApps = [[1,4],[2,2],[3,8],[4,1],[5,6]],
//     backgroundApps = [[1,3],[2,1],[3,6],[4,7],[5,3]];

// let availableMem = 6,
//     foregroundApps = [[1,4],[2,2],[3,8],[4,1],[5,6]],
//     backgroundApps = [[1,1],[2,1],[3,1],[4,1],[5,1]];

// let availableMem = 6,
//     foregroundApps = [[1,1],[2,1],[3,1],[4,1],[5,1]],
//     backgroundApps = [[1,3],[2,1],[3,6],[4,7],[5,3]];

let result = appPairsForMem(availableMem, foregroundApps, backgroundApps);
console.log(result);