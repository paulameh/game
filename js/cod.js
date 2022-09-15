function moverdireita() {
    // id does not have to be specified, look:
    div2.style.left = parseInt(getComputedStyle(div2).left) + window.innerWidth * 0.006;
    if (parseInt(getComputedStyle(div2).left) >= window.innerWidth * 0.89) {
        // Tira o valor de m, para ele e tira o interval, ele a princípio é moverdireita();
        clearInterval(m);
        m = setInterval("moveresquerda()", 15);
    }
}
function moveresquerda() {
    div2.style.left = parseInt(getComputedStyle(div2).left) - window.innerWidth * 0.006;
    if (parseInt(getComputedStyle(div2).left) <= 0) {
        clearInterval(m);
        m = setInterval("moverdireita()", 15);
    }
}

// Mover cursor 1  - através dos botões
function move(Direcao) {
    if (contador != 0) {
        para();
    }
    if (Direcao == "direita") {
        timer = setInterval("direita()", 15);
        contador++;

    }

    if (Direcao == "esquerda") {
        timer = setInterval("esquerda()", 15);
        contador++;
    }

    if (Direcao == "acima") {
        timer = setInterval("acima()", 15);
        contador++;
    }

    if (Direcao == "baixo") {
        timer = setInterval("baixo()", 15);
        contador++;
    }
}
function direita() {
    div1.style.left = parseInt(getComputedStyle(div1).left) + 5;
    if (parseInt(getComputedStyle(div1).left) >= window.innerWidth - window.innerWidth * 0.1) {
        clearInterval(timer);
        timer = setInterval("esquerda()", 15);
    }
}

function esquerda() {
    div1.style.left = parseInt(getComputedStyle(div1).left) - 5;
    if (parseInt(div1.style.left) <= 0) {
        clearInterval(timer);
        timer = setInterval("direita()", 15);
    }
}

function baixo() {
    div1.style.top = parseInt(getComputedStyle(div1).top) + 5;
    if (parseInt(getComputedStyle(div1).top) >= parseInt(getComputedStyle(fundo).height) - parseInt(getComputedStyle(div1).height)) {
        clearInterval(timer);
        timer = setInterval("acima()", 15);
    }
}
function acima() {
    div1.style.top = parseInt(getComputedStyle(div1).top) - 5;
    if (parseInt(getComputedStyle(div1).top) <= 0) {
        clearInterval(timer);
        timer = setInterval("baixo()", 15);
    }
}

// Parar cursores
function para2() {
    clearInterval(m);
}
function para() {
    clearInterval(timer);
}


function altura(parametro) {
    div1.style.height = parseInt(getComputedStyle(div1).height) + parametro;
}

function largura(parametro) {
    div1.style.width = parseInt(getComputedStyle(div1).width) + parametro;
}
function cor() {
    switch(cont){
        case 0:
            document.getElementById("div1").style.backgroundColor = "gold";
            cont++;
            break;
        case 1:
            document.getElementById("div1").style.backgroundColor = "orange";
            cont++;
            break;
        case 2:
            document.getElementById("div1").style.backgroundColor = "lightcoral";
            cont++;
            break;
        case 3:
            document.getElementById("div1").style.backgroundColor = "lightgreen";
            cont = 0;
    }
}

function colisao() {
    if (((parseInt(getComputedStyle(div1).left) >= parseInt(getComputedStyle(div2).left)) && (parseInt(getComputedStyle(div1).left) <= parseInt(getComputedStyle(div2).left) + window.innerWidth * 0.1)) &&
        ((parseInt(getComputedStyle(div1).top) >= parseInt(getComputedStyle(div2).top)) && (parseInt(getComputedStyle(div1).top) <= parseInt(getComputedStyle(div2).top) + window.innerWidth * 0.1))) {
        para2();
        para();
    }
    if (((parseInt(getComputedStyle(div2).left) >= parseInt(getComputedStyle(div1).left)) && (parseInt(getComputedStyle(div2).left) <= parseInt(getComputedStyle(div1).left) + window.innerWidth * 0.1)) &&
        ((parseInt(getComputedStyle(div2).top) >= parseInt(getComputedStyle(div1).top)) && (parseInt(getComputedStyle(div2).top) <= parseInt(getComputedStyle(div1).top) + window.innerWidth * 0.1))) {
        para2();
        para();
        
    }
}


//Ao carregar a página estas linhas são executadas. Funções que são chamadas a cada 15 e 5 milisegundos
let contador = 0;
let cont = 0;
let m = setInterval("moverdireita()", 15);
let n = setInterval("colisao()", 3);

document.querySelector("#acima").addEventListener("click", () => { move('acima') });
document.querySelector("#esquerda").addEventListener("click", () => { move('esquerda') });
document.querySelector("#direita").addEventListener("click", () => { move('direita') });
document.querySelector("#baixo").addEventListener("click", () => { move('baixo') });
document.querySelector("#acima").addEventListener("click", () => { move('acima') });
document.querySelector("#alturaMais").addEventListener("click", () => { altura(5) });
document.querySelector("#alturaMenos").addEventListener("click", () => { altura(-5) });
document.querySelector("#larguraMais").addEventListener("click", () => { largura(5) });
document.querySelector("#larguraMenos").addEventListener("click", () => { largura(-5) });
document.querySelector("#cor").addEventListener("click", () => { cor() });
document.querySelector("#para").addEventListener("click", () => { para() });
document.querySelector("#para2").addEventListener("click", () => { para2() });
document.querySelector("#denovo").addEventListener("click", () => { denovo() });

function denovo(){
    document.location.reload()
}
