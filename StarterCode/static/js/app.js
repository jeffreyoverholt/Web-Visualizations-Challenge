function init() {
  d3.json("samples.json").then(data => {
      console.log("read samples");
      console.log(data);
  });
}
function optionChanged(value) {
  console.log(value);
}

init();