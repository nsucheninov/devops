const getSentenceFragment = (offset = 0) => {
    const pageSize = 3;
    const sentence = [...'hello world'];
    return {
      data: sentence.slice(offset, offset + pageSize),
      nextPage: offset +
          pageSize < sentence.length ? offset + pageSize : undefined
    }
  };

console.log("start");

var result = getSentenceFragment();

console.log("Result: %s", result.data)

console.log("stop");