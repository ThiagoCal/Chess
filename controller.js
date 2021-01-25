
let boardSize = 8;


let B = new Board(boardSize); // board do modelo

let board = [
    ["blackrook", "blackknight", "blackbishop", "blackqueen", "blackking", "blackbishop", "blackknight", "blackrook"],
    ["blackpawn", "blackpawn"  , "blackpawn"  , "blackpawn" , "blackpawn", "blackpawn"  , "blackpawn"  , "blackpawn"],
    ["empty"    , "empty"      , "empty"      , "empty"     , "empty"    , "empty"      , "empty"      , "empty"    ],
    ["empty"    , "empty"      , "empty"      , "empty"     , "empty"    , "empty"      , "empty"      , "empty"    ],
    ["empty"    , "empty"      , "empty"      , "empty"     , "empty"    , "empty"      , "empty"      , "empty"    ],
    ["empty"    , "empty"      , "empty"      , "empty"     , "empty"    , "empty"      , "empty"      , "empty"    ],
    ["whitepawn", "whitepawn"  , "whitepawn"  , "whitepawn" , "whitepawn", "whitepawn"  , "whitepawn"  , "whitepawn"],
    ["whiterook", "whiteknight", "whitebishop", "whitequeen", "whiteking", "whitebishop", "whiteknight", "whiterook"],
];

let selected = undefined;

class P { // position
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    select() {
        if (selected === undefined) {
            console.log("selected", this.toString());
            this.highlight(true);
            selected = this;
        } else if (this.equals(selected)) {
            console.log("deselected", this.toString());
            this.highlight(false);
            selected = undefined;
        } else {
            console.log("trying to move", selected.toString(), "to", this.toString());

            let ok = B.move(selected.i, selected.j, this.i, this.j);

            if (ok === true) {
                this.img.attr("src", selected.class +".png");
                selected.img.attr("src", "empty.png");
                selected.highlight(false);

                board[this.i][this.j] = board[selected.i][selected.j];
                board[selected.i][selected.j] = "empty";
                selected = undefined;
            } else {
                
                selected.highlight(false);
                selected = undefined;
                console.log("JOGADA ILEGAL", ok);
            }
        }
    }

    equals(p) {
        return this.i == p.i && this.j == p.j;
    }

    get div() {
        return $("#div" + this.i + this.j);
    }

    get img() {
        return $("#img" + this.i + this.j);
    }

    get class() {
        return board[this.i][this.j]
    }

    highlight(bool) {
        let c = "highlighted";
        if (bool) this.div.addClass(c);
        else      this.div.removeClass(c);
    }

    toString() {
        return this.class + "[" + this.i + "][" + this.j + "]"
    }
}

function init() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            let p = new P(i, j)
            p.img.attr("src", board[i][j] +".png");;
            p.div.click(() => p.select());
        }
    }
}

$(document).ready(init);
