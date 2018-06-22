var animals = ["zebra", "yak", "wolverine", "xerus", "warthog", "vulture", "urial", "tapir", "salamander", "racoon", "quail", "puma", "oyster", "newt", "magpie", "leopard", "kangaroo", "jackal", "impala", "horse", "gecko", "ferret", "eagle", "duck", "cheetah", "bear", "alligator"];
var dispArr=[];


function displayAnimalGif() {

    var animal = $(this).attr("data-name");
    var key = "oYRWNoXKStn5LsjCA7Xs1cP3jxlbbU99"
    var queryURL = " http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + key + "&limit=10";

    $(".gifshere").empty(); 

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    

        // loop to process the 10 animals returned
        for (var i = 0; i < 10; i++) {

            // new div to hold result
            var newDiv=$('<div>');
            newDiv.attr({
                class: "gifbox"});
            // grab rating

            var rating=(`<p>Rating: ${ response.data[i].rating} </p>`);
          
            // grab image urls
            var imgurlS=response.data[i].images["original_still"].url;  
            var imgurlA=response.data[i].images["original"].url;  
            //store both in global var
            dispArr[i]={
                orig: imgurlA,
                static: imgurlS,
                staticState: true
            }
            // and put static img element
            var image=$('<img>').attr("src", imgurlS);
            // add data-name value, the - made it not happ if I tried to do it together with the above
            image.attr("data-name", i);
            // put rating and image in newdiv
            newDiv.append(rating,image);
            // display the new div on the page
            $('.gifshere').append(newDiv);

        }
    });
  }

// Function for creating & displaying the buttons
function renderButtons() {
    //   Clear button area
    $(".buttonsHere").empty(); 
    // Loop through the array of animals, then generate buttons for each animal in the array
    for (var i = 0; i < animals.length; i++) {
        // Then dynamicaly generates buttons for each movie in the array
        var a = $("<button>");
        // Adds a class of animal to our button
        a.addClass("animal");
        // Added a data-attribute
        a.attr("data-name", animals[i]);
        // Provided the initial button text
        a.text(animals[i]);
        // Added the button to the buttons-view div
        $(".buttonsHere").prepend(a);
    }
}

// This function handles events where the add animal button is clicked
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();
    // The animal from the textbox is then added to our array
    animals.push(animal);
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
    // Clear the input box
    $("#animal-input").val("");

});

//   This function changes between moving and static gif
function switchImg() {
    var imgnum=($(this).attr("data-name"));
    if (dispArr[imgnum].staticState) {
        $(this).attr("src", dispArr[imgnum].orig);
        dispArr[imgnum].staticState=false;
    }
    else {
        $(this).attr("src", dispArr[imgnum].static);
        dispArr[imgnum].staticState=true;
    }
}


// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalGif);
// Adding click event listeners to all images
$(document).on("click", "img", switchImg);

// Display initial buttons 
renderButtons();
