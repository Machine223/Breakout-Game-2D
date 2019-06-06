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
 * valeurs variables à chaque fois pour changer les positions
 ***************************************************************/
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(); // appelle la fonction poiur dessiner la balle
    //Simple wall collision detection(minius ball radius)
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    x += dx;
    y += dy;
}
setInterval(draw, 10);
//SetInterval :Appelle une fonction de manière répétée et ainsi
//fonction draw() sera exécutée dans setInterval toutes les 10 millisecondes

// Controle du Paddle 
//  1. Deux variables pour stocker l'information(gauche/droite)
//  2. Deux "event listeners" pour ecouter les commandes clavier(keydown et keyup)
//  3. Deux fonctions qui s'occuperont de keydown et keyup
//  4. La possibilité de bouger le paddle à gauche et à droite.

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.keyCode == 39){ //keyCode pour le clavier touche droite
        rightPressed = true;
        //console.log("droite"); 
    }
    else if(e.keyCode == 37){ //keyCode pour le clavier touche gauche
        leftPressed = true;
        //console.log("gauche");
    }
}
function keyUpHandler(e){
    if(e.keyCode == 39){ //keyCode pour le clavier touche droite
        rightPressed = false;
    }
    else if(e.keyCode == 37){ //keyCode pour le clavier touche gauche
        leftPressed = false;
    }
}