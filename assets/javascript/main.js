
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
  var priceChoice = 4;
  var numResults = 5;
  var priceRange = ["0.00|15.00","15.01|30.00","30.01|50.00","50.01|1000.00", "00.00|10000.00" ];
  var foodResults = [];
  var wineResults = [];
  var currentFoodResults = [[],[],[],[],[]];
  var currentWineResults = [[],[],[],[],[],[],[]];
  var validChars = [
    "a","b","c","d","e","f",
    "g","h","i","j","k","l",
    "m","n","o","p","q","r",
    "s","t","u","v","w","x",
    "y","z","1","2","3","4",
    "5","6","7","8","9"," ",
    "-"
  ];

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

    //reset the search box to blank afer a search
    $("#foodtext").val("");

    //Call input validation, display error if found
    var validation =  checkInputsAreValid(userSearch, stateID);
    if(validation[0] === false){
      //show an error message here if the inputs arent good and bail continuation
      console.log(validation[1]) //put this in a modal?
      return;
    }

    //Make the inputs into the URL and call the API
    if(searchType === "wine"){
      //Reset results holders
      currentFoodResults = [[],[],[],[],[]];
      currentWineResults = [[],[],[],[],[],[],[]];

      //Create the formatted urls
      wineUrl = makeSearchIntoWineURL(userSearch);
      foodUrl = makeSearchIntoFoodURL(matchWineToFood(userSearch));

      //API call the recipes based on user inputs
      getWines(wineUrl, extractWineResults(renderResults));
      getFoods(foodUrl, extractFoodResults(renderResults));

    } else { //If not a wine search always default to a primary food search
      //Reset results holders
      currentFoodResults = [[],[],[],[],[]];
      currentWineResults = [[],[],[],[],[],[],[]];

      //Create the formatted urls
      foodUrl = makeSearchIntoFoodURL(userSearch);
      wineUrl = makeSearchIntoWineURL(matchFoodToWine(userSearch));
   
      //API call the recipes based on user inputs
      getFoods(foodUrl, extractFoodResults);
      getWines(wineUrl, extractWineResults);

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
        return [false, "Invalid character ' " + srchChars[i] + " '"];
      }
      i--;
    }

    //Make sure user enters a state
    if(state === ""){
      return [false, "Please enter a state."];
    } 
    return [true]; //Return true if pass all checks
  }

  //Assembles the wine search URL based on user search criteria. Search
  //terms are expected to be passed in space delimited format
  function makeSearchIntoWineURL(userSearch){
    var srch = userSearch.replace(/\s/g, "+");
    return "http://services.wine.com/api/beta2/service.svc/JSON//catalog?" + 
      "search=" + srch +
      "&size=" + 30 + 
      "&offset=" + 0 + 
      "&state=" + stateID + 
      "&filter=price(" + priceRange[priceChoice] + ")" +  
      "&apikey=" + apiKeys.wine;
  }

  //Assembles the Food search URL based on user search criteria. Search
  //terms are expected to be passed in space delimited format
  function makeSearchIntoFoodURL(userSearch){
    var srch = userSearch.replace(/\s/g, "%20");
    return "http://food2fork.com/api/search?key=" + apiKeys.food + 
      "&q=" + srch;
  }


  //Query the wine api for the matching wines
  function getWines(wUrl, callback){
    $.ajax({
      method: "GET",
      url: wUrl,
      dataType: "jsonp"
    }).done(function(response){
      wineResults.push([userSearch, response]);//Store the wine results and the search that generated it in an array
      if(wineResults.length > 5){ //Only store last 5, if it gets too long then drop the oldest search
        wineResults.shift()
      }

      if(typeof callback === "function"){
        callback(wineResults[wineResults.length - 1][1]);
      }
    }).fail(function(err){
      console.log(err);
    });
  }

  //Query the food api for the matching foods
  function getFoods(fUrl, callback){
    $.ajax({
      method: "GET",
      url: fUrl,
      dataType: "json"
      // jsonpCallback: 'callback'
    }).done(function(response){

      foodResults.push([userSearch, response]); //Store the wine results and the search that generated it in an array
      if(foodResults.length > 5){ //Only store last 5, if it gets too long then drop the oldest search
        foodResults.shift()
      }
      if(typeof callback === "function"){
        callback(foodResults[foodResults.length -1][1]);
      }
    }).fail(function(err){
      console.log(err);
    });
  }

  //Takes the results of a recipe query and returns the wine search criteria
  //This is the "secret sauce" section of the code which determines the "match"
  //between the food and the wine
  function matchFoodToWine(uSearch){
    var terms = uSearch.split(" ");   //break the user search into an array of words
    var items = [];                   //Holds list of all wine matches based on search terms 
    var i = terms.length - 1;         //Iterator
  
    //Goes through search terms to find if there are paired wines in our matching table
    while(i > -1){
      if(ingredients[terms[i]]){
        items = items.concat(ingredients[terms[i]]);
      }
      i--;
    }

    //If no matches were found take the default wines
    if(items.length === 0){
      items = items.concat(ingredients.default);
    }
    items.sort();//sort items by alpha
    items = getMode(items);//get item(s) that appear most frequently

    //If there are more than 2 varietals to search then select 2
    //at random. In the future this would be more sophisticated for 
    //selection mechanism 
    if (items.length > 1){
      items = pickRandom(items); //returns two items from the array to search
    }

    return items;
  }

  //Function returns the item(s) that appears most frequently in an array
  //Returns an array of items that apear the most. For example in the array 
  //[1,2,2,3,3] it will return [2,3]. Parameter arr is assumed sorted
  function getMode(arr){
    var curWord, objKeys;
    var arrLen = arr.length;
    var i = 0;
    var curHigh = 0;
    var counter = 0;
    var countMap = {};

    if (arrLen > 0){ //Only run if the arr parameter has values
      curWord = arr[0];
      //Create the Count Map Object
      while(i < arrLen + 1){
        if (arr[i] === curWord){ //If same word seen again in array
          counter++; //increment counter
          countMap[curWord] = counter;
        } else { //otherwise
          if(curHigh < counter){
            curHigh = counter; //Identifies the "mode" number eg. "3" times
          }
          countMap[curWord] = counter;
          counter = 1; //reset counter
          curWord = arr[i]; //advance curWord to the curent word in loop
        }
        i++;  
      }

      //Go through the object and extract the keys with values = to curHigh
      objKeys = Object.keys(countMap);  //add the unique values from arr to an array
      i = 0;                            //reset iterator
      while(i < objKeys.length){        
        if(countMap[objKeys[i]] !== curHigh){ //check each key value pair looking values that match the mode number
          objKeys.splice(i,1);                //remove keys from the array that are not matching the mode number
          i--;
        }
        i++;
      }
      return objKeys;  //return array of keys that appeared mode

    } else {
      return null; //returns null if empty array
    }
  }

  //This function accepts an array of strings and selects one at random
  //It returns a selected items
  function pickRandom(arr){
    if(arr.length > 1){           //only run if there are more than 1 items in teh array
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }

  //Takes the wine search query results and return the food search criteria
  function matchWineToFood(queryResults){

  }

  //Take the results out of the food query and store them in an array - return the array
  function extractFoodResults(obj){
    //Extract the predefined number of results from the object
    for(var i = 0 ; i < numResults ; i++){
      currentFoodResults[0].push(obj.recipes[i].social_rank);
      currentFoodResults[1].push(obj.recipes[i].title);
      currentFoodResults[2].push(obj.recipes[i].image_url);
      currentFoodResults[3].push(obj.recipes[i].publisher);
      currentFoodResults[4].push(obj.recipes[i].source_url);
    } 
    console.log(currentFoodResults)
    return currentFoodResults;
  }

  //Take the results out of the wine query and store them in an array - return the array
  function extractWineResults(obj){
    //Extract the predefined number of results from the object
    for(var i = 0 ; i < numResults ; i++){
      currentWineResults[0].push(obj.Products.List[i].Ratings.Highestscore);
      currentWineResults[1].push(obj.Products.List[i].Name);
      currentWineResults[2].push(obj.Products.List[i].Labels[0].Url);
      currentWineResults[3].push(obj.Products.List[i].Vineyard.Name);
      currentWineResults[4].push(obj.Products.List[i].Vintage);
      currentWineResults[5].push(obj.Products.List[i].Retail.Price);
      currentWineResults[6].push(obj.Products.List[i].Varietal.Name);
    }
    console.log(currentWineResults)
    return currentWineResults;
  }

  //return the results to the page 
  function renderResults(disp){
    //append things to DOM
    if(disp.length === 2){//Only run if both wine and food results are available
      $("#results-area").empty();
      $("#results-area").append(disp);
    }
  }

  //store recent searches??
});

