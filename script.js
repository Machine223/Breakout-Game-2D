
/* 
Author : Abderrahim Ammour
Date : 14 juin 2019
Object : Game Breakout 2D made by Mozzila developer Guide
I'm using pure JavaScript to get a solid knowledge of web 
game development and JavaScript language.

Source : https://developer.mozilla.org

Steps TODO list :
1. Create the Canvas and draw on it
2. Move the ball
3. Bounce off the walls
4. Paddle and keyboard controls
5. Game over
6. Build the brick field
7. Collision detection
8. Track the score and win
9. Mouse controls
10. Finishing up

*/
/* Ici on donne la référence à Javascript de canvas*/
var canvas = document.getElementById('myCanvas');
/* la variable ctx est créer pour stocker le contexte de rendu 2D*/
var ctx = canvas.getContext('2d');
/*getContext Est un DOMString contenant l'identifcateur de contexte définissant le contexte de dessin associé au canevas. 
Les valeurs possibles sont :
    1. 2d", conduisant à la création d'un objet CanvasRenderingContext2D représentant 
    un contexte de représentation bi-dimensionnel.
    2. "webgl" (ou "experimental-webgl") pour créer un objet WebGLRenderingContext représentant un contexte de représentation tri-dimensionnel. Ce contexte est seulement disponible sur les 
    navigateurs implémentant la version 1 de WebGL (OpenGL ES 2.0).
    3. "webgl2" pour créer un objet WebGL2RenderingContext représentant un contexte 
    de représentation tri-dimensionnel. Ce contexte est seulement disponible sur les navigateurs implémentant la version 2 de WebGL (OpenGL ES 3.0). .
    4. "bitmaprenderer" pour créer un ImageBitmapRenderingContext ne fournissant que la
    fonctionnalité de remplacement du contenu du canevas par une ImageBitmap donnée. */

//L'algorithme utilisé pour déterminer si un point est 
//à l'intérieur ou à l'extérieur du chemin.

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var paddleHeight = 10; //hauteur boite
var paddleWidth = 75; // largeur boite
var paddleX = (canvas.width-paddleWidth) / 2;//starting point 

var brickRowCount = 3; //ligne
var brickColumnCount = 5; //colonne
var brickWidth = 75; // dimension
var brickHeight = 20;
var brickPadding = 10; // distance entre brique
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var gameOverNotify = document.querySelector('.game-over-notify');
var interval;

var score = 0;
var lives = 3;
var factor = 1.15;
/***************************************************************
 * Creer les Briques
 ***************************************************************/
var bricks = []; // Nos brique sont des objets dans un tableau 2D
for(var colonne = 0; colonne<brickColumnCount; colonne++) {
    bricks[colonne] = [];
    for(var ligne = 0; ligne<brickRowCount; ligne++) {
        bricks[colonne][ligne] = { x: 0, y: 0, status: 1 }; // propriete localisation
    }
}


/***************************************************************
 * une fonction drawScore() pour dessiner le score
***************************************************************/
function drawScore(){
    ctx.font = "16px Arial"; //set the size and font type
    ctx.fillStyle = "#0095DD"; // set the color of the font
    ctx.fillText("Score: " + score ,8,20);//to set the actual text placed on the canvas
    //last two parameters are the coordinates where the text will be placed on the canvas.
}

/***************************************************************
 * une fonction drawLives() pour dessiner le nb de vie
***************************************************************/
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

