//Ao carregar a página estas linhas são executadas. 
ghr = 0;
contador = '';
let cont = 0;
let impact = setInterval("colisao()", 1);
let timer = '';

document.querySelector("#acima").addEventListener("click", () => { move('acima') });
document.querySelector("#esquerda").addEventListener("click", () => { move('esquerda') });
document.querySelector("#direita").addEventListener("click", () => { move('direita') });
document.querySelector("#baixo").addEventListener("click", () => { move('baixo') });
document.querySelector("#acima").addEventListener("click", () => { move('acima') });    


//20 tiles
tileX = parseInt(getComputedStyle(fundo).width) / 20;
tileY = parseInt(getComputedStyle(fundo).height) / 20;
window.onload = getTile();
headX = tileX * 10;
headY = tileY * 10;
refreshRate = 20;
points = 0;

if(window.innerWidth > 500){
    speed = 7;
    increaseRate = 2;
    borderHelper = 1.2;
}
else {
    speed = 3;
    increaseRate = 1.5;
    borderHelper = 1.3;
}

div1.style.left = headX;
div1.style.top = headY;



function getTile(){
    div2Width = parseInt(getComputedStyle(div2).width);
    div2Height = parseInt(getComputedStyle(div2).height);
    let luckX = -1;
    let luckY = -1;
    while(luckX < 1 || luckX > 20 || luckY < 1 || luckY > 20){
        luckX = parseInt(10 * (Math.random() + Math.random()) + 3 * Math.random());
        luckY = parseInt(10 * (Math.random() + Math.random()) + 3 * Math.random());
    }

    div2Left = parseInt(getComputedStyle(div2).left);

    if(luckX == 20)
        div2.style.left = tileX * luckX - div2Width;
    else
        div2.style.left = tileX * luckX;
    if(luckY > 18)
        div2.style.top = tileY * luckY - div2Height;
    else
    div2.style.top = tileY * luckY;

}

// Mover cursor 1  - através dos botões
function move(Direcao) {
    if (contador != '') {
        para();
    }
    if (Direcao == "direita") {
        timer = setInterval("direita()", refreshRate);
        contador = 'direita';
    }

    if (Direcao == "esquerda") {
        timer = setInterval("esquerda()", refreshRate);
        contador = 'esquerda';
    }

    if (Direcao == "acima") {
        timer = setInterval("acima()", refreshRate);
        contador = 'acima';;
    }

    if (Direcao == "baixo") {
        timer = setInterval("baixo()", refreshRate);
        contador = 'baixo';;
    }
}


function direita() {

    let div1Left = parseInt(getComputedStyle(div1).left);
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let div1Width = parseInt(getComputedStyle(div1).width);

    div1.style.left = div1Left + speed;
    if (div1Left >= fundoWidth - div1Width * borderHelper) {
        clearInterval(timer);
        timer = setInterval("esquerda()", refreshRate);
    }
}

function esquerda() {

    let div1Left = parseInt(getComputedStyle(div1).left);

    div1.style.left = div1Left - speed;
    if (div1Left <= 0) {
        clearInterval(timer);
        timer = setInterval("direita()", refreshRate);
    }
}

function baixo() {

    let div1Top = parseInt(getComputedStyle(div1).top);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    let div1Height = parseInt(getComputedStyle(div1).height);

    div1.style.top = div1Top + speed;
    if (div1Top >= fundoHeight - div1Height * borderHelper) {
        clearInterval(timer);
        timer = setInterval("acima()", refreshRate);
    }
}
function acima() {

    let div1Top = parseInt(getComputedStyle(div1).top);

    div1.style.top = div1Top - speed;
    if (div1Top <= 0) {
        clearInterval(timer);
        timer = setInterval("baixo()", refreshRate);
    }
}

// Parar div1

function para() {
    clearInterval(timer);
}

function cor() {
    if (cont == 0) {
        div1.style.backgroundColor = "blue";
        cont++;
    } else {
        if (cont == 1) {
            div1.style.backgroundColor = "orange";
            cont++;
        } else {
            if (cont == 2) {
                div1.style.backgroundColor = "yellow";
                cont = 0;
            }
        }
    }

}

function colisao() {
    let div1Left = parseInt(getComputedStyle(div1).left);
    let div1Top = parseInt(getComputedStyle(div1).top);
    let div1Height = parseInt(getComputedStyle(div1).height);
    let div1Width = parseInt(getComputedStyle(div1).width);

    let div2Left = parseInt(getComputedStyle(div2).left);
    let div2Top = parseInt(getComputedStyle(div2).top);
    let div2Height = parseInt(getComputedStyle(div2).height);
    let div2Width = parseInt(getComputedStyle(div2).width);

    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    let fundoWidth = parseInt(getComputedStyle(fundo).width);



    if (((div1Left >= div2Left) && (div1Left <= div2Left + div2Width)) &&
        ((div1Top >= div2Top) && (div1Top <= div2Top + div2Height))) {
        getTile();
        drawPoints();
    }
    if (((div2Left >= div1Left) && (div2Left <= div1Left + div1Width)) &&
        ((div2Top >= div1Top) && (div2Top <= div1Top + div1Height))) {
        getTile();
        drawPoints();
    }
}

