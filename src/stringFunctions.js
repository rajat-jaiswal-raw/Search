const charFreq = (str) => {
  let freq = {};
  for(const char of str){
    freq[char]? freq[char]++: (freq[char] = 1);
  }
  return freq;
}

const getFreqMap = (dataList, searchKey) => {
  const keyList = new Set(searchKey);
  let freqMap = [];
  console.log("a");
  for(let data of dataList){
    freqMap.push(getFreqObj(data, keyList));
  }
  return freqMap;
}

const getFreqObj = (obj, keyList) => {
  let charMap = {};
  for(let key in obj){
    if( keyList.has(key) ){
      charMap[key] = charFreq(obj[key]);
    }
  }
  return charMap;
}

const strTools = {
  getFreqMap: getFreqMap
}

export default strTools;