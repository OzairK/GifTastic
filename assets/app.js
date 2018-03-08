var topics = ["james Harden", "Houston Rockets", "Hummus", "Basketball", "Malcolm In The Middle", "cats", "Casey Neistat", "Family"];


function renderButtons() {                                              //displays buttons from array, and assigns it data attributes and classes
    $("#displayButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").attr("data-name", topics[i]).text(topics[i]).addClass("btn btn-warning");
        newButton.addClass("topicButtons")
        $("#displayButtons").append(newButton);
    }
}


$("#addTopic").on("click", function (event) {                           // adds new item to array and call renderbutton
    event.preventDefault();                                             // so that you can submit using the enter key
    var interest = $("#topicInput").val().trim();                       //.trim gets rid of the space before and after input
    topics.push(interest);
    renderButtons();
});


$(document).on("click", ".topicButtons", function () {                  // when a topic is selected this is called, it makes the ajax reques   
    var interest = $(this).attr("data-name");
    var interest = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +    
    interest + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {                      //displays all the gifs and their ratings, and add data attibutes, of still, animate and state
            var topicDiv = $("<div>").addClass("horizontal");
            var p= $("<p>").text(`Rating: ${results[i].rating}`);
            var stillURL= results[i].images.fixed_height_still.url;
            var animateURL = results[i].images.fixed_height.url;
            var topicImage= $("<img>").attr("data-state", "still").attr("data-still", stillURL).attr("data-animate", animateURL );
            topicImage.addClass("gif");
            topicImage.attr("src", results[i].images.fixed_height_still.url); 
            topicDiv.prepend(p);
            topicDiv.append(topicImage);
            $("#displayGifs").prepend(topicDiv);

        }
    });   
});


$(document).on("click", ".gif", function() {                            //gif is clicked, if state is still, change source to animate else change to source to animate
    var state = $(this).attr("data-state");                  
    if(state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

renderButtons();