//Speed increasing here
function drawPoints(){
    points++;
    let sel = document.querySelector('#points');
    sel.innerHTML = `Points: ${points}`;

    if(points % 7 == 0)
        speed += increaseRate;
    if(points % 5 == 0)
        shootSpeed += .5;

}


//-------------------------------------------- Projectiles


projectiles = [];
n = 0;
//control = setInterval("shootin()", 2000);
shootControl = [];

random = Math.random;

setTimeout('shootin()', 3000);

function shootin(){

    game = document.querySelector('.game');
    X = Math.round(random()*10);
    Y = Math.round(random()*10);
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);

    if (X < 5)
        X = 'left';
    else
        X = 'right';
    if (Y < 5)
        Y = 'bottom';
    else
        Y = 'top';

    projectiles.push(`#shoot${n}`);
    shoot = document.createElement('div');
    shoot.setAttribute('class', 'shoot');
    shoot.setAttribute('id', `shoot${n}`);

    document.querySelector('#fundo').appendChild(shoot);

    if(X == 'left'){
        document.querySelector(`#shoot${n}`).style.left = -5;
    }
    else
        document.querySelector(`#shoot${n}`).style.left = fundoWidth - 10;
    
    if(Y == 'top')
        document.querySelector(`#shoot${n}`).style.top = -5;
    else
        document.querySelector(`#shoot${n}`).style.top = fundoHeight -10;
    
    //prepare(projectiles[n]);

    id = document.querySelector(projectiles[n]);
    borderX = parseInt(getComputedStyle(fundo).width);
    borderY = parseInt(getComputedStyle(fundo).height);
    X = parseInt(getComputedStyle(div1).left) - parseInt(getComputedStyle(id).left);
    Y = parseInt(getComputedStyle(div1).top) - parseInt(getComputedStyle(id).top);

    shootControl[n] = setInterval('fire()', 17);
    
}

function fire(){
    shootSpeed = 5;

    Xc = parseInt(getComputedStyle(id).left);        
    id.style.left = Xc + (shootSpeed * X / getHypo(X, Y));
    Yc = parseInt(getComputedStyle(id).top);
    id.style.top = Yc + (shootSpeed * Y / getHypo(X, Y));

    if(parseInt(getComputedStyle(id).left) >= borderX || parseInt(getComputedStyle(id).left) < -20
    || parseInt(getComputedStyle(id).top) >= borderY || parseInt(getComputedStyle(id).top) < -20){
        clearInterval(shootControl[n])
        n++;
        fundo.removeChild(id);
        shootin();
    }

    div1Left = parseInt(getComputedStyle(div1).left);
    div1Top = parseInt(getComputedStyle(div1).top);
    div1Height = parseInt(getComputedStyle(div1).height);
    div1Width = parseInt(getComputedStyle(div1).width);

    shootLeft = parseInt(getComputedStyle(id).left);
    shootTop = parseInt(getComputedStyle(id).top);

    if((shootLeft >= div1Left && shootLeft <= div1Left + div1Width) &&
    (shootTop >= div1Top && shootTop <= div1Top + div1Height)){
        endGame();
        // setInterval('endGame()', 1000);
    }
}

function getHypo(x, y){
    return parseInt(Math.sqrt((x**2 + y**2), 2));
}


class projectile{
    id;
    function;
    X;
    Y;
    constructor (id, func, X, Y){
        this.id = `#shoot${id}`;
        this.function = func;
        this.X = X;
        this.Y = Y;
    }
}

function endGame () {
    clearInterval(impact);
    clearInterval(shootControl[n]);
    clearInterval(timer);
    popUp = document.createElement('div');
    popUp.setAttribute('id', 'endGame');
    popUp.innerHTML = `> Fim de jogo! <<br><hr><br>Tu conseguiu <p style='color: orange; display: inline-block'>${points} ponto(s)</p>
    <br><br><hr><br> <button type='button' id='again' onclick= 'window.location.reload()'>Jogar denovo?</button>`;
    document.body.appendChild(popUp);
}


alert('----Bem vind@! \n\nNeste hoje o teu objetivo é capturar o quadrado vermelho tanto quanto possível. \n\n A quantidade de vezes que tu consigui será convertida em pontos.\n\nMas cuidado! Ao longo da partida, projéteis serão lançados contra ti! Desvie deles.  \n\nAmbas velocidades, dos projéteis e do teu quadrado aumentam com o tempo, tenha isso em mente. \n\nE é isso, bom jogo!');
