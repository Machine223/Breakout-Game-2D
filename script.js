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
// à l'intérieur ou à l'extérieur du chemin.

var x = canvas.width/2;
var y = canvas.height-40;
var dx = 4;
var dy = -4;


/**
 * une fonction draw() exécutée en continue, avec un ensemble different de 
 * valeurs variables à chaque fois pour changer les positions
 * 
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //moyen d'effacer le contenu du canvas apres l'avoir tracer
    ctx.beginPath(); //commencer un nouveau chemin
    ctx.arc(50, 50, 10, 0, Math.PI*2); // rectangle de dimension 
    ctx.fillStyle = "#0095DD"; // couleur bleu
    ctx.fill(); // renplir l'objet
    ctx.closePath(); // fin du chemin
    x += dx;
    y += dy;
}setInterval(draw, 10);
//fonction draw() sera exécutée dans setInterval toutes les 10 millisecondes

