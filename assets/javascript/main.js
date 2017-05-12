
$(document).ready(function(){

  var proteinSearch = "";
  var vegSearch = "";
  var starchSearch = "";
  var stateID = "";
  var priceRange = 0;
  var priceRange = ["0.00-15.00","15.01-30.00","30.01-50.00","50.01-1000.00"];

  //Load in the API Keys
  $.ajax({
    method: "GET",
    url: "../config.json",
    dataType: "jsonp",
    success: function(response){
      console.log(response);
    }
  });

  //ToDo
  //listen for submit on each "tab"
  $("#submit").on("click", function(event){
    //Grab the user inputs
    event.preventDefault();

    proteinSearch = $("#protein").val().trim().toLowerCase();
    vegSearch = $("#vegetable").val().trim().toLowerCase();
    starchSearch = $("#starch").val().trim().toLowerCase();
    //priceRange = $("#starch").val().trim().toLowerCase();
    //stateID = $("#starch").val().trim().toLowerCase();

    //Call input validation, display error if found
    var validation =  checkInputsAreValid(proteinSearch, vegSearch, starchSearch);
    if(validation[0] === false){
      //show an error message here if the inputs arent good and bail continuation
      console.log(validation[1])
      return;
    }

    //Make the inputs into the URL Link to Query the Food API
    foodUrl = makeSeachIntoFoodURL(proteinSearch, vegSearch, starchSearch)

    //API call the recipes based on user inputs
    getRecipes(foodURL);

  });

  //Allow the user to push enter on the input"
  $(".form-control").on("keypress", function(event){
    if(event.keycode === 13){
      event.preventDefault();
      $("#submit").click()
    }
  });


  //validate the inputs are not all blank
  function checkInputsAreValid(pSearch, vSearch, sSearch, price, state){
    if (pSearch + vSearch + sSearch === ""){
      return [false, "Must enter a search criteria."];
    } else if(state === ""){
      return [false, "Please enter a state."];
    } else {
      return [true];
    }
  }

  function makeSearchIntoFoodURL(protein, veg, starch){

  }

  //Query the food API (or vice versa)
  function getRecipes(foodUrl, callBack){
    //Load in the API Keys
    $.ajax({
      method: "GET",
      url: foodUrl,
      dataType: "jsonp",
      success: function(response){
        foodResults = response;
        callBack(foodResults);
      }
    });

  }

  //parse the results
  function findKeySearchItemsFromRecipes(){

  }

  //Query the wine api (or vice versa) for the matching wines
  function getWines(){

  }

  //return the results to the page 
  function renderResults(){

  }

  //store recent searches??
});

