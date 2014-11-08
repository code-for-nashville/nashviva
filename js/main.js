//event listeners
var datasetButtons= ['#fire-station','#police-station','#wifi', '#parks']

datasetButtons.forEach(function(dataset){
  $(dataset).click(function(){
    console.log(this);
    //add toggle for showing icons on map
  })
});
