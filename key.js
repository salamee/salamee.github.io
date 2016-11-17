/*
Shaima Alam
Date: October 7, 2016
A program that takes the action of arrow keys being inputted from user
and moves their box/player around. This box is moved to "eat" the smaller boxes that are generated randomly.
The player can only eat these small boxes, and eating them will make he players box marginally bigger. 
There are bigger boxes than the player and the smaller boxes, that the player cannot eat it, or else it'll be game over.
Initially these bigger boxes are clear with black outline, just before the user plays, to make them identifiable.
The user can eat these bigger boxes once they get bigger than the big boxes, from eating enough smaller boxes.
When user eats all the boxes on screen, the user wins. 
The ponts are clculated by subtracting the time take to play, and subtacting that from 150.
150 being the max points, which would be impossible, since it is not possible to finish the game under 0 s.
*/

	//call on canvas and its context, created in the html file
	//create a cavas variable and context variable
	var Canvas = document.getElementById('canvas');
	var context = Canvas.getContext('2d');



	//function that takes parameters of x and y position, width and height, and fill colour
	//use this function to create variables, with their information
	function Shape(x, y, w, h, fill) {
    		this.x = x;
    		this.y = y;
    		this.w = w;
  		this.h = h;
	 	this.fill = fill;
	}
	
	//x and y positon of player's square, start at zero and zero position
	var xPos = 0;
	var yPos = 0;
	//the width and height of the players square
	var width = 15;
	var height = 15;
	//variable of player's square
	var userSquare;
	//start time variable at zero
	var timeo=0;

	// create a rectangle variables holder, (using function shape)
	//with the width, and height of the variables of width and height, and with x and y postions, at xPos and yPos variables, and fill colour.
	//that is the users square
	userSquare = new Shape (xPos, yPos, width, height, "#FF0000");
	//use the context.rect method to create a rectangle using the userSquare's Shape function variables
	context.rect(userSquare.x, userSquare.y, userSquare.w, userSquare.h);
	//make the fill colour the fill colur of userSquare's
	context.fillStyle = userSquare.fill;
	//use context.fill and context.stroke, to draw the rectangle
	//stroke draws outline
	context.stroke();
	//fill fills in colour
	context.fill();
	
	context.font="20px Georgia";
context.fillText("Hello World!",10,50);

	//function, that takes care of the moving, no parameters, for it is an event
	function move(e){
		document.getElementById('demo').innerHTML = (5 + 6);
		
		if(timeo==0){
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
		}
		/*if the button pessed has the key code of 40 (which is the down arrow key) 
		and the userSquare's bottom line position
		(userSquare.y+userSquare.h, which is the top of the box's position, 
		and which is added to the height of the box, to get the bottom of box's y position), 
		is not past the canvas's bottom sideline (250 down from the top)
		(useSquare's y postion is less than 250)
		down is positive, as you go down higher number*/
		if( ((userSquare.y+userSquare.h)<250) && (e.keyCode==40) ){
			//then add 5 pixels to the user squares y positon, as in move its position down
			userSquare.y+=5;
			//call on collision fuctions, to check if userSquare now collides with other squares, and acts accordingly
			collision();
			collisionBogs();
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
		}

		/*if the button pessed has the key code of 39 (which is the right arrow key) 
		and the userSquare's right side length is not past the canvas right sideline 
		(useSquare's x postion plus it's width is less than 1200)*/
		if(((userSquare.x + userSquare.w)<1200) && (e.keyCode==39) ){
			//than make the user's squares x-position 5 pixels  to the right(add 5 from orignal x position)
			userSquare.x+=5;
			//call on collision fuctions, to check if userSquare now collides with other squares, and acts accordingly
			collision();
			collisionBogs();
		}
	
		//redraw canvas anew
		//make the new canvas's width the same as the original canvas's width
		canvas.width=canvas.width;
		context.rect(userSquare.x, userSquare.y, userSquare.w, userSquare.h);
		context.fillStyle = userSquare.fill;
		context.fill();
		context.stroke();
		

		for (var j=0; j<20; j++) {
       
			context.rect(myMos[j].x, myMos[j].y, myMos[j].w, myMos[j].h);
			context.fillStyle = userSquare.fill;
			context.fill();
			context.stroke();
		}
	
		for (var j=0; j<5; j++) {
       
			context.rect(myBogs[j].x, myBogs[j].y, myBogs[j].w, myBogs[j].h);
			context.fillStyle = myBogs.fill;
			context.fill();
			context.stroke();
		}		
	

	}


document.onkeydown = move;


