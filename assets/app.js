var topics = ["james Harden", "Houston Rockets", "Hummus", "Basketball", "Malcolm In The Middle", "cats", "Mohsin Hamid", "Family"];


function renderButtons() {
    $("#displayButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").attr("data-name", topics[i]).text(topics[i]).addClass("btn btn-warning");
        newButton.addClass("topicButtons")
        $("#displayButtons").append(newButton);
    }
}


$("#addTopic").on("click", function (event) {
    event.preventDefault();                                             // so that you can submit using the enter key
    var interest = $("#topicInput").val().trim();                       //.trim gets rid of the space before and after input
    topics.push(interest);
    renderButtons();
});


$(document).on("click", ".topicButtons", function () {                   // use document. on click becuase that will help asynchronus compile
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
        for (var i = 0; i < results.length; i++) {
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


$(document).on("click", ".gif", function() {
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