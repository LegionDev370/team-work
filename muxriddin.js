 let sentence34 ="The quick brown fox jumps over the lazy dog";
function getAcronym(sentence){
    sentence = sentence.split(" ");
    const toUpper = sentence.map(el => {
        return el.charAt(0).toUpperCase();
    });
    let result = String(toUpper.map(el => {
        return el;
    }));
    result = result.split(",").join(",");
    console.log(result);
};
getAcronym(sentence34);
let sentence34 = "The quick brown fox jumps over the lazy dog";
function getAcronym(sentence) {
  sentence = sentence.split(" ");
  const toUpper = sentence.map((el) => {
    return el.charAt(0).toUpperCase();
  });
  let result = String(
    toUpper.map((el) => {
      return el;
    }),
  );
  result = result.split(",").join(",");
  console.log(result);
}
getAcronym(sentence34);
