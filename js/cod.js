//Ao carregar a página estas linhas são executadas. 
popUp = document.querySelector('#popUp');
popUp.innerHTML = 'Bem vind@! <hr><br><br>>ㅤNeste hoje o teu objetivo é capturar o quadrado vermelho tanto quanto possível.<br><br> A quantidade de vezes que tu consiguir será convertida em pontos, que serão armazenados no pódio, clique nos "points" e veja! <br><br>Mas cuidado! Ao longo da partida, projéteis serão lançados contra ti! Desvie deles.<br><br>Ambas velocidades, dos projéteis e do teu quadrado aumentam com o tempo, tenha isso em mente.<br><br>E é isso, bom jogo! <br><br><button type="button" onclick= "start()">Começar</button>';

soundEffect = new Audio('../sounds/shoot.mp3')
soundEffect.volume = .2;

score = new Audio('../sounds/score.mp3');
score.volume = .02;

music = new Audio('../sounds/music.mp3');
music.volume = .01;
musicCounter = 0;

function sound(counter){
    musicIcon = document.querySelector('#musicIcon');
    if(counter == 0){
        music.volume = 0;
        musicIcon.setAttribute('src', '../imgs/mute.png')
        musicCounter = 1;
        return
    }
    if(counter == 1){
        musicIcon.setAttribute('src', '../imgs/sound.png')
        musicCounter = 0;
        music.volume = .01;
        return
    }
}

mLock = 1;

function start(){
    music.play();
    music.loop = true;
    div1.style.left = headX;
    div1.style.top = headY;
    popUp.style.display = 'none';
    popUp.innerHTML = '';
    shootin();
    ghr = 0;
    contador = '';
    cont = 0;
    timer = '';
    impact = setInterval("colisao()", 1);
    mLock = 0;
    getTile();

    if(window.innerWidth > 500){
        speed = 7;
        shootSpeed = 5;
        increaseRate = 2;
        borderHelper = 1.2;
    }
    else {
        speed = 2.5;
        shootSpeed = 3;
        increaseRate = 1.5;
        borderHelper = 1.3;
    }

}

document.querySelector("#acima").addEventListener("click", () => { move('acima') });
document.querySelector("#esquerda").addEventListener("click", () => { move('esquerda') });
document.querySelector("#direita").addEventListener("click", () => { move('direita') });
document.querySelector("#baixo").addEventListener("click", () => { move('baixo') });  


//20 tiles
tileX = parseInt(getComputedStyle(fundo).width) / 20;
tileY = parseInt(getComputedStyle(fundo).height) / 20;
// window.onload = getTile();
headX = tileX * 10;
headY = tileY * 10;
refreshRate = 20;
points = 0;


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
    if (Direcao == "direita" && mLock == 0) {
        timer = setInterval("direita()", refreshRate);
        contador = 'direita';
    }

    if (Direcao == "esquerda" && mLock == 0) {
        timer = setInterval("esquerda()", refreshRate);
        contador = 'esquerda';
    }

    if (Direcao == "acima" && mLock == 0) {
        timer = setInterval("acima()", refreshRate);
        contador = 'acima';;
    }

    if (Direcao == "baixo" && mLock == 0) {
        timer = setInterval("baixo()", refreshRate);
        contador = 'baixo';;
    }
}


function direita() {

    let div1Left = parseInt(getComputedStyle(div1).left);
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let div1Width = parseInt(getComputedStyle(div1).width);
    if (mLock == 0)
        div1.style.left = div1Left + speed;
    if (div1Left >= fundoWidth - div1Width * borderHelper) {
        clearInterval(timer);
        timer = setInterval("esquerda()", refreshRate);
    }
}

function esquerda() {

    let div1Left = parseInt(getComputedStyle(div1).left);

    if (mLock == 0)
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

    if (mLock == 0)
        div1.style.top = div1Top + speed;
    if (div1Top >= fundoHeight - div1Height * borderHelper) {
        clearInterval(timer);
        timer = setInterval("acima()", refreshRate);
    }
}
function acima() {

    let div1Top = parseInt(getComputedStyle(div1).top);

    if (mLock == 0)
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
        score.play();
        getTile();
        drawPoints();
    }
    if (((div2Left >= div1Left) && (div2Left <= div1Left + div1Width)) &&
        ((div2Top >= div1Top) && (div2Top <= div1Top + div1Height))) {
        score.play();
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
shootControl = [];

function shootin(){
    
    random = Math.random;

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
    

    soundEffect.play();

}

function fire(){

    Xc = parseInt(getComputedStyle(id).left);        
    id.style.left = Xc + (shootSpeed * X / getHypo(X, Y));
    Yc = parseInt(getComputedStyle(id).top);
    id.style.top = Yc + (shootSpeed * Y / getHypo(X, Y));

    if(parseInt(getComputedStyle(id).left) >= borderX || parseInt(getComputedStyle(id).left) < -20
    || parseInt(getComputedStyle(id).top) >= borderY || parseInt(getComputedStyle(id).top) < -20){
        clearInterval(shootControl[n])
        
        fundo.removeChild(id);
        n++;
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
        mLock = 1;
        fundo.removeChild(id);
        
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
    podium(points, '');
    para();
    projectiles = [];
    clearInterval(shootControl[n]);
    shootControl = [];
    n = 0;

    clearInterval(impact);
    clearInterval(shootControl[n]);
    popUp.style.display = 'block';
    popUp.innerHTML = `> Fim de jogo! <<br><hr><br>Você conseguiu <p style='color: orange; display: inline-block'>${points} ponto(s)</p>
    <br><br><hr><br> <button type='button' onclick= 'start()'>Jogar denovo?</button>`;
    points = 0;
    let sel = document.querySelector('#points');
    sel.innerHTML = `Points: ${points}`;
}

localStorage.setItem('p0', '0');
localStorage.setItem('p1', '0');
localStorage.setItem('p2', '0');

function podium(matchPoints, operation){
    let points = [];
    
    for(i = 0; i < localStorage.length; i++){
        points[i] = Number(localStorage[`p${i}`]);
    }
    if(matchPoints > points[0]){
        points[2] = points[1];
        points[1] = points[0];
        points[0] = matchPoints;   
    } 
    else if (matchPoints > points[1]){
        points[2] = points[1];
        points[1] = matchPoints;   
    }
    else if (matchPoints > points[2]){
        points[2] = matchPoints;   
    }

    for(i = 0; i < localStorage.length; i++){
        localStorage.setItem(`p${i}`, points[i]);
    }
    if(operation == 'open' && mLock == 1){
        popUp.style.display = 'block';
        popUp.innerHTML = `
        <h1>Pódio</h1><hr>
        <br>🥇 > <strong>Melhor pontuação:</strong> ${points[0]} points
        <br><br>🥈 > <strong>Segunda melhor:</strong> ${points[1]} points
        <br><br>🥉 > <strong>Terceira melhor:</strong> ${points[2]} points
        <br><br><button type='button' onclick="podium(0, 'close')">Fechar</button>`;
    }
    if(operation == 'close' && mLock == 1){
        popUp.style.display = 'none';
        popUp.innerHTML = '';
    }
}

