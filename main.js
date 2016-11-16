var imgObj = null;



//functon for intial position of image left of screen
function init(){
	imgObj = document.getElementById('myImage');
	imgObj.style.position = 'relative';
	imgObj.style.left = '-10px';
	
	
}



//function for moving right
function moveRight(){
	console.time("right");
	imgObj.style.left = parseInt(imgObj.style.left)+2+'px';
	animate = setTimeout(moveRight,20); // call moveRight in 20msec
	console.timeEnd("right")
}



function stop(){
            clearTimeout(animate);
            imgObj.style.left = '0px'; 
		alert(Math.floor(Math.random()*100) + "\nPlay The Game!!\t");
		//rand = setTimeout(stop,100); // call stop in 20msec
		
            }

window.onload = init;


