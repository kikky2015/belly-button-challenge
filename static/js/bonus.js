  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 0, // Initial value
      title: { text: "Speed" },
      type: "indicator",
      mode: "gauge+number+delta",
      delta: { reference: 0 }, // Initial reference value
      gauge: {
        axis: { range: [0, 9] }, // Adjust the range to 0-9
        steps: [
          { range: [0, 1], color: "lightgray" }, 
          { range: [1, 2], color: "lightgray" }, 
          { range: [2, 3], color: "lightgreen" }, 
          { range: [3, 4], color: "lightgreen" }, 
          { range: [4, 5], color: "lightgreen" },
          { range: [5,6], color: "green"}, 
          { range: [6, 7], color: "green" },
          { range: [7, 8], color: "green" },
          { range: [8, 9], color: "green" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 0 // Initial threshold value
        }
      }
    }
  ];
  

  // Define a function to update the gauge chart based on the selected individual
function updateGaugeChart(selectedId) {
    // Fetch the data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(data => {
        // Find the data for the selected individual
        const individualData = data.metadata.find(metadata => metadata.id.toString() === selectedId);
  
        // Update the gauge chart value and threshold reference
        const newValue = individualData.wfreq; // Assuming wfreq contains the value
        const referenceValue = 0; // Modify as needed
  
        // Use Plotly's update method to update the gauge chart
        Plotly.update('myDiv', {
          value: newValue,
          delta: { reference: referenceValue }
        });
      });
}