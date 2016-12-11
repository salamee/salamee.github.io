/*
Shaima Alam
Date: October 7, 2016
A program that takes the action of arrow keys being inputted from user
and moves their box/player around. This box is moved to "eat" the smaller boxes that are generated randomly.
The player can only eat these small boxes, and eating them will make he players box marginally bigger. 
There are bigger boxes than the player and the smaller boxes, that the player cannot eat it, or else it'll be game over.
The user can eat these bigger boxes once they get bigger than the big boxes, from eating enough smaller boxes.
When user eats all the boxes on screen, the user wins. 
The ponts are clculated by subtracting the time take to play, and subtacting that from 150.
150 being the max points, which would be impossible, since it is not possible to finish the game under 0 s.
*/



	//GETTING THINGS STARTED TO GET SET



	//call on canvas and its context, created in the html file
	//create a cavas variable and context variable
	var Canvas = document.getElementById('canvas');
	var context = Canvas.getContext('2d');
	//create a variable for the play btn
	var btnPlay = document.getElementById("toPlay"); 
	//keep the btn enabled
	btnPlay.disabled = false;
	
	//variable of player's square
	var userSquare;
	//*enemy squares
	//small enemies
	var myMos = [];
	//big eneimies
	var myBogs = [];

	//TIMER

	//start time variable
	var timeCounter;
	//function for timer, timing the game
	function time(){
		//add one to time variable
		timeCounter++;
		//call back on this function after 1 second (1000ms) - the loopers name is timeLoop
		timeLoop = setTimeout(time,1000);
		//set the text to the current time counted, for the time id
		document.getElementById('timer').innerHTML = timeCounter;
	}
	//get text text id from html file, set text to timer
	document.getElementById('lblTime').innerHTML = "Timer";



	//when play button is pressed, instructions will be outputted, time will restart and characters created
	function play(){
		//disable play btn
		btnPlay.disabled = true;
		
		//OUTPUT INSTRUCTIONS

		//set font to 18pt georgia
		context.font="18px Georgia";
		//set font color to blue
		context.fillStyle = "blue";
		//fill the convas to text with instruction
		//with centre positions
		context.fillText("Use your arrow keys to move your box, the one on the left corner. Move this box to eat the smaller boxes.",225,50); 
		context.fillText("Remember you can only eat these small boxes, and eating them will make your box bigger.",275,70); 
		context.fillText("But Beware of the boxes that are bigger than you, you cannot eat it, or else it'll be game over.",270,90);
		context.fillText("But you can eat these bigger boxes once you are bigger than the big boxes.",350,110);
		context.fillText("Eat all the boxes as fast as you can to win.",450,130);
		context.fillText("Remember!! The more time you take, the less points you have.",380,150);
		//set font to 22pt georgia bold
		context.font="bold 22px Georgia";
		context.fillText("PRESS AN ARROW KEY TO START",440,200)

		//TIMER

		//start time variable at zero
		timeCounter=0;
		
		
		//CREATING THE OBJECTS

	
		//CREATING THE ENEMY SQUARES

		var bigMosCounter=0;
		//loop 20 times
		while(bigMosCounter<20){
			//push a new square shape's info into the small enemies array
			myMos.push(new Shape ((Math.floor(Math.random()*1258+30)), (Math.floor(Math.random()*273+15)), (Math.floor(Math.random()*2+10)), (Math.floor(Math.random()*2+10))));
			//add one to counter
			bigMosCounter++;
		}

		var jojo = 0;
		var size = 55;
		//loop 5 times
		while(jojo<5){
			//make the new big enemy 
			size = (jojo*5)+ size;
			//push a new squares info into the big enemies arrays
			myBogs.push(new Shape ((Math.floor(Math.random()*1154+40)), (Math.floor(Math.random()*162+30)), size, size));
			jojo++;
		}

		//CREATING THE PLAYERS SQUARE

		// create a rectangle variables holder, (using function shape)
		//with the width, and height of the 15 by 15, and with x and y postions, at 0,0.
		//that is the users square
		userSquare = new Shape (0, 0, 15, 15);
		//use the context.rect method to create a rectangle using the userSquare's Shape function variables
		context.rect(userSquare.x, userSquare.y, userSquare.w, userSquare.h);
		//make the fill colour red
		context.fillStyle = "red";
		//use context.fill and context.stroke, to draw the rectangle
		//stroke draws outline
		context.stroke();
		//fill in colour
		context.fill();
		
	}	


	//REDRAW CANVAS

	//function that redraw the canvas with new positons for boxes 
	function redrawCanvas(){
		
		//redraw canvas anew
		//make the new canvas's width the same as the original canvas's width
		canvas.width=canvas.width;
		//set the fill colour to purple
		context.fillStyle = "purple";
		//create the users rectangle using it's variable attributes
		context.rect(userSquare.x, userSquare.y, userSquare.w, userSquare.h);
		//stroke draws outline
		context.stroke();
		//fill the rectangle with the fill coulour
		context.fill();
	
		//loop for the amount of squares in the small enemies squares array
		var mosLength = myMos.length;
		for (var j=0; j<mosLength; j++) {
			context.rect(myMos[j].x, myMos[j].y, myMos[j].w, myMos[j].h);
			//stroke draws outline
			context.stroke();
			//fill the rectangle with the fill coulour
			context.fill();	
		}
	
		//loop for the amount of squares in the big enemies squares array
		var bogsLength = myBogs.length;
		for (var j=0; j<bogsLength; j++) {
			context.rect(myBogs[j].x, myBogs[j].y, myBogs[j].w, myBogs[j].h);
			//stroke draws outline
			context.stroke();
			//fill the rectangle with the fill coulour
			context.fill();
		}	
	}

	
	//CREATING SQUARES FUNCTION

	//function that takes parameters of x and y position, width and height, and fill colour
	//use this function to create variables, with their information
	function Shape(x, y, w, h) {
    		this.x = x;
    		this.y = y;
    		this.w = w;
  		this.h = h;
	}




	
	//INTERACTING WITH USER



	//when a key is pressed, the keypressed function will be called on
	document.onkeydown = keyPressed;

	//function, that takes care of the moving, no parameters, for it is an event
	function keyPressed(e){
		
		//if timeCounter variable did not stat counting yet
		if(timeCounter===0){
			//call on time function to start
			time();
		}

		/*if the button pessed has the key code of 37 (which is the left arrow key) 
		and the userSquare is not past the canvas left sideline 
		(useSquare's x postion is greater than zero)*/
		if(  ((userSquare.x)>0) && (e.keyCode==37) ){ 
			//than make the user's squares x-position 5 pixels  to the left(subtract 5 from orignal x position)
			userSquare.x-=5;
			//call on collision fuctions, to check if userSquare now collides with other squares, and acts accordingly
			collision();
			collisionBogs();
			//check if user won
			win();
		}
		/*if the button pessed has the key code of 40 (which is the down arrow key) 
		and the userSquare's bottom line position
		(userSquare.y+userSquare.h, which is the top of the box's position, 
		and which is added to the height of the box, to get the bottom of box's y position), 
		is not past the canvas's bottom sideline (250 down from the top)
		(useSquare's y postion is less than 250)
		down is positive, as you go down higher number*/
		if( ((userSquare.y+userSquare.h)<300) && (e.keyCode==40) ){
			//then add 5 pixels to the user squares y positon, as in move its position down
			userSquare.y+=5;
			//call on collision fuctions, to check if userSquare now collides with other squares, and acts accordingly
			collision();
			collisionBogs();
			//check if user won
			win();
		}

		/*if the button pessed has the key code of 38 (which is the up arrow key) 
		and the userSquare's top line position, the box's y pos,
		is not past the canvas's top sideline (0)
		(useSquare's y postion is bigger than 0)
		up is negative, as you go up lower number*/
		if( (userSquare.y)>0 && (e.keyCode==38) ){
			//then subtract 5 pixels from the user squares y positon, as in move its position up
			userSquare.y-=5;
			//call on collision fuctions, to check if userSquare now collides with other squares, and acts accordingly
			collision();
			collisionBogs();
			//check if user won
			win();
		}

		/*if the button pessed has the key code of 39 (which is the right arrow key) 
		and the userSquare's right side length is not past the canvas right sideline 
		(useSquare's x postion plus it's width is less than 1200)*/
		if(((userSquare.x + userSquare.w)<1300) && (e.keyCode==39) ){
			//than make the user's squares x-position 5 pixels  to the right(add 5 from orignal x position)
			userSquare.x+=5;
			//call on collision fuctions, to check if userSquare now collides with other squares, and acts accordingly
			collision();
			collisionBogs();
			//check if user won
			win();
		}
		//redraw canvas with new adjustments
		redrawCanvas();	
		
	}




	//PLAYER WINS



	function win(){
	
		var mucur = false;
		var bucur = false;

		var arrayLiength = myMos.length;

		for (var i = 0; i < arrayLiength; i++) {
			if( myMos[i].h===0){
				mucur = true;
			}
			else{
				mucur=false;
				break;
			}	
		}	
		var bogsLength = myBogs.length;
		for (var i = 0; i < bogsLength; i++) {

			if (myBogs[i].h===0){
				bucur=true;
			}
			else{
				bucur=false;
				break;
			}
		}

		if((bucur===true) && (mucur===true)){
			alert("You Won!!\nYour Points is "+(150-timeCounter)+"\nPress Play!! Button to Play Again");
			clearTimeout(timeLoop);
			myMos = [];
			myBogs = [];
			userSquare.w=0;
			userSquare.h=0;
			userSquare.x=-500;
			userSquare.y=-500;
			
		
			redrawCanvas();	
			//make the btn to play enabled
			btnPlay.disabled = false;
			
		}
	}




	//FUNCTIONS FOR WHEN SQUARES HIT EACHOTHER



	//PLAYER HITS SMALL SQUARES

	// function to check if players square touches the smaller squares, 
	//and if so, will get bigger, and make smaller square that is touched disappear from screen
	function collision(){
		var arrayLength = myMos.length;
		for (var i = 0; i < arrayLength; i++) {

			if(isCollide( myMos[i], userSquare)){
				userSquare.w+=5;
				userSquare.h+=5;
				myMos[i].x=-50;
				myMos[i].y=-50;
				myMos[i].w=0;
				myMos[i].h=0;
				
			}
		}	
	}



	//PLAYER HITS BIG SQUARE

	// function to check if players square touches the bigger squares, 
	//and if so, 
	//checks if player is bigger or smaller than the box touched
	//if player is bigger than other box then player will get bigger, and make smaller square that is touched disappear from screen
	function collisionBogs(){
		var bogsLength = myBogs.length;

		for (var i = 0; i < bogsLength; i++) {

			if (isCollide( myBogs[i], userSquare)){
				if((userSquare.w > myBogs[i].w) && (userSquare.h > myBogs[i].h)){
					var growth = (myBogs[i].w)/5
					userSquare.w+=growth;
					userSquare.h+=growth;
					myBogs[i].x=-50;
					myBogs[i].y=-50;
					myBogs[i].w=0;
					myBogs[i].h=0;
				}
				else{
		
               				clearTimeout(timeLoop);
					alert("Game Over!\nPress Play!! Button to Play Again");
					userSquare.w=0;
					userSquare.h=0;
					userSquare.x=-500;
					userSquare.y=-500;
					myMos = [];
					myBogs = [];
		
					redrawCanvas();	
					//make the btn to play enabled
					btnPlay.disabled = false;
				}
			}	
		}		
	}

	//CHECK IF ONE THING TOUCHES THE OTHER

	function isCollide(a, b) {
     		if(  ( (b.y + b.h) <= (a.y) )   ||   ( b.y >= (a.y + a.h) )  ||	( (b.x + b.w) <= a.x ) ||  ( b.x >= (a.x + a.w) )   ){
			return false;
		}
		else{

			return true;
		}
	}

	
