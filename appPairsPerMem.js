function appPairsPerMem(availableMem, foregroundApps, backgroundApps){
  let result = [];
  // Sort both arrays by reqMem
  foregroundApps.sort(valueCompare);
  backgroundApps.sort(valueCompare);

  console.log("fore: ", foregroundApps);
  console.log("back: ", backgroundApps);

  // While loop iterate both arrays looking for biggest pairs and add to result

}

function valueCompare(a,b){
  if(a[1] < b[1]){
    return -1;
  }
  if(a[1] > b[1]){
    return 1;
  }

  return 0;
}

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
*/
let availableMem = 10,
    foregroundApps = [[1,4],[2,2],[3,6],[4,1]],
    backgroundApps = [[1,3],[2,7],[3,6],[4,8]];

let result = appPairsPerMem(availableMem, foregroundApps, backgroundApps);
console.log(result);