/***************************************************************
 * une fonction drawBricks() pour dessiner les Briques
***************************************************************/
function drawBricks(){
    for(var colonne = 0; colonne<brickColumnCount; colonne++) {
        for(var ligne = 0; ligne<brickRowCount; ligne++) {
            if(bricks[colonne][ligne].status == 1){
            var brickX = (colonne*(brickWidth+brickPadding)+brickOffsetLeft);
            var brickY = (ligne*(brickHeight+brickPadding)+brickOffsetTop);
            bricks[colonne][ligne].x = brickX;
            bricks[colonne][ligne].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

/***************************************************************
 * une fonction drawPaddle() pour dessiner le Paddle
 ***************************************************************/
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

/***************************************************************
* une fonction drawBall() pour dessiner la balle
***************************************************************/
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

/* **************************************************************
 * une fonction draw() exécutée en continue, avec un ensemble different de 
 * valeurs variables à chaque fois pour changer les positions avec calcul
 ***************************************************************/
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // pour enlever le dernier tracer
    drawBricks(); //appelle la fonction pour dessiner les briques
    drawBall(); // appelle la fonction pour dessiner la balle
    drawPaddle(); //appelle la fonction pour dessiner le Paddle
    collisionDetection(); // activer la collision
    //Simple wall collision detection(minius ball radius)
    drawScore();
    drawLives();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) { // rebondir pour les cotes
        dx = -dx;
    }
    if(y + dy < ballRadius) { // Rebondir Pour le haut
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) { // Rebondir Pour le bas
        if(x > paddleX && x < paddleX + paddleWidth) {
            if(x < paddleX + paddleWidth/3){ 
                // changement de direction pour le paddle
                dy = -dy;
                if (dx > 0){
                   dx = -dx;
                }
            }
            else if(x > paddleX + paddleWidth/3 && x < paddleX + 2*paddleWidth/3){
                dy = -dy*factor;
            }
            else{
                dy = -dy;
                if (dx < 0){
                    dx = -dx;
                }
            }
        }
        else {
            lives--;
            if(!lives){
                gameOverNotify.style.display = 'flex';
                clearInterval(interval);
            }
            else {
                x = canvas.width/2; // initial place
                y = canvas.height-30;
                dx = 2; //revenir au vitesse de debut
                dy = -2;
                ballRadius = 10;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
      }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw); // ce qui fait la boucle
    console.log("dx = "+dx);
    console.log("dy = "+dy);
}
draw();

//SetInterval :Appelle une fonction de manière répétée et ainsi
//fonction draw() sera exécutée dans setInterval toutes les 10 millisecondes
// requestAnimationFrame(draw) est une alternative pour donner au browser d'ajuster le frame

/* **************************************************************
* une fonction keyHandler() pour gerer les touche au clavier et controle du Paddle 
***************************************************************/
// Controle du Paddle 
//  1. Deux variables pour stocker l'information(gauche/droite)
//  2. Deux "event listeners" pour ecouter les commandes clavier(keydown et keyup)
//  3. Deux fonctions qui s'occuperont de keydown et keyup
//  4. La possibilité de bouger le paddle à gauche et à droite.

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove",mouseMoveHandler,false);


function keyDownHandler(e){
    if(e.keyCode == 39 || e.keyCode == 68){ //keyCode pour le clavier touche droite
        rightPressed = true;
        console.log("droite"); 
    }
    else if(e.keyCode == 37 || e.keyCode == 65){ //keyCode pour le clavier touche gauche
        leftPressed = true;
        console.log("gauche");
    }
    if(e.keyCode == 32 && score > 10){  //keyCode for space
        spacePressed = true;
        ballRadius = 20;
        console.log("COMBO!"); 
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39 || e.keyCode == 68){ //keyCode pour le clavier touche droite
        rightPressed = false;
    }
    else if(e.keyCode == 37 || e.keyCode == 65){ //keyCode pour le clavier touche gauche
        leftPressed = false;
    }
    if(e.keyCode == 32  && score > 10){
        spacePressed = false;
        ballRadius = 10;
        console.log("COMBO!"); 
    }
}
// fonction pour ajouter le mouvement de la sourie pour deplacer la paddle
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

/***************************************************************
 * une fonction collisionDetection() de détection de collision
 ***************************************************************/
function collisionDetection(){
    for(var colonne=0; colonne<brickColumnCount ; colonne++){
        for(var ligne=0; ligne < brickRowCount; ligne++){
            var b = bricks[colonne][ligne]; //on catch le table 
            // Calcul to see if the ball is inside the rectangle
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy; //changement de direction en y
                    b.status = 0;
                    score++; // si le score est égal au nb de bloc de départ, You Win!
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}
