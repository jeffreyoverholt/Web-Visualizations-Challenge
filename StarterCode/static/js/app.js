function charts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    // Filter the data for the object with the desired sample number
    var resultArray = samples.filter(x => x.id == sample);
    var result = resultArray[0];  
    console.log(result);
    var values = result.samples_values
    var id = result.otu_ids
    console.log(id)


    // Reference Greek Gods filtering module (Week 14, Day 2, Module 6)
    // Used Ask BCS for Help with filtering
    // https://nuvirtdatapt1-ice5461.slack.com/archives/C03AE2DLSAF
    var yticks = id.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var sample_values = result.sample_values;
    var otu_labels = result.otu_labels;

    // Bar Chart
    let trace1 = {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      };
      
      let traceData = [trace1];
      
      // Apply a title to the layout
      let layout = {
        title: "Top 10 OTU's",
      };
      
      Plotly.newPlot("bar", traceData, layout);

    // Bubble Chart
    // https://plotly.com/javascript/bubble-charts/

    let trace2 = {
      y: sample_values,
      x: id, 
      mode: 'markers',
      text: otu_labels,
      marker: {
        color: id,
        opacity: [1, 0.8, 0.6, 0.4],
        size: sample_values
      }
    };

    let bubbleData = [trace2];

    let bubbleLayout = {
      title: 'Bubble Chart of Bacteria Samples',
      showlegend: false,
      height: 600,
      width: 1200,
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

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

    var result = names[0];
    
  buildMetadata(result)
  charts(result)
  });
}

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
