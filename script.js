let button, quebraLinha, jogada = 1, vencedor = 0
let tabuleiro = new Array(3)
for(let i = 0; i < tabuleiro.length;i++){
    tabuleiro[i] = new Array(3)
}

for(let i = 0; i < tabuleiro.length;i++){
    quebraLinha = document.createElement('br');
    document.body.append(quebraLinha);
    for(let j = 0; j < tabuleiro[i].length; j++){
        button = document.createElement('button')
        button.setAttribute('type','button')
        button.setAttribute('id', 'bt' + i + "" + j)
        button.setAttribute('class', 'btJogo' + i )
        button.setAttribute('onclick', "marca(" + i + "," + j + ")")
        button.append(document.createTextNode(""));
        document.body.append(button);
    }
}

let h1 = document.createElement('h1')
h1.setAttribute('id', 'resultado')
document.body.append(h1);

function marca(linha, coluna){
    marcarCasa("bt" + linha + '' + coluna)
}

function marcarCasa(nomeBotao){
    jogada++
    if(jogada % 2 == 0){
        document.getElementById(nomeBotao).innerText = "X"
        document.getElementById(nomeBotao).style.color = "purple"
    }else{
        document.getElementById(nomeBotao).innerText = "O"
        document.getElementById(nomeBotao).style.color = "green"
    }
    document.getElementById(nomeBotao).disabled = true;
    let line = nomeBotao.charAt(2)
    let column = nomeBotao.charAt(3)

    jogada > 5 ? encerraJogo(line, column, 0, 0) : ""

    if(jogada > 9 && vencedor == 0){
        document.getElementById("resultado").innerHTML = "Deu Velha!"
    }
}

function travarCasas(){ // Desabilita todas as casas após o fim do jogo
    for(let i = 0; i < tabuleiro.length;i++){
        for(let j = 0; j < tabuleiro[i].length; j++){
            document.getElementById("bt" + i + "" + j).disabled = true;
        }
    }
}

function encerraJogo(linha, coluna, linhaManual, colunaManual){ // Verifica se houve um vencedor
    verificaLinhasXColunas(linha, linha, linha, colunaManual, colunaManual+1, colunaManual+2)
    verificaLinhasXColunas(linhaManual, linhaManual+1, linhaManual+2, coluna, coluna, coluna)
    verificaDiagonais("bt00", "bt11", "bt22")
    verificaDiagonais("bt02", "bt11", "bt20")
}

function verificaLinhasXColunas(posL1, posL2, posL3, posC1, posC2, posC3){
    if(document.getElementById("bt" + posL1 + "" + posC1).innerText == document.getElementById("bt" +posL2 + "" + posC2).innerText
        && document.getElementById("bt" +posL2 + "" + posC2).innerText == document.getElementById("bt" +posL3 + "" + posC3).innerText
        && document.getElementById("bt" +posL1 + "" + posC1).innerText != ""){
        document.getElementById("resultado").innerHTML = "Jogo finalizado! Vencedor: " + document.getElementById("bt" +posL1 + "" + posC1).innerText
        document.getElementById("resultado").style.marginTop = "40px"
        travarCasas()
        for(let cont in tabuleiro){ //Pinta a linha ou coluna vencedora de vermelho
            (posC1 == 0 &&  posC2 == 1 &&  posC3 == 2) ? document.getElementById("bt" + posL1 + "" + cont).style.color = "yellow" :
            document.getElementById("bt" + cont + "" + posC1).style.color = "yellow";
            vencedor++
        }
    }}

function verificaDiagonais(pos1, pos2, pos3){
    let diagonal = [document.getElementById(pos1).innerText, document.getElementById(pos2).innerText, document.getElementById(pos3).innerText]
    if((diagonal[0] == "X" && diagonal[1] == "X" && diagonal[2] == "X")
        || (diagonal[0] == "O" && diagonal[1] == "O" && diagonal[2] == "O")){
        document.getElementById("resultado").innerHTML = "Jogo finalizado!\nVencedor: " + document.getElementById("bt11").innerText
        travarCasas()
        let contRegressivo = tabuleiro.length - 1
        for(let cont in tabuleiro){
            (pos3 == "bt22") ? document.getElementById("bt" + cont + "" + cont).style.color = "yellow" :
            document.getElementById("bt" + cont + "" + contRegressivo--).style.color = "yellow" //Pinta a diagonal principal ou secundária vencedora de vermelho
            vencedor++
        }
    }
}
