var dataSet ;   
//initialize html page
function init(){
    //Fetch the data from the URL
   
    const dataurl="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    

    //build html

    d3.json(dataurl).then(data => {
    // Display data
    dataSet = data;
    console.log(dataSet);
        //Add dropdownmenu with individualIDs
        const dropdown =d3.select ("#selDataset");
        data.names.forEach(id => {
            dropdown.append("option")
            .text(id)
            .property("value", id);
          });
           // Initialize the chart with the first individual
      const initialId = data.names[0];
      optionChanged(initialId);
    });

}  
//Update chart based on selected option
function optionChanged(selectedId) {
    // Fetch the data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(data => {
        // Find the data for the selected individual
        const individualData = data.samples.find(sample => sample.id === selectedId);
  
        // Sort the data to get the top 10 OTUs
        const sortedData = individualData.sample_values
          .map((value, index) => ({ value, id: individualData.otu_ids[index], label: individualData.otu_labels[index] }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
  
        // Create the horizontal bar chart
        const trace = {
          type: "bar",
          orientation: "h",
          x: sortedData.map(d => d.value),
          y: sortedData.map(d => `OTU ${d.id}`),
          text: sortedData.map(d => d.label)
        };
  
        const layout = {
          title: `Top 10 OTUs for Individual ${selectedId}`,
          xaxis: { title: "Sample Values" }
        };
  
        Plotly.newPlot("bar", [trace], layout);
      
        // Display sample metadata using a new function
        displaySampleMetadata(selectedId, data.metadata); 

        //bonus
        //updateGaugeChart(selectedId)
    });
  }
  
  // Define an event listener for dropdown menu change
  d3.select("#selDataset").on("change", function () {
    const selectedId = this.value;
    optionChanged(selectedId);
  });

  // Function to display sample metadata
function displaySampleMetadata(selectedId, metadata) {
    // Find the metadata for the selected individual
    const selectedMetadata = metadata.find(entry => entry.id.toString() === selectedId);
  
    // Clear the previous metadata using .html
    const sampleMetadata = d3.select("#sample-metadata");
    sampleMetadata.html("");
  
    // Display each key-value pair from the metadata JSON object
    for (const [key, value] of Object.entries(selectedMetadata)) {
      sampleMetadata.append("p").text(`${key}: ${value}`);
    }
  }
  
  
// function for bubble chart based on the selected individual
function BubbleChart(selectedId) {
    // Fetch the data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(data => {
        // Find the data for the selected individual
        const individualData = data.samples.find(sample => sample.id === selectedId);
  
        // Create the bubble chart trace
        const trace = {
          x: individualData.otu_ids,
          y: individualData.sample_values,
          text: individualData.otu_labels,
          mode: 'markers',
          marker: {
            size: individualData.sample_values,
            color: individualData.otu_ids,
            colorscale: 'Earth', // You can change the colorscale as desired
            opacity: 0.7
          }
        };
  
        const layout = {
          title: `Bubble Chart for Individual ${selectedId}`,
          xaxis: { title: "OTU IDs" },
          yaxis: { title: "Sample Values" }
        };
  
        Plotly.newPlot("bubble", [trace], layout);
      });
  }
  
  // Define an event listener for dropdown menu change
  d3.select("#selDataset").on("change", function () {
    const selectedId = this.value;
    optionChanged(selectedId);
    BubbleChart(selectedId); // Call the bubble chart update function
  });
  
  
  
  // Initialize the page
  init();
  
  
  
  
  

