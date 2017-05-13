
//$(document).ready(function(){

  var userSearch = "";
  var searchType = "food"; //may change to wine based on user selection
  var stateID = "";
  var priceChoice = 0;
  var priceRange = ["0.00-15.00","15.01-30.00","30.01-50.00","50.01-1000.00"];
  var foodComKey = "";
  var wineComKey = "";
  var foodUrl = "";
  var wineUrl = "";
  var apiKeys = {
    food: "",
    wine: ""
  };

  //Load in the API Keys
 function loadAPIKeys(callback){
    $.ajax({
      method: "GET",
      url: "../config.json",
      dataType: "json"
    }).done(function(response){
        apiKeys.food = response.foodKey;
        apiKeys.wine = response.wineKey;
        if(typeof callback === "function"){
          callback(apiKeys);
        }
    }).fail(function(err){
      callback("failed:" + JSON.stringify(err));
    });
  };

  loadAPIKeys(storIt);

  function storIt(thing){
    console.log(apiKeys.food, apiKeys.wine)
  }

  //ToDo
  //listen for submit on each "tab"
  $("#submit").on("click", function(event){
    //Grab the user inputs
    event.preventDefault();
    userSearch = $("#protein").val().trim().toLowerCase();
    //searchType = $("#typeGroup").val().trim().toLowerCase(); //determine type here
    //need grab rest of inputs here

    //Call input validation, display error if found
    var validation =  checkInputsAreValid(userSearch, price, state );
    if(validation[0] === false){
      //show an error message here if the inputs arent good and bail continuation
      console.log(validation[1])
      return;
    }

    //Make the inputs into the URL Link to Query the Food API
    if(searchType === "wine"){
      wineUrl = makeSeachIntoWineURL(wineTypeSearch)
    } else {
      foodUrl = makeSeachIntoFoodURL(wineTypeSearch)
    }
    //API call the recipes based on user inputs
    getWines(wineUrl, logit);

  });

  //Allow the user to push enter on the input"
  $(".form-control").on("keypress", function(event){
    if(event.keycode === 13){
      event.preventDefault();
      $("#submit").click()
    }
  });


  //validate the inputs are not all blank
  function checkInputsAreValid(wSearch, fSearch, price, state){
    if (wSearch + fSearch === ""){
      return [false, "Must enter a search criteria."];
    } else if(state === ""){
      return [false, "Please enter a state."];
    } else {
      return [true];
    }
  }

  function makeSeachIntoWineURL(userSearch){
    var srch = userSearch.replace(/\s/g, "+");
    return "http://services.wine.com/api/beta2/service.svc/JSON//catalog?search=" + srch+ "&size=5&offset=10&apikey=" + "9423d2c8326f4d2c768425852bce8030";
  }

  //parse the results
  function findVinyardLocations(qResults){
    

  }

  //Query the wine api (or vice versa) for the matching wines
  function getWines(wineUrl, callback){
    $.ajax({
      method: "GET",
      url: wineUrl,
      success: function(response){
        foodResults = response;
        callback(foodResults);
      }
    });
  }

  //return the results to the page 
  function renderResults(){

  }

  //store recent searches??
//});

