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

        this.tileInsidePositionX = TILE_WIDTH/2;
        this.tileInsidePositionY = TILE_HEIGHT/2;

        this.initialXPosition = this.x * TILE_WIDTH * 2;
        this.initialYPosition = this.y * TILE_HEIGHT;

        this.alive = true;
        this.player = player;

        this.counter = 0;
    }

    update(){

    }

    initPosition(){
        ctx.beginPath();
        let moveLeft = 0, playerTwoTiles = 0;
        
        (this.y % 2 === 1) ? moveLeft = TILE_WIDTH * 1  : moveLeft = 0;

        if (this.player === '2') {
            playerTwoTiles = 100
            ctx.fillStyle = 'brown';
        } else {
            ctx.fillStyle = 'yellow';
        }

        ctx.arc(this.tileInsidePositionX + this.initialXPosition + moveLeft,
                this.tileInsidePositionY + this.initialYPosition + playerTwoTiles, 
                20, 0, Math.PI * 2);
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
    let pieces = [];
    let player = '1';
    jumpTiles = 0;

    for(let y=0; y<6; y++){
        if (y === 3) {
            player = '2'
        };
        for(let x=0; x<4; x++){
            pieces.push(new Piece(x, y + jumpTiles, player))
        }
    }

    pieces.forEach(piece=>{
        piece.initPosition();
    });
}

drawTable();
initPieces();

function animate(){

    requestAnimationFrame(animate);
}
animate();