function win(){
	
var mucur = false;
var bucur = false;

var arrayLength = myMos.length;

	for (var i = 0; i < arrayLength; i++) {
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
		alert("You Won!!\nYour Points is "+(150-timeo));
		clearTimeout(timer);
		myMos = [];
		myBogs = [];

		//redraw canvas
		canvas.width=canvas.width;
	
		context.rect(userSquare.x, userSquare.y, userSquare.w, userSquare.h);
		context.fillStyle = useSquare.fill;
		context.fill();
		context.stroke();

		for (var j=0; j<20; j++) {
       
			context.rect(myMos[j].x, myMos[j].y, myMos[j].w, myMos[j].h);
        		context.fillStyle = useSquare.fill;
			context.fill();
			context.stroke();
		}
		for (var j=0; j<5; j++) {
			context.rect(myBogs[j].x, myBogs[j].y, myBogs[j].w, myBogs[j].h);
        		context.fillStyle = useSquare.fill;
			context.fill();
			context.stroke();
		}	
		
		
	}
}

// function to check if players square touches the smaller squares, 
//and if so, will get bigger, and make smaller square that is touched disappear from screen
function collision(e){
var arrayLength = myMos.length;

for (var i = 0; i < arrayLength; i++) {


	if(isCollide( myMos[i], userSquare)){
		userSquare.w+=5;
		userSquare.h+=5;
		myMos[i].x=-50;
		myMos[i].y=-50;
		myMos[i].w=0;
		myMos[i].h=0;
		win();
}

	
}	

	//if all things are -50 x and -50 y -  	u won, points is 100-time
}

// function to check if players square touches the bigger squares, 
//and if so, 
//checks if player is bigger or smaller than the box touched
//if player is bigger than other box then player will get bigger, and make smaller square that is touched disappear from screen
function collisionBogs(e){
var bogsLength = myBogs.length;

for (var i = 0; i < bogsLength; i++) {

	if (isCollide( myBogs[i], userSquare)){
	if((userSquare.w >= myBogs[i].w) && (userSquare.h >= myBogs[i].h)){
		userSquare.w+=10;
		userSquare.h+=10;
		myBogs[i].x=-50;
		myBogs[i].y=-50;
		myBogs[i].w=0;
		myBogs[i].h=0;
		win();
}
	else{
		
               clearTimeout(timer);
		alert("Game Over!\nRefresh to Play Again");
		userSquare.w=0;
		userSquare.h=0;
		userSquare.x=-500;
		userSquare.y=-500;
		myMos = [];
		myBogs = [];
		
		//redraw canvas
	canvas.width=canvas.width;
	
	context.rect(userSquare.x, userSquare.y, userSquare.w, userSquare.h);
	context.fillStyle = userSquare.fill;
	context.fill();
	context.stroke();

	for (var j=0; j<20; j++) {
       
	context.rect(myMos[j].x, myMos[j].y, myMos[j].w, myMos[j].h);
    context.fillStyle = userSquare.fill;
	context.fill();
	context.stroke();
        
}
	for (var j=0; j<5; j++) {
       
	context.rect(myBogs[j].x, myBogs[j].y, myBogs[j].w, myBogs[j].h);
    context.fillStyle = userSquare.fill;
	context.fill();
	context.stroke();
        
}	
		
}

}	
}		
}


var myMos = [];
var myBogs = [];
var bob=0;
while(bob<20){

	myMos.push(new Shape ((Math.floor(Math.random()*1138+50)), (Math.floor(Math.random()*188+50)), (Math.floor(Math.random()*2+10)), (Math.floor(Math.random()*2+10)), ""));
	
bob++;
}

/*
for (var j=0; j<20; j++) {
       
	context.rect(myMos[j].x, myMos[j].y, myMos[j].w, myMos[j].h);
    context.fillStyle = "#FF0000";
	context.fill();
	context.stroke();	
}*/

var jojo = 0;
var size = 55;

while(jojo<5){
size = (jojo*5)+ size;
	myBogs.push(new Shape ((Math.floor(Math.random()*1044+50)), (Math.floor(Math.random()*92+50)), size, size, ""));
	
jojo++;
}

/*
for (var j=0; j<5; j++) {
       
	context.rect(myBogs[j].x, myBogs[j].y, myBogs[j].w, myBogs[j].h);
	context.stroke();	
}*/

function isCollide(a, b) {
     if(
        ((b.y + b.h) <= (a.y)) ||
        (b.y >= (a.y + a.h)) ||
       ((b.x + b.w) <= a.x) ||
       (b.x >= (a.x + a.w))
    ){
return false;}

else{

return true;}
}

function time(){
timeo++;
timer = setTimeout(time,1000);
document.getElementById('test').innerHTML = timeo;

}





