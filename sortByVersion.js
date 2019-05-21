function sortByVersion(numBoxes, boxes){
  let old = new Map(),
      result = [];

  // Iterate and divide boxes
  boxes.forEach(el => {
    let id = el.slice(0, el.indexOf(' ')),
        version = el.slice(el.indexOf(' ') + 1);

    if (version.charCodeAt(0) < 58){
      // New box, add to result
      result.push(el);
    } else {
      // Old box, add to old
      old.set(version, id);
    }
  });

  // Sort old boxes
  old = new Map([...old.entries()].sort((a, b) => b - a)); // Sorted desc for proper shift into result

  // Concat old + result
  old.forEach((id, ver) => result.unshift(id + " " + ver));

  return result;
}

function versionSort(boxes){
  // This sort can break if ID/VERSION string does not follow format of xxx xxxx xxxx xxxx xxxx
  boxes.sort((a,b) => {
    let verA = a.slice(a.indexOf(' ') + 1),
        verB = b.slice(b.indexOf(' ') + 1);

    // If both versions are alpha. Deeper string sort
    if(verA.charCodeAt(0) > 64 && verB.charCodeAt(0) > 64){
      let i = 0,
          n = verA.length;
      while(i < n && verA.charCodeAt(i) === verB.charCodeAt(i)){
        i++;
      }
      if(verA.charCodeAt(i) > verB.charCodeAt(i)){
        return 1;
      }
      return 0;
    }

    // If item a's version is numeric and item b's version is alpha, swap
    if(verA.charCodeAt(0) < 64 && verB.charCodeAt(0) > 64){
      console.log("a numeric and b alpha, swapping");
      return 1;
    }

    // Other cases: a's version alpha and b's version numeric | both versions numeric, correctly sorted
    console.log("Correctly ordered");
    return 0;
  })

  return boxes;
}

let numBoxes = 6,
    boxes = ['id1 higt kigt andj nidd',
             'id2 1273 3343 5673 1233',
             'id3 eggg eega plef osje',
             'id4 1233 3345 6573 7893',
             'id5 ffgt drth gghe dwhh',
             'id6 9873 2522 6623 3333'];

// result = sortByVersion(numBoxes, boxes);
result = versionSort(boxes);
console.log(result);