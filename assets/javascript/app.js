//questions object array

var questCurrent;
var questDisney = [
	{
		question: "On what planet, did Luke Skywalker train with Yoda?",
		choice: ["Tatooine", "Dagobah", "Corellia", "Onderon"],
		answer: 1,
		photo: "assets/images/Yoda-Image.jpg"
	},
	{
		question: "Ben Solo is also known by what name?",
		choice: ["Kylo Ren", "Ben Kenobi", "Rey", "Ben Skywalker"],
		answer: 0,
		photo: "assets/images/Ben-Solo-Hand.jpg"
	},
	{
		question: "Who Shot First!?",
		choice: ["Greedo", "Han Solo", "Chewbacca", "Jabba"],
		answer: 1,
		photo: "assets/images/Han-Greedo.jpg"
	},
	{
		question: "What is the name of Han Solo's ship",
		choice: ["Destroyer", "Enterprise", "Millenium Falcon", "Kobe Maru"],
		answer: 2,
		photo: "assets/images/Han-Falcon.jpg"
	},
	{
		question: "Who originally built C3P0?",
		choice: ["Luke Skywalker", "Obi-Wan Kenobi", "Darth Vader", "Anakin Skywalker"],
		answer: 3,
		photo: "assets/images/C3P0-image.jpg"
	},
	{
		question: "Ahsoka Tano was the padawan of which Jedi Knight?",
		choice: ["Plo Koon", "Anakin Skywalker", "Luminara", "Barris Offee"],
		answer: 1,
		photo: "assets/images/Darth-Ahsoka.png"
	},
	{
		question: "Who was the only redeeming prequel trilogy character?",
		choice: ["Jar Jar Binks", "Qui Gon Jinn", "Padme Amidala", "Kylo Ren"],
		answer: 1,
		photo: "assets/images/quigon-image.png"
	},
	{
		question: "Who is the actual leader of Rogue Squadron",
		choice: ["Wedge Antilles", "Biggs Darklighter", "Luke Skywalker", "Poe Dameron"],
		answer: 0,
		photo: "assets/images/rogue-squadron.jpg"
	}];

var questEU = [
	{
		question: "Which Jedi Knight was the Hero of the Mandalorian Wars?", 
		choice: ["Malak", "Revan", "Meetra Surik", "Bastila Shan"],
		answer: 1,
		photo: "assets/images/revan-image.png"
	 },
	 {
		 question: "Darth Caedus real name is what?", 
		choice: ["Jacen Solo", "Ben Solo", "Jaina Solo", "Ben Skywalker"],
		answer: 0,
		photo: "assets/images/darth-caedus-image.jpg"
	 }, 
	 {
		 question: "The wife of Luke Skywalker is?", 
		choice: ["Leia Organa", "Mara Jade", "Rey", "Satele Shan" ],
		answer: 1,
		photo: "assets/images/mara-jade-image.jpg"
	}, 
	{
		question: "What race of Aliens nearly destroyed the New Republic and despised technology?", 
		choice: ["Chiss", "Rancor", "Yuuzhan Vong", "Twi'lek" ],
		answer: 2,
		photo: "assets/images/yuuzhan-vong-image.jpg"
	}, 
	{
		question: "Darth Nihilus was part of what Sith group?", 
		choice: ["Empire", "Rebellion", "Horde", "Triumvirate" ],
		answer: 3,
		photo: "assets/images/darth-nihilus-image.jpg"
	}, 
	{
		question: "in the Epic Battle of Uroro Station, 41ABY, which Jedi killed Darth Caedus?", 
		choice: ["Luke Skywalker", "Jaina Solo", "Ben Skywalker", "Han Solo" ],
		answer: 1,
		photo: "assets/images/jaina-jacen-image.jpg"
	}, 
	{
		question: "Which Chiss Admiral was considered a tactical genius and rallied the Empire Remnants?", 
		choice: ["Grand Moff Tarkin", "Grand Admiral Thrawn", "Darth Vader", "Supreme Leader Snoke" ],
		answer: 1,
		photo: "assets/images/thrawn-image.jpg"
	}, 
	{
		question: "Which Jedi Master initially started as a stormtrooper before being trained by Luke?", 
		choice: ["Kyle Katarn", "Han Solo", "Finn", "Captain Phasma" ],
		answer: 0,
		photo: "assets/images/kyle-katarn-image.jpg"
	}];
