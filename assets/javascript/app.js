// JavaScript  document

// *****************************************//
// This is code for the Trivial Trivia Game app.//
// For scalability object of strings(which can easily be made to object of objects) are used to hold the question
// and object of arrays(which can be expanded to object of objects) are used to hold the options.
// Feel free to download, fork and modify this code to be more robust and fun to play.
// ***************************************//

// Document Ready
$(document).ready(function (){
    let second = 1000;
    let answer;
    let correct;
    let wrong;
    let unanswered;
    let countDown;
    let questionsArr;
    let questionsCount;
    let songPlaying;
    let questions = {
        "What is capital of Argentina?":"Buenos Aires",
        "Who is the prime minister of the United Kingdom?":"Theresa May",
        "Where is Bahrain located?":"Middle East",
        "What is the capital Australia?": "Canberra",
        "Where is the hottest region in the world?":"Sahara Desert",
        "Which is the largest(land and water surface) country in the world?":"Russia",
        "Which is the most populous country in the world?":"China",
        "Which is the smallest(land and water surface) country in the world?":"Vatican City",
        "Which of the following is a country?":"Australia",
        "Where is Eritrea located?": "East Africa",
        "Which is the longest river on Earth?":"Amazon River",
        "How many continent are in the world?":"Seven",
    };
    let optionsArr = [
        ["Sao Paulo","Rosario","Lima","Bogota","Montevideo"],
        ["Tony Blair", "Justin Trudeau", "David Cameron", "Angela Merkel", "Malcolm Turnbull"],
        ["South East Asia", "Southern Africa", "South America", "Eastern Asia", "Northern Africa"],
        ["Sydney", "MelBourne", "Brisbane", "New Zealand", "Albany"],
        ["Amazon Forest", "Arabian Desert", "Kalahari Desert", "Congo Basin Forest", "Syrian Desert"],
        ["Canada", "China", "USA", "India", "Brazil"],
        ["India", "USA", "Nigeria", "Indonesia", "Brazil"],
        ["Singapore", "Dominica", "Trinidad and Tobago", "Bahrain", "Tuvalu"],
        ["Africa", "America", "Europe", "Asia", "Wankada"],
        ["West Africa", "South America", "Middle East", "Pacific Island", "East Asia"],
        ["Nile River", "Yangtze River", "Congo River", "Mississippi River", "Yellow River"],
        ["Five", "Nine", "Eight", "Four","Six"],
        // 12:["Tony Blair", "Justin Trudeau", "David Cameron", "Angela Merkel", "Malcolm Turnbull"],
    ];

     // Start new game.
    $(".start-game").on("click", "#new-game", function() {
        if (songPlaying !== undefined) { // Check if a song is playing
        songPlaying.pause();
        }
        $(this).hide(); 
        // $(this).prop("disabled", true); //disable instead of hide 
        correct = 0;
        wrong = 0;
        unanswered = 0;
        questionsArr= Object.keys(questions); //creates an array-type of object so the size of the object can be determined
        numOfQuestion = questionsArr.length;    // Determine the number of questions
        questionsCount = numOfQuestion - 1;     // -1 ensures that game logic stays within the index of array  
        songPlaying = gameSong("assets/images/song.mp3");
        displayQuestion();
    });

    // Display the page with the question
    function displayQuestion() {
        let timer = 10; //Resets timer
        $("#quiz-header").html("Time Remaining: " + timer + " seconds.");
        // Displays question using the array object "questionArr"
        $("#quiz-question").html("<h1>" + questionsArr[questionsCount] + "</h1>");

        //RenderButtons takes one argument; an object of arrays. Each property name of the object correspond to the 
        // arithmetic position of the question in questions object
        renderButtons(optionsArr[questionsCount]); // Displays the option buttons and take note of options selected
        // Timer for Seconds Remaining 
        countDown = setInterval(function() { 
            if (timer > 1) {
                $("#quiz-header").html("Time Remaining: " + timer + " seconds."); 
            }
            else {
                $("#quiz-header").html("Time Remaining: " + timer + " second."); 
            }
            timer--;
            if (timer < 0) {
                clearInterval(countDown); // CLears the setInterval for timer                 
                setTimeout(displayAnswer, 1000);//Wait one second before displaying answer. (allows 0 second to appear)
            }
        }, 1000);           
    }

    function renderButtons(optArr) { //renders the option buttons for the answer
        $("#quiz-option").empty(); //Clears the div

        // Get a random number between 0 and 4 to use for randomly placing the correct option
        let position = Math.floor(Math.random() * 5);

        //For creating buttons
        // for loop to create and fill 5 buttons
        for (let i = 0; i < optArr.length; i++) {
            let btn = $("<button class = 'options'>");
            btn.css({"width": "250", "color": "#483d8b", "font-size":"30px","font-weight":"100", "background-color":"#daccdb"} );//decorate
            // This condition fill in options from a list while randomly selecting a location for the correct option (using position).
            if (i === position) {
                btn.text(questions[questionsArr[questionsCount]]);
            }
            else{
                btn.text(optArr[i]);
            }
            $("#quiz-option").append("<br>", btn);
        }

        //For button decorations
        // .hover() takes 2 arguments handlerIn and handlerOut for when the mouse enters and leave the area respectively
        // The $ selector is on the class not the button to apply to all of the buttons  
        $(".options").hover(function(){
            $(this).css({"color": "#483d8b", "font-size":"30px", "font-weight":"900","background-color":"#e8d8be"});
        },function(){
            $( this ).css({"color": "#483d8b", "font-size":"30px", "font-weight":"100", "background-color":"#daccdb"});
        });

        let response;  //Use to get user click option
        answer =  false;
        unanswered++; // acknowledge that there is no response yet
        $(".options").on("click", function(event){
            event.preventDefault();
            response = $(this).text(); //Save the response in the variable response
            unanswered--; //Acknowledge there was a response
            if (response === questions[questionsArr[questionsCount]]) {
                answer = true;
                correct++
            }
            else {
                answer = false;
                wrong++;
            }
            // This part makes sure that the answer page is display on click of any of the buttons right or wrong
            clearInterval(countDown); // CLears the setInterval for timer    
            displayAnswer();          // Display answer.
        });
    }

    function displayAnswer() {
        let imageClick = $("<div class= 'image-holder'>"); //create a div to hold image
        let imgPath = "assets/images/" + (questions[questionsArr[questionsCount]]).toLowerCase() + ".jpg";
        let image = $("<img>").attr("src", imgPath); //create an image tag
        image.width(200);
        imageClick.html(image);

        // Condition checks and displays reponse accordingly
        if (answer) {
            $("#quiz-header").html("<h2>" + "Correct!" + "</h2>");
        }
        else {
            $("#quiz-header").html("<h2>" + "Nope!" + "</h2>");
        }       
        $("#quiz-option").html(imageClick);
        $("#quiz-option").append("<h3>" + questions[questionsArr[questionsCount]] + " was the right answer" + "</h3>");
        
        if (questionsCount > 0){ //Checks if the last question has been rendered
            setTimeout(displayQuestion, 5000);
        } 
        else {
            setTimeout(displayResult, 5000);
         }
         questionsCount--; 
    }

    // Displays result after game ends 
    function displayResult() {
        $("#new-game").show("slow");
        // $("new-game").prop("disabled", false);
        $("#quiz-header").html("<h1>" + "Game Over!!!" + "</h1>");
        $("#quiz-question").html("<h2>" + "This is how you did" + "</h2>");
        $("#quiz-option").html("<h3>" + "Total Questions: " + numOfQuestion + "<br>" + "Correct Answers: " + correct + "<br>" + "Wrong Answers: " +  wrong + "<br>" + "Unanswered: " + unanswered + "<br>" + "Grade: " + Math.round((correct/numOfQuestion)*100) + "%" + "<br>" + "Click on New Game to play again." + "</h3>");
    }

    function gameSong(s) { // key sounds function 
        x = document.createElement("audio");
        x.setAttribute("src", s);
        x.play();
        return x; //return x to songPlaying
    };
})