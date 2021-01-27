
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

     bishop_move(i0, j0, i, j) {
		
		let dx = Math.abs(j - j0);
		let dy = Math.abs(i - i0);

		if(dx !== dy){  //caminho inválido - não forma 45 graus
			return false;
		}
		
		let ux;
		if(j > j0){
			ux = 1 
		 }
		 else{ 
			 ux = -1;
		 }  //andando para no eixo x
		let uy; 	//andando no eixo y
		if(i > i0) {  
			uy = 1;
		} 
		else {
			uy = -1;
		}
		
		let x = j0 + ux;
		let y = i0 + uy;

		while(x !== j && y !== i){//checagem do caminho até o final
			console.log(x, y);
			console.log(ux, uy);
			if(!this.empty(y, x)){
				return false;
			}
			x += ux; //incrementa uma casa
			y += uy; //incrementa uma casa
		}

		return true;	

	 }
       
	 tower_move(i0, j0, i, j) {

        let dx = Math.abs(j - j0);
		let dy = Math.abs(i - i0);

		if((dx === 0 && dy === 0) || (dx !== 0 && dy !== 0)){  //caminho inválido 
			return false;
        }
        
        let tx;
		if(j > j0){
			tx = 1;
		}
		else if(j < j0){ 
             tx = -1;
        }
        else {
            tx = 0;
        }
           //andando para no eixo x
		let ty; 	//andando no eixo y
		if(i > i0) {  
			ty = 1;
		} 
        else if(i < i0){ 
            ty = -1;
        }
        else{
           ty = 0;
        }
               
        let x = j0 + tx;
		let y = i0 + ty;
        console.log(x, y);
        console.log(tx, ty)
        console.log(x, y);
        console.log(j, i);
		while( ( x !== j && y === i) || ( x === j && y !== i)){//checagem do caminho até o final
			
			console.log(tx, ty);
			if(!this.empty(y, x)){
				return false;
			}
			x += tx; //incrementa uma casa
			y += ty; //incrementa uma casa
		}

		return true;

     }

    king_move(i0, j0, i, j) {
        let dx = Math.abs(j - j0);
        let dy = Math.abs(i - i0);

       return dx <= 1 && dy <= 1;
    }


    move(i0, j0, i, j) {
        if(!this.inside(i0,j0) || !this.inside(i,j)){
            return "Fora do tabuleiro";
        }
        if(this.board[i][j]*this.board[i0][j0] > 0){
            return "Peças da mesma cor";
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
		case 3:
			ok = this.bishop_move(i0, j0, i, j);
            break;
        case 4:
            ok = this.tower_move(i0, j0, i, j);
            break;
        case 5:
            ok = this.tower_move(i0, j0, i, j) || this.bishop_move(i0, j0, i, j);
            break;
        case 6:
            ok = this.king_move(i0, j0, i, j);
            break;
        default:
            return "Erro do programa";
        }

        if (ok) {
            let piece0 = this.board[i0][j0];
            let piece1 = this.board[i][j]; 
            this.board[i][j] = this.board[i0][j0];
            this.board[i0][j0] = 0; //deixa a casa anterior da peça vazia
            if(this.check(piece0)){
                this.board[i][j] = piece1;
                this.board[i0][j0] = piece0;
               return "Rei em check";
            }
            return true;
        }
        return "Movimento inválido";
    }

    getKing(color) {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                let piece = this.board[i][j];
                if (Math.abs(piece) == 6 && piece * color > 0) { // se é um rei e se é da mesma cor
                    return {i: i, j: j};
                }
            }
        }
    }
    
    check(color) {
        let kingPosition = this.getKing(color);
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (color * this.board[i][j] < 0) { // se é uma peça inimiga
                    if (this.move(i, j, kingPosition.i, kingPosition.j) === true) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}