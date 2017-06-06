var triviaQuestions = [{
	question: "In what year was the NFL founded?",
	answerList: ["1947", "1920", "1930", "2000"],
	answer: 1
},{
	question: "Who is the current commisioner of the NFL?",
	answerList: ["Roger Goodell", "John Mara", "Mark Zuckerberg", "Bill Belichick"],
	answer: 0
},{
	question: "Which NFL Quarterback has the record for most Super Bowl wins?",
	answerList: ["Tom Brady", "Joe Montana", "Terry Bradshaw", "Peyton Manning"],
	answer: 0
},{
	question: "How many Super Bowls have the New York Giants won?",
	answerList: ["5", "3", "4", "2"],
	answer: 2
},{
	question: "Which NFL Franchise has the record for most Super Bowl wins?",
	answerList: ["San Francisco 49ers", "New England Patriots", "Dallas Cowboys", "Pittsburgh Steelers"],
	answer: 3
},{
	question: "Of the following teams, which team has never won a Super Bowl?",
	answerList: ["Philadelphia Eagles", "Baltimore Ravens", "Oakland Raiders", "New York Jets"],
	answer: 0
},{
	question: "Who was the NFL Offensive Rookie of the Year in 2014?",
	answerList: ["Teddy Bridgewater", "Odell Beckham Jr.", "Mike Evans", "Sammy Watkins"],
	answer: 1
},{
	question: "How many years must an NFL player be retired before they are considered for the Hall of Fame?",
	answerList: ["10", "15", "5", "3"],
	answer: 2
},{
	question: "What year were NFL players first required to wear helmets?",
	answerList: ["1935", "1943", "1960", "1950"],
	answer: 1
},{
	question: "Who won the first Super Bowl?",
	answerList: ["Baltimore Colts", "New York Giants", "Dallas Cowboys", "Green Bay Packers"],
	answer: 3
},{
	question: "Which quarterback holds the record for longest touchdown run?",
	answerList: ["Terrelle Pryor", "Colin Kaepernick", "Marcus Mariotta", "Eli Manning"],
	answer: 0
},{
	question: "Which defensive player holds the record for most sacks in a single season?",
	answerList: ["Troy Polamalu", "Michael Strahan", "J.J. Watt", "Darrelle Revis"],
	answer: 1
},{
	question: "Which kick-return specialist holds the records for most kick returns for a touchdown?",
	answerList: ["Deion Sanders", "Desmond Howard", "Dwayne Harris", "Devin Hester"],
	answer: 3
},{
	question: "Who holds the record for the most touchdown passes in a season?",
	answerList: ["Peyton Manning", "Tom Brady", "Joe Montana", "Dan Marino"],
	answer: 0
},{
	question: "In what year did the Giants last win the Super Bowl?",
	answerList: ["2008", "2010", "2012", "2013"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
