# TriviaGame

// *****************************************//
// This is code for the Trivial Trivia Game app.//
// For scalability object of strings(which can easily be made to object of objects) is used to hold the question
// and object of arrays(which can be expanded to object of objects) is used to hold the options.
//Download, fork and modify code for free to be more robust and fun to play.
//Alexander J. Obaseki
// ***************************************//

Game begins with a click event on the "new game" button
The button is then hidden to avoid accidental or delibrate clicking of the button during the duration of the game.
variables are initialized to save responses and score.
Then the call back function calls displayQuestion().

displayQuestion()
displayQuestion() calls renderButtons which displays each question and the button of options.
displayQuestion() runs(countDown)which display the (timer =10) until it is equals 0. (Use "if" conditional to check timer). And then clears countDown and calls displayAnswer()

displayAnswer()
Display the correct answer and whether or not user response was right.
Calls displayQuestion().

The loop continue until questionCount is equals zero, then displayResult is called which display the users final score.
App is hosted on github pages on [here](https://jealob.github.io/TriviaGame/).