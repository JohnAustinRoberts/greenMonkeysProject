
$(document).ready(function(){

  var apiKeys = {
    food: "",
    wine: ""
  };
  var userSearch = "";
  var searchType = "food"; //may change to wine based on user selection
  var stateID = "NJ"; //default NJ for testing
  var foodUrl = "";
  var wineUrl = "";
  var priceChoice = 0;
  var priceRange = ["0.00-15.00","15.01-30.00","30.01-50.00","50.01-1000.00"];
  var foodResults = [];
  var wineResults = [];
  var validChars = ["a","b","c","d","e","f",
                    "g","h","i","j","k","l",
                    "m","n","o","p","q","r",
                    "s","t","u","v","w","x",
                    "y","z","1","2","3","4",
                    "5","6","7","8","9"," "];

  //Load in the API Keys
 function loadAPIKeys(){
    $.ajax({
      method: "GET",
      url: "../config.json",
      dataType: "json"
    }).done(function(response){
        apiKeys.food = response.foodKey;
        apiKeys.wine = response.wineKey;
    }).fail(function(err){
      console.log("failed:" + JSON.stringify(err));
    });
  };

  loadAPIKeys();

  function logIt(thing){
    console.log(JSON.stringify(thing));
  }

  //Toggle between wine and food search
  $(".nav-tabs").on("click", function(event){
    var clicked = event.target.parentNode.id;//Determine the clicked tab
    var active = $(".active").attr("id");//Determine the active tab
    if (clicked !== active){ //If the user didn't select the active tab then switch tabs
      $("#" + active).toggleClass("active");
      $("#" + clicked).toggleClass("active");
    }
  });

  //listen for submit on each "tab"
  $("#submit").on("click", function(event){
    //Grab the user inputs
    event.preventDefault();
    userSearch = $("#foodtext").val().trim().toLowerCase();
    searchType = $(".active").attr("id").slice(0,4);

    //need grab rest of inputs here like state and 

    //Call input validation, display error if found
    var validation =  checkInputsAreValid(userSearch, stateID);
    console.log(validation);
    if(validation[0] === false){
      //show an error message here if the inputs arent good and bail continuation
      console.log(validation[1]) //put this in a modal?
      return;
    }
    return

    //Make the inputs into the URL and call the API
    if(searchType === "wine"){
      //Create the formatted url
      wineUrl = makeSeachIntoWineURL(userSearch)
      //API call the recipes based on user inputs
      getWines(wineUrl, logIt);
    } else {
      //Create the formatted url
      foodUrl = makeSeachIntoFoodURL(userSearch)
      //API call the recipes based on user inputs
      getFoods(foodUrl, logIt);
    }
  });

  //Allow the user to push "enter" on the input
  $(".form-control").on("keypress", function(event){
    if(event.keycode === 13){
      event.preventDefault();
      $("#submit").click();
    }
  });


  //validate the inputs are not blank and have valid characters
  function checkInputsAreValid(uSearch, state){
    var srchChars = uSearch.split("");
    var numChars = srchChars.length
    var i = numChars - 1;

    //Check that the search isn't blank
    if (numChars === 0){
      return [false, "Must enter a search criteria."];
    }

    //Check that search is only letters and numbers
    while(i > -1){
      srchChars[i]
      if(validChars.indexOf(srchChars[i]) === -1){

        return [false, "Invalid character '" + srchChars[i] + "'"];
      }
      i--;
    }

    //Make sure they enter a state
    if(state === ""){
      return [false, "Please enter a state."];
    } 

    //Return true if pass all checks
    return [true];
  }

  function makeSeachIntoWineURL(userSearch){
    var srch = userSearch.replace(/\s/g, "%20");
    return "http://services.wine.com/api/beta2/service.svc/JSON//catalog?search=" + srch+ "&size=5&offset=10&apikey=" + apiKeys.wine;
  }

  function makeSeachIntoFoodURL(userSearch){
    var srch = userSearch.replace(/\s/g, "%20");
    return "http://food2fork.com/api/search?key=" + apiKeys.food + "&q=" + srch;
  }


  //Query the wine api (or vice versa) for the matching wines
  function getWines(wUrl, callback){
    $.ajax({
      method: "GET",
      url: wUrl,
      dataType: "jsonp"
    }).done(function(response){
      wineResults.push([userSearch, response]);
      if(wineResults.length > 5){
        wineResults.shift()
      }

      if(typeof callback === "function"){
        callback(wineResults);
      }
    }).fail(function(err){
      console.log(err);
    });
  }

  //Query the food api (or vice versa) for the matching foods
  function getFoods(fUrl, callback){
    $.ajax({
      method: "GET",
      url: fUrl,
      dataType: "json"
      // jsonpCallback: 'callback'
    }).done(function(response){
      foodResults.push([userSearch, response]);
      if(foodResults.length > 5){
        foodResults.shift()
      }
      if(typeof callback === "function"){
        callback(foodResults[0][1]);
      }
    }).fail(function(err){
      console.log(err);
    });
  }

  //return the results to the page 
  function renderResults(){
    //append things to DOM
  }

  //store recent searches??
});

