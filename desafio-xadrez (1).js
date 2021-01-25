// Desafio Xadrez

// PASSO 1 => Crie, usando colchetes, uma matriz para representar o estado inicial de um
// tabuleiro de xadrez. O tabuleiro de xadrez tem 8 linhas e 8 colunas. Os valores da
// matriz são números representando as peças do jogo. Os valores para as peças BRANCAS são
// os seguintes.
//
// peão    pawn    1
// cavalo  knight  2
// bispo   bishop  3
// torre   rook    4
// rainha  queen   5
// rei     king    6
//
// As peças pretas possuem os mesmos valores, mas com sinal negativo.
// Por exemplo: torre preta vale -4.
//
// Casas em branco possuem valor 0.
//
// Você deve criar uma função que retorna o tabuleiro criado.

function newboard() {
	var board = [
		[-4, -2, -3, -5, -6, -3, -2, -4],
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[ 0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0],
		[ 1,  1,  1,  1,  1,  1,  1,  1],
		[ 4,  2,  3,  5,  6,  3,  2,  4],
	]; 
	return board; 
}

// PASSO 2 => Crie uma função que recebe um tabuleiro de xadrez e o imprime na tela. Preste
// atenção na formatação para que o tabuleiro seja imprimido corretamente.

function print(board) {

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if (board[i][j] >= 0) {
				process.stdout.write(" ")
			}
			process.stdout.write(board[i][j] + " ")
		}
		console.log();
	}
}
print (newboard());
// PASSO 3 => Crie uma função que recebe uma posição (i, j) e retorna "true"
// caso essa seja uma posição válida dentro do tabuleiro e "false" caso
// contrário.
//
// Uma posição válida no tabuleiro tem 0 <= i < 8 e 0 <= j < 8.

function inside(i , j) {
	 return !(i < 0 || i > 8 || j < 0 || j > 8)
}
console.log(inside(4,4));
// PASSO 4 => Crie uma função que recebe o tabuleiro, uma posição no tabuleiro (i, j), e
// retorna "true" se nenhuma peça estiver naquela posição do tabuleiro e "false" caso contrário.

function empty(board, i, j) {
	return (board[i][j] === 0);
	
}
var vazio = empty (newboard(), 0,0)
console.log(vazio);

// PASSO 5 => Crie uma função que recebe a posição (i0 e j0) de um peão BRANCO no tabuleiro, uma
// posição que indica o movimento do jogador com aquele peão (i, j) e retorna "true" se o movimento
// for válido e "false" caso contrário.
//
// As regras a serem validadas são as seguintes:
//   => Um peão pode sempre andar um espaço para frente caso esse esteja desocupado.
//   => Um peão pode andar dois espaços para frente caso ainda não tenha se movido.
//      DICA: não ter se movido significa "ainda estar em sua linha inicial do tabuleiro".
//   => Um peão pode tomar uma peça adversária diagonalmente. Ele não pode ser mover na diagonal de
//      qualquer outra forma a não ser para tomar uma peça.
//
// DICA: você vai precisar usar a função "empty" criada no PASSO 4.

function pawn_move(board, i0, j0, i, j) {
	var u, p10, pi1;
	if (board[i][j] > 0) {
		u = 1;
		pi0 = 6;
		pi1 = 5;
	}
	else{
		u = -1;
		pi0 = 1;
		pi1 = 2;
	}
	if (i0 - i === u && j === j0 && empty(board, i, j)){
		return true;
	}
	if (i === pi0 && i0 - i === 2*u && j === j0 && empty(board, i, j) && empty(board, pi1, j)){
		return true;
	}
	if (board[i][j] * u < 0 && i0 - i === u && (j0 - j === 1 || j - j0 === 1)){
		return  true;
	}
	return false;
}


// PASSO 6 => Altere a função criada anteriormente para que ela também funcione validando
// o movimento dos peões pretos.

// PASSO 7 => Crie uma função similar à anterior para validar o movimento do cavalo.
//
// O cavalo anda dois na vertical e um na horizontal ou dois na horizontal e um na vertical.

function knight_move(board, i0, j0, i, j) {
	var x;
	x = board[i][j] * board[i0][j0];
	if (x > 0){
		return false
	}
	var dy = Math.abs(i -i0);
	var dx = Math.abs(j - j0);
	if (dx===2 && dy===1){
		return true;
	}
	if (dx===1 && dy===2){
		return true;
	}
	return false;

}

// EXTRA => Crie funções para validar o movimento do bispo, da torre e da rainha.

function bishop_move(board, i0, j0, i, j) {
	// o bispo só pode andar na diagonal (max 7 posições, min 1)
	// o bispo não pode passar por cima de outras peças da mesma cor
	// o bispo pode andar para frente e para trás
	//var board = [
	//	[-4, -2, -3, -5, -6, -3, -2, -4],
	//	[-1, -1, -1, -1, -1, -1, -1, -1],
	//	[ 0,  0,  0,  0,  0,  0,  0,  0],
	//	[ 0,  0,  0,  0,  0,  0,  0,  0],
	//	[ 0,  0,  0,  0,  0,  0,  0,  0],
	//	[ 0,  0,  0,  0,  0,  0,  0,  0],
	//	[ 1,  1,  1,  1,  1,  1,  1,  1],
	//	[ 4,  2,  3,  5,  6,  3,  2,  4],
 
	var b;
	b = board[i][j] * board[i0][j0];
	if (b > 0){
		return false
	}
	var dy = Math.abs(i -i0);
	var dx = Math.abs(j - j0);
	if (dx===1 && dy===1){

	}
	

	
	return false; 
 }
function rook_move(board, i0, j0, i, j) { return false; /* TODO */ }
function queen_move(board, i0, j0, i, j) { return false; /* TODO */ }

// PASSO 8 => Crie uma função que recebe uma posição inicial (i0 e j0), uma posição final (i, j)
// e retorna "true" quando a peça naquela posição inicial pode realizar o movimento até a posição
// final, ou "false" caso contrário.
//
// Note que se a posição inicial não está dentro do tabuleiro ou está vazia, a função deve
// retornar "false".

function move(board, i0, j0, i, j) {
	var piece =board[i][j];
	
	return false; // TODO
}

// PASSO 9 => Crie uma função que recebe de entrada do usuário uma posição inicial (i0, j0) e uma
// posição final (i, j) representando uma jogada. A função deve imprimir o novo estado do tabuleiro
// caso o movimento seja legal ou "JOGADA ILEGAL" caso contrário.

function step(board, i0, j0, i, j) {
	// TODO
}

// PASSO 10 => O resto?

// O que falta?
//  => Alternância de jogadas: jogador branco, jogador preto, jogador branco, jogador preto, etc.
//  => Ao invés de imprimir números, o tabuleiro podia mostrar palavras, como "TP" para "torre preta".
//  => Peão com a regra "en passant".
//  => Roque entre rei e torre.
//  => Função que verifica se o rei está em xeque.
//  => Movimento do rei: o rei não pode se mover para quadrados onde ficaria em xeque.
//  => Suas peças não podem se mover para posições que deixariam o seu rei em xeque.
//  => Função que verifica se o rei está em xeque-mate.
//  => A função "step" deve verificar se o rei do jogador está em xeque. Caso esteja, o movimento
//     do jogador só é válido se o rei deixar de ficar em xeque.
//  => Regra de promoção de peças!
