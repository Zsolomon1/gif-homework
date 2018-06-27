
$( document ).ready(function() {

   
   var topic = ["Black Panther", "Beyonce", "Serena Williams", "Denzel Washington", "Barack Obama", "Oprah Winfrey", "Michale Jordan","Michael Jackson"];
   
   
   
   function displayGifButtons() {
       $("#gifButtonsView").empty();
       for (var i = 0; i < topic.length; i++) {
           var gifButton = $("<button>");
           gifButton.addClass("lady");
           gifButton.addClass("btn btn-primary")
           gifButton.attr("data-name", topic[i]);
           gifButton.text(topic[i]);
           $("#gifButtonsView").append(gifButton);
       }
   }
   

   
   function addNewButton() {
       $("#addGif").on("click", function() {
           var lady = $("#topicInput").val().trim();
           if (lady == ""){
               return false;
           }
           topic.push(lady);
   
           displayGifButtons();
           return false;
           });
   }
   
 
   function removeLastButton() {
       $("removeGif").on("click", function() {
           topic.pop(lady);
           displayGifButtons();
           return false;
       });
   
   }
   
   
   
   function displayGifs() {
       var lady = $(this).attr("data-name");
       var queryURL = "c" + lady + "&api_key=dc6zaTOxFJmzC&limit=8";
       
       $.ajax({
           url: queryURL,
           method: 'GET'
       })
   
       .done(function(response) {
           $("#gifsView").empty();
           
           var results = response.data;
           if (results == ""){
               alert("There is not a giffy for this!");    
           }
           for (var i = 0; i<results.length; i++){
               
               var gifDiv = $("<div1>");
               
               var gifRating = $("<p>").text("Rating " + results[i].rating);
               gifDiv.append(gifRating);
   
               
               var gifImage = $("<img>");
               gifImage.attr("src", results[i].images.fixed_height_small_still.url);
               
               gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
               
               gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
               
               gifImage.attr("data-state", "still");
               gifImage.addClass("image");
               gifDiv.append(gifImage);
               
               $("#gifsView").prepend(gifDiv);
           }
       });
   }
   
   
   
   displayGifButtons();
   addNewButton();
   removeLastButton();
   
   
   
   
   $(document).on("click", ".lady", displayGifs);
   $(document).on("click", ".image", function() {
       var state = $(this).attr('data-state');
       if (state == 'still') {
           $(this).attr('src', $(this).data('animate'));
           $(this).attr('data-state', 'animate');
       }else {
           $(this).attr('src', $(this).data('still'));
           $(this).attr('data-state', 'still');
       }
   
       });
   
   });