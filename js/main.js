//event listeners
var datasetButtons= ['#fire-station','#police-station']

datasetButtons.forEach(function(dataset){
  $(dataset).click(function(){
    console.log(dataset);
    //add toggle for showing icons on map
  })
});
