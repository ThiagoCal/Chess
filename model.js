
class Board{

    constructor(n){
        this.n = n
        if(n === 8){
            this.board = [
                [-4, -2, -3, -5, -6, -3, -2, -4],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 1,  1,  1,  1,  1,  1,  1,  1],
                [ 4,  2,  3,  5,  6,  3,  2,  4],
            ]
        }
        else if (n === 5) {
            this.board = [
                [-4, -2, -3, -5, -6],
                [-1, -1, -1, -1, -1],
                [ 0,  0,  0,  0,  0],
                [ 1,  1,  1,  1,  1],
                [ 4,  2,  3,  5,  6],
            ]
        }
    }

    print(){
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] >= 0) {h
                    process.stdout.write(" ")
                }
                process.stdout.write(this.board[i][j] + " ")
            }
            console.log();
        }
    }

    inside(i, j) {
        return !(i < 0 || i > this.n || j < 0 || j > this.n)
    }

    empty(i, j) {
        return (this.board[i][j] === 0);
    }

   //Movimentos

    pawn_move(i0, j0, i, j) {
        let u, pi0, pi1;
        if (this.board[i0][j0] > 0) {
            u = -1;
            pi0 = 6;
            pi1 = 5;
        } else {
            u = 1;
            pi0 = 1;
            pi1 = 2;
        }
        if (i - i0 === u && j === j0 && this.empty(i, j)){ //movimentação normal
            return true;
        }
        if (i0 === pi0 && i - i0 === 2*u && j === j0 && this.empty(i, j) && this.empty(pi1, j)){ //andada de dupla casa
            return true;
        }
        if (this.board[i][j] * u > 0  && i - i0 === u && (j0 - j === 1 || j - j0 === 1)){ //identifica se a peça é inimiga - comer a peça adv
            return  true;
        }
        return false;
    }
    
    //movimentação cavalo 

    knight_move(i0, j0, i, j) {
        var x;
        x = this.board[i][j] * this.board[i0][j0];
        if (x > 0){
            return false // peça da mesma cor. invalida movimento
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

    /* bishop_move(i0, j0, i, j) {
        
        var b;
        b = this.board[i][j] * this.board[i0][j0];
        if (b > 0){
            return false
        }
        var dy = Math.abs(i -i0);
        var dx = Math.abs(j - j0);
        if (dx===1 && dy===1){
            
        }
         */

    move(i0, j0, i, j) {
        if(!this.inside(i0,j0) || !this.inside(i,j)){
            return "Fora do tabuleiro";
        }
        var piece = Math.abs(this.board[i0][j0]);
        var ok;
        switch(piece){
        case 0: 
            return "Casa de origem vazia";
        case 1:
            console.log("Selecionou um peão");
            ok = this.pawn_move(i0, j0, i, j);
            break;
        case 2:
            ok = this.knight_move(i0, j0, i, j);
            break;
        default:
            return "Não implementado";
        }

        if (ok) {
            this.board[i][j] = this.board[i0][j0];
            this.board[i0][j0] = 0;
            return true;
        }
        return "Movimento inválido";
    }
}