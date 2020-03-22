function URLEncodeSingleCharacterUsingGBK(text) {
  const string = $objc("NSString").$stringWithString(text);
  const data = string.$dataUsingEncoding(2147485234).rawValue();
  const encoded = data.byteArray
    .map(n => "%" + n.toString(16).toUpperCase())
    .join("");
  return encoded;
}

function URLEncodeUsingGBK(text) {
  const ignorePattern = /[0-9a-zA-Z$-_.+!*'(),]/;
  if (!text) return "";
  let result = "";
  for (let s of text) {
    if (ignorePattern.test(s)) {
      result += s;
    } else {
      result += URLEncodeSingleCharacterUsingGBK(s);
    }
  }
  return result;
}
module.exports = URLEncodeUsingGBK;

ecodeURI = URLEncodeSingleCharacterUsingGBK;
