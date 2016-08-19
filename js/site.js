$(document).ready(function(){
	displayScoreboard( loadScores() );

	$('#submit').on('click', function(){
		var playerChoice = $('#choice').val();
		var aiChoice = aiChoose();
		

		//toggle countdown modal
		$('#countdownModal-1').modal('toggle');
		setTimeout( function(){ $('#countdownModal-1').modal('toggle'); 
			$('#countdownModal-2').modal('toggle');
			setTimeout( function(){ $('#countdownModal-2').modal('toggle'); 
				$('#countdownModal-3').modal('toggle');
				setTimeout( function(){ $('#countdownModal-3').modal('toggle'); 
					$('#countdownModal-shoot').modal('toggle');
					setTimeout( function(){ 
							$('#countdownModal-shoot').modal('toggle'); 
							whoWins(playerChoice, aiChoice);
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);		
	});
});

function whoWins(player, ai){
	// rock > lizard, scissors
	// paper > rock, spock
	// scissors > paper, lizard
	// spock > scissors, rock
	// lizard > paper, spock

	var result = '';
	if(player == ai){ result = 'draw'; }
	else if( (player == 'rock' && (ai == 'lizard' || ai == 'scissors')) 
			|| ( player == 'paper' && (ai == 'rock' || ai == 'spock'))
			|| ( player == 'scissors' && (ai == 'lizard' || ai == 'paper'))
			|| ( player == 'spock' && (ai == 'scissors' || ai == 'rock'))
			|| ( player == 'lizard' && (ai == 'paper' || ai == 'spock'))
		){ 
		result = 'win'; 
	} else {
		result = 'lose';
	}

	//display hand icons
	$('#showdown').empty();
	$('#showdown').append(
		"<label>"+ player.toUpperCase() +"<i class='fa fa-5x fa-hand-"+ player +"-o'></i></label>"
		+"<h4>VS</h4>"
		+"<label>"+ ai.toUpperCase() +"<i class='fa fa-5x fa-hand-"+ ai +"-o'></i></label>"
		);
	$('#showdownModal').modal('show');
	// append win, lose, or draw image to modal
	$('#win-or-lose').empty()
	$('#win-or-lose').append("<img src='resources/"+result+".png'>")

	// wait 3 seconds and hide
	setTimeout(function(){
		$('#showdownModal').modal('hide');
		$('#winLoseModal').modal('show');
	}, 2500)

	//display results
	updateScore(result);
}

function storeScores(scores){
	localStorage.setItem('rpssllScores', JSON.stringify(scores));
}

function loadScores(){
	var scores = JSON.parse( localStorage.getItem('rpssllScores') );
	if(scores == null){
		scores = { player: 0, ai: 0, draw: 0 };
		storeScores(scores);
	}
	console.log(scores);
	
	return scores;
}

function displayScoreboard(scores){
	$('#playerScore').empty();
	$('#aiScore').empty();
	$('#draws').empty();

	$('#playerScore').append(scores['player']);
	$('#aiScore').append(scores['ai']);
	$('#draws').append(scores['draw']);
}

function updateScore(result){
	var scores = loadScores();
	if( result == 'lose' ){
		//user lost
		scores.ai++;
	}else if( result == 'win' ){
		//user won
		scores.player++;
	} else{
		//draw
		scores.draw++;
	}
	//update scores in local storage
	storeScores(scores);
	//reload scoreboard
	displayScoreboard(scores);
}

function aiChoose(){
	var options = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
	return options[Math.floor( Math.random()  * 6 )];
}
