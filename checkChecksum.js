function checkChecksum(input){
  // Function to determine if a string contains the correct checksum
  // Provided checksum is last 5 characters of input string
  // Calculated checksum is comprised of the 5 highest occuring letters in the subject
  // Checksum is sorted by number of occurances and ties are broken alphabetically

  let subject = input.substring(0, input.length - 5),
		providedCheck = input.substring(input.length - 5),
    builtCheck = buildChecksum(subject);
  
  if (builtCheck == providedCheck) return true;
  
  return false;
}

function buildChecksum(subject){
  let build = Array.from(charCounts(subject)).sort((a,b) => sortVK(a,b));
  let result = "";

  for(let i = 0; i < 5; i++) result+=build[i][0];

  return result;
}

function charCounts(toCount){
  result = new Map();

	for(let i = 0; i < toCount.length; i++){
		if(result.has(toCount[i])){
			result.set(toCount[i], result.get(toCount[i]) + 1);
		} else {
			result.set(toCount[i], 1);
		}
  }

  return result;
}

function sortVK(a,b){
  if(a[1] > b[1]){
    return -1;
  } else if(a[1] < b[1]){
    return 1;
  }
  
  if(a[0] > b[0]){
    return 1;
  } else if(a[0] < b[0]){
    return -1;
  } else {
    return 0;
  }
}

let inp = "appropriateparei";
console.log(checkChecksum(inp));

/* Can I and would there be advantage to using an occurances tracking array like below?

	for(let i = 0; i < subject.length; i++) occurances[+subject[i] - 97]++; 
	// a b c d e f g h i j k l m n o p q r s t u v w x y z
  // 2       1       1           1 3   2   1
  
*/