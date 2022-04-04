function charts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    // Filter the data for the object with the desired sample number
    var resultArray = samples.filter(x => x.id == sample);
    var result = resultArray[0];  
    console.log(result);
    var values = result.samples_values
    // https://attacomsian.com/blog/java-convert-integer-to-string
    var id = result.otu_ids.toString()
    console.log(id)

    // Bar Chart
    let trace1 = {
        x: values,
        y: id,
        // text: reversedData.map(object => object.greekName),
        // name: "Greek",
        type: "bar",
        orientation: "h"
      };
      
      // Data array
      // `data` has already been defined, so we must choose a new name here:
      let traceData = [trace1];
      
      // Apply a title to the layout
      let layout = {
        title: "TBD",
      };
      
      // Render the plot to the div tag with id "plot"
      // Note that we use `traceData` here, not `data`
      Plotly.newPlot("bar", traceData, layout);

    // Bubble Chart
    let trace2 = {





    }
  });
}



function init() {
  d3.json("samples.json").then(data => {
    console.log("read samples");
    console.log(data);
    var names = data.names;
    // Filter the data for the object with the desired sample number
    let dropdownMenu = d3.select("#selDataset");
    data.names.forEach((name) => {
      dropdownMenu.append('option').text(name);
    })

    //why is this option
    var result = names[0];
    
  buildMetadata(result)
  charts(result)
  });
}




// 

function optionChanged(value) {
  console.log(value);
  charts(value);
  buildMetadata(value);
}

init();

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(x => x.id == sample);
    var result = resultArray[0];
    console.log(result)
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
