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
function appPairsForMem(availableMem, foregroundApps, backgroundApps){
  let totals = new Map();

  // Should I turn these into loops so I can short circuit them when a single operand is larger than avail?
  foregroundApps.forEach((f) => {
    backgroundApps.forEach((b) => {
      let sum = f[1] + b[1];
      if(sum <= availableMem){
        totals[sum] = totals[sum] || [];
        totals[sum].push([f[0],b[0]]);
      }
    });
  });

  let opt = availableMem;

  while(totals.size > 0 && totals[opt] === undefined && opt > 0){
    opt--;
  }

  return totals[opt] || [];
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