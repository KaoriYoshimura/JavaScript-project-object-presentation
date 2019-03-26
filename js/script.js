$(document).ready(function(){

    // Declare function to reuse getJSON function
    function runJSON (keyWord){

        // Define URL
        var format = "&format=json&jsoncallback=?";
        var JSONdata = "http://www.flickr.com/services/feeds/photos_public.gne?tags=" + keyWord + format;

        $.getJSON(JSONdata, function(data){

            var output = '';

            // Fetch data from URL and pile up
            $.each(data.items, function (i, values){

                output += '<section class="dialog" id="' + i + '">';
                output += '<h2>' + values.title + '</h2>';
                output += '<img src=' + values.media.m + ' >';
                output += '</section>';

            });

            // Set piled up data as html and print out
            $("#printOut").html(output);

            // Run dialog UI when clicking each section
            $("section.dialog").on("click", function(event) {

                // Fetch values from JSON by using id in the clicked section
                var dialogImgUrl = (data.items[event.currentTarget.id]).media.m;
                var dialogTitle = (data.items[event.currentTarget.id]).title;
                var dialogTime = ((data.items[event.currentTarget.id]).published).substring(0,10);

                // Set values in html
                var dialogP = $("<p>").text(dialogTime);
                var dialogImage = $("<img>").addClass("dialogImg").attr("src", dialogImgUrl);
                
                // Set or replace image html into div to print out
                $('#printOutForDialog').html(dialogImage);
                $('#printOutForDialog').append(dialogP);
                
                // Run dialog UI
                $('#printOutForDialog').dialog( {
                    title: dialogTitle,
                    width: '535'
                });

            });

        });
    };

    // Run getJSON with default keyword "soccer"
    runJSON("soccer");

    // Show the images according to the searched word
    $("#search").on("click",function(){

        var inputField = $("#input");

        if(inputField.val() === '') {
            alert('Please type a new category');

        } else {
            // Run getJSON with searched word
            runJSON(inputField.val().toLowerCase());

        }

        // Empty input field after showing the result
        inputField.val('')

    });

    // Switch class for printOut div
    $(".switch").on("click", { floatClass: "float", flexClass: "flex-box", activeClass: "isActive"}, function(event){

        // Set an active class for the selected button
        $(".switch").removeClass(event.data.activeClass);
        $(this).addClass(event.data.activeClass);

        // Remove class of flot/flex-box
        $("#printOut").removeClass();
        
        if($(this).attr("id") ==="toFlexbox") {

            // If flexbox button is clicked add a flex class
            $("#printOut").addClass(event.data.flexClass);

        } else {

            // If flexbox button is clicked add a float class
            $("#printOut").addClass(event.data.floatClass);

            // Define a variable to align height av sections
            var maxHeight = 0;
            // Run a loop and check each height. If a section's height is higher than maxHeight, set the height value in the maxHeight value.
            $("section").each(function(){
            if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
            }
            });
            // Set sections' height value = maxHeight
            $("section").height(maxHeight);
        };

    });

}) ;
