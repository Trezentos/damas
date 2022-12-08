/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 400;
const TILE_WIDTH = CANVAS_WIDTH / 8;
const TILE_HEIGHT = CANVAS_HEIGHT / 8

class Piece {
    constructor(x, y, player){
        this.x = x;
        this.y = y;

        this.piecePositionX = this.x * TILE_WIDTH + TILE_WIDTH/2;
        this.piecePositionY = this.y * TILE_HEIGHT + TILE_HEIGHT/2;

        this.alive = true;
        this.player = player;

        this.counter = 0;
    }

    update(){

    }

    draw(){
        this.player === '1' ? ctx.fillStyle = 'yellow' : ctx.fillStyle = 'brown';
        ctx.beginPath();
        ctx.arc(this.piecePositionX, this.piecePositionY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    
}

function drawTable() {
    
    let counter = 0;
    for (let i=0; i<8; i++){
        for (let j=0; j<8; j++){
            ctx.beginPath();
            ctx.rect(i*TILE_WIDTH, j*TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
            ctx.fillStyle = counter % 2 == 0 ? 'white' : 'black';
            ctx.fill();
            ctx.stroke();

            counter++;
        }
        counter++;
    }

    
}

function initPieces() {
    let pieces = [], player = '1', jumpX = 0, jumpY = 0;
    
    for(let y=0; y<6; y++){
        y % 2 === 0 ? jumpX = 0 : jumpX = -1;

        if (y === 3) {
            player = '2';
            jumpY = 2;
        };
        for(let x=0; x<4; x++){
            jumpX++;
            pieces.push(new Piece(x + jumpX, y + jumpY, player))
        }
    }

    return pieces;
}

const pieces = initPieces();

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawTable();

    pieces.forEach(piece=>{
        piece.draw();
    })

    requestAnimationFrame(animate);
}


animate();