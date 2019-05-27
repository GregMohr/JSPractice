/*
  Function to sort a list of telephony junction boxes and seperate them by generation
*/
function sortByVersion(numBoxes, boxes){
  let oldBox = [],
      newBox = [];

  // Iterate and divide boxes. Alpha versions are old, numeric are new
  boxes.forEach(el => el[4] < 58 ? newBox.push(el) : oldBox.push(el));

  // Sort old boxes
  oldBox.sort(boxVersionComp);

  // Return old + new boxes
  return oldBox.concat(newBox);
}

function versionSort(boxes){
  // This sort can break if ID/VERSION string does not follow format of xxx xxxx xxxx xxxx xxxx
  boxes.sort((a,b) => {
    // If both versions are alpha return result of boxVersionComp
    if(a.charCodeAt(4) > 64 && b.charCodeAt(4) > 64) return boxVersionComp(a,b);

    // If item a's version is numeric and item b's version is alpha, swap
    if(a.charCodeAt(4) < 64 && b.charCodeAt(4) > 64) return 1;

    // Other cases: a's version alpha and b's version numeric | both versions numeric, correctly sorted
    return 0;
  })

  return boxes;
}

function boxVersionComp(a,b){
  let i = 4; // Box version starts at index 4

  // Get past all leading matches
  while(a[i] === b[i]){
    i++
  }

  // On first nonmatch, swap if out of order
  if(a[i] > b[i]){
    return 1;
  }

  return 0;
}

let numBoxes = 6,
    boxes = ['id1 higt kigt andj nidd',
             'id2 1273 3343 5673 1233',
             'id3 eggg eega plef osje',
             'id4 1233 3345 6573 7893',
             'id5 egff drth gghe dwhh',
             'id6 9873 2522 6623 3333'];

// newBox = sortByVersion(numBoxes, boxes);
newBox = versionSort(boxes);
console.log(newBox);