// variables too use
var correct = 0;
var wrong = 0;
var unanswered = 0;
var timer = 20;
var intervalId;
var userGuess = "";
var running = false;
var questCounterDisney;
// var questCounterEU = questEU.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide()
//Disney Section!
 $("#disney").on("click", function () {
	questCurrent = questDisney;
	questCounterDisney = questCurrent.length;
	$("#disney").hide();
	$("#EU").hide();
	displayQuestion();
	timeStart();
	for (var i = 0; i < questCurrent.length; i++) {
		holder.push(questCurrent[i]);
	}
})
// EU section
$("#EU").on("click", function () {
	questCurrent = questEU;
	questCounterDisney = questCurrent.length;
	$("#disney").hide();
	$("#EU").hide();
	displayQuestion();
	timeStart();
	for (var i = 0; i < questCurrent.length; i++) {
		holder.push(questCurrent[i]);
	}
})

//functions
// Timer Function: Start
function timeStart() {
	if (!running) {
		intervalId = setInterval(timeDecrease, 1000);
		running = true;
	}
}
//Timer Decrease
function timeDecrease() {
	$("#timer").html("<h3>Time remaining: " + timer + "</h3>");
	timer--;

	//updated counter if time runs out
	if (timer === 0) {
		unanswered++;
		stop();
		$("#answersection").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidebackground();
	}
}
// stops timer
function timeStop() {
	running = false;
	clearInterval(intervalId);
	$("#timer").empty()
}
// Generates the question
function displayQuestion() {
	// grabs a question randomly from array
	index = Math.floor(Math.random() * questCurrent.length);
	pick = questCurrent[index];
	// updates associated background photo w/question
	$("#backgroundphoto").css("background-image", "url(" + pick.photo + ")");
	// empty's the previous question
	$("#answersection").empty()
	// displays the picked question in div
	$("#questionsection").html("<h2>" + pick.question + "</h2>");
	// for loop to loop through picked question answer choices
	for (var i = 0; i < pick.choice.length; i++) {
		// adding buttons too each answer choice
		// EDIT! MUST ADD "CLICK LISTENER" TOO DYNAMICALLY CREATED BUTTONS BEFORE THEY ARE CREATED!
		// WILL NOT REGISTER "CLICK" IF CREATED AFTER 
			var userChoice = $("<button>" + pick.choice[i] + "</button>").on("click", function (){ 
				// use parseint too turn the choice string into guessvalue number
				userGuess = parseInt($(this).attr("data-guessvalue"));

				console.log(userGuess)
				// compares the string that was turned into number against the answer pick number
				// if numbers are the same update correct counter
				if (userGuess === pick.answer) {
				stop();
				correct++;
				userGuess = "";
				$("#answersection").html("<p>Correct!</p>");
				hidebackground();
				// if numbers are different updated wrong counter
				} else {
				stop();
				wrong++;
				userGuess = "";
				$("#answersection").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
				hidebackground();
			}
		})
			userChoice.addClass("answerchoice");
			userChoice.attr("data-guessvalue", i)
			userChoice.addClass("btn btn-dark btn-sm")
			$("#answersection").append(userChoice);
		};
		
		
	}
	console.log(displayQuestion)

// hides picture after 
function hidebackground() {
	$("#backgroundphoto").css("background-image", "url(" + pick.photo + ")");
	newArray.push(pick);
	questCurrent.splice(index, 1);

	var hideback = setTimeout(function () {
		timer = 20;

		if ((wrong + correct + unanswered) === questCounterDisney) {
			
			timeStop()
			$("#questionsection").empty();
			$("#questionsection").html("<h3>Game Over!  Here's how you did: </h3>");
			$("#answersection").append("<h4> Correct: " + correct + "</h4>");
			$("#answersection").append("<h4> Incorrect: " + wrong + "</h4>");
			$("#answersection").append("<h4> Unanswered: " + unanswered + "</h4>");
			$("#reset").show();
			correct = 0;
			wrong = 0;
			unanswered = 0;

		} else {
			timeStart();
			displayQuestion();

		}
	}, 3000);

}

$(".answerchoice").on("click", function () {

	userGuess = parseInt($(this).attr("data-guessvalue"));

	console.log(userGuess)
	if (userGuess === pick.answer) {
		stop();
		correct++;
		userGuess = "";
		$("#answersection").html("<h3>Correct!</h3>");
		hidebackground();

	} else {
		stop();
		wrong++;
		userGuess = "";
		$("#answersection").html("<h3>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</h3>");
		hidebackground();
	}
})

$("#reset").on("click", function () {
	$("#reset").hide();
	$("#answersection").empty();
	$("#questionsection").empty();
	$("#backgroundphoto").css("background-image", " url('assets/images/star-wars-trivia-bg.jpg' )");
	$("#disney").show()
	$("#EU").show()
	
	for (var i = 0; i < holder.length; i++) {
		questCurrent.push(holder[i]);
	}
})