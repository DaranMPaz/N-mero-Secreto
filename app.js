let tentativas = 1;
let numeroMaximo = 5;
let listaNumerosSorteados = [];
let numeroAleatorio = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function gerarNumeroAleatorio() {
  let quantidadeElementosLista = listaNumerosSorteados.length;
  let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);

  if (quantidadeElementosLista == numeroMaximo) {
    listaNumerosSorteados = [];
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio(numeroMaximo);
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    
    return numeroEscolhido;
  }
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Número Secreto");
  exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroMaximo}:`);
}

function limpaCampo() {
  chute = document.querySelector('input')
  chute.value = "";
}

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroAleatorio) {
    exibirTextoNaTela("h1", "Parabéns!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroAleatorio) {
      exibirTextoNaTela("p", "O número é menor");
    } else {
      exibirTextoNaTela("p", "O número é maior");
    }
    tentativas ++;
  }
}

function novoJogo() {
  numeroAleatorio = gerarNumeroAleatorio();
  limpaCampo();
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

exibirMensagemInicial();