```JavaScript
function lcs(word1, word2) {
  const len_1 = word1.length;
  const len_2 = word2.length;
  let max = 0;
  const lcsArr = Array.from({ length: len_1 }, () => (Array.from({ length: len_2 }, () => 0)));
  for (let i = 0; i < len_2; i++) {
    for (let j = 0; j < len_1; j++) {
      if (word2[i] == word1[j] && i != 0 && j != 0) {
        lcsArr[j][i] = lcsArr[j - 1][i - 1] + 1;
        max = Math.max(max, lcsArr[j][i]);
      }
    }
  }
  console.log({lcsArr})
  return max;
}
```