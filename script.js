/** @type {HTMLCanvasElement} */
const turnInformationText = document.querySelector('#turn-information');
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 400;
const TILE_WIDTH = CANVAS_WIDTH / 8;
const TILE_HEIGHT = CANVAS_HEIGHT / 8;
let turn = 0;


const findPiece = (piece, moveX, moveY) =>
     piece.x === moveX && piece.y === moveY;
class Piece {
    constructor(x, y, player, color){
        this.x = x;
        this.y = y;
        this.piecePositionX = this.x * TILE_WIDTH + TILE_WIDTH/2;
        this.piecePositionY = this.y * TILE_HEIGHT + TILE_HEIGHT/2;
        this.alive = true;
        this.player = player;
        this.color = color;
        this.counter = 0;
        
        this.tilesSelection = {
            isSelected: false,
            tileToMoveLeft: 0,
            tileToMoveRight: 0,
            
            tileToMoveLeftBehind: 0,
            tileToMoveRightBehind: 0,
        };
        

    }

    movePiece(toX, toY, isAttacking) {

        const xDif = Math.abs(toX - this.x);
        const yDif = Math.abs(toY - this.y);
        this.tilesSelection.isSelected = false;


        if (xDif > 2 || yDif > 2 ) return;
        if (xDif === 0 && yDif === 1) return;
        if (xDif === 2 && yDif === 0) return;

        const playerMovement = (this.player === '1') ? 1 : -1
        
        if (isAttacking){
            this.x = toX;
            this.y = toY;
            turn++;
            return 
        }

        if (toX === this.x + 1 && toY === this.y + playerMovement ||
            toX === this.x - 1 && toY === this.y + playerMovement) {
                this.x = toX;
                this.y = toY;
                turn++;
                return
            }
        
    }

    selectPiece({
        xToMove,
        yToMove,
    }){
        this.tilesSelection.isSelected = true;
        

        if (this.player === '1'){

            if (xToMove === -1 && yToMove === 1){
                this.tilesSelection.tileToMoveLeft = 1;
            }

            else if (xToMove === 1 && yToMove === 1){
                this.tilesSelection.tileToMoveRight = 1;

            }
            else if (xToMove === 2 && yToMove === 2){
                this.tilesSelection.tileToMoveRight = 2;
            }
            else if (xToMove === -2 && yToMove === 2){
                this.tilesSelection.tileToMoveLeft = 2;
            }
            else if (xToMove === -2 && yToMove === -2){
                this.tilesSelection.tileToMoveLeftBehind = 2;
            }
            else if (xToMove === 2 && yToMove === -2){
                this.tilesSelection.tileToMoveRightBehind = 2;

            }


        }
        
        if (this.player === '2'){

            if (xToMove === -1 && yToMove === -1){
                this.tilesSelection.tileToMoveLeft = 1;
            }

            else if (xToMove === 1 && yToMove === -1){
                this.tilesSelection.tileToMoveRight = 1;
            }
           
            else if (xToMove === -2 && yToMove === 2){
                this.tilesSelection.tileToMoveLeftBehind = 2;
            }

            else if (xToMove === 2 && yToMove === 2){
                this.tilesSelection.tileToMoveRightBehind = 2;

            }


        }


        

        // if (xToMove === -1) {
        //     this.tilesSelection.tileToMoveLeft = 1;
        // } else if (xToMove === -2) {
        //     this.tilesSelection.tileToMoveLeft = 2;
        // }
            
        // if (xToMove === 1) {
        //     this.tilesSelection.tileToMoveRight = 1;
        // } else if (xToMove === 2){
        //     this.tilesSelection.tileToMoveRight = 2;
        // }

    }

    update(){
        // position
        this.piecePositionX = this.x * TILE_WIDTH + TILE_WIDTH / 2;
        this.piecePositionY = this.y * TILE_HEIGHT + TILE_HEIGHT / 2;

    }
    
    draw(){
        this.drawPiece();
        if(this.tilesSelection.isSelected) this.drawSelectedTiles();


    }

    drawPiece(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.piecePositionX, this.piecePositionY, TILE_WIDTH/2.5 , 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        
    }

    drawSelectedTiles() {
        const { tileToMoveLeft, tileToMoveRight, tileToMoveRightBehind, tileToMoveLeftBehind } = this.tilesSelection
        let playersTileToJump = 0, playersTileToJumpBehind = 0;
        if (this.player === '2') playersTileToJump = - 2 * TILE_HEIGHT;
        
        this.player === '1' ? playersTileToJumpBehind = -5/2 : playersTileToJumpBehind = 3/2
        
        
        ctx.beginPath()
        if (tileToMoveLeft){
            ctx.rect(
            this.piecePositionX - TILE_WIDTH * (tileToMoveLeft + 1/2), 
            this.piecePositionY + TILE_HEIGHT * (tileToMoveLeft - 1 + 1/2) + playersTileToJump * tileToMoveLeft, 
            TILE_WIDTH, TILE_HEIGHT
            );
        }
            
        if (tileToMoveRight){
            ctx.rect(
            this.piecePositionX + TILE_WIDTH * (tileToMoveRight - 1/2), 
            this.piecePositionY + TILE_HEIGHT * (tileToMoveRight - 1 + 1/2) + playersTileToJump * tileToMoveRight, 
            TILE_WIDTH, TILE_HEIGHT
            );

        }
        if (tileToMoveRightBehind){
            let yPosition =  -3/2
            let xPosition =  3/2
            if (this.player === '2') {
                yPosition = 5/2
                xPosition = 3/2
            }

            ctx.rect(
            this.piecePositionX + TILE_WIDTH * (xPosition), 
            this.piecePositionY + TILE_HEIGHT * (-1 + yPosition),
            TILE_WIDTH, TILE_HEIGHT
            );
        }
        if (tileToMoveLeftBehind){
            let yPosition =  -7/2
            let xPosition =  -5/2
            if (this.player === '2') {
                yPosition = 1/2
                xPosition = -5/2
            }

            ctx.rect(
            this.piecePositionX + TILE_WIDTH * (xPosition), 
            this.piecePositionY + TILE_HEIGHT * (1 + yPosition),
            TILE_WIDTH, TILE_HEIGHT
            );
        }
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();
    }
    
}

function informTurn(){
    if (turn % 2 === 1){
        turnInformationText.innerHTML = 'É a vez do vermelho'
        turnInformationText.style.color = 'red'
    } else {
        turnInformationText.innerHTML = 'É a vez do amarelo'
        turnInformationText.style.color = 'yellow'

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
    let pieces = [], player = '1', jumpX = 0, jumpY = 0, color = 'yellow';
    
    for(let y=0; y<6; y++){
        y % 2 === 0 ? jumpX = 0 : jumpX = -1;
        if (y === 3) {
            player = '2';
            jumpY = 2;
            color = 'brown';
        };
        for(let x=0; x<4; x++){
            jumpX++;
            
        pieces.push(new Piece(x + jumpX, y + jumpY, player, color))
        }
    }
    return pieces;
}




function pieceClickSelect(selectedX, selectedY){

    const playerTurn = turn % 2 === 0 ? '1' : '2';
    const selectedPiece = pieces.find(selectedPiece => 
        selectedPiece.x === selectedX && 
        selectedPiece.y === selectedY &&
        playerTurn === selectedPiece.player)

        
    if (!selectedPiece) return;
    selectedPiece.tilesSelection.isSelected = false;

    pieces.forEach(piece=>{
        piece.tilesSelection.tileToMoveLeft = 0;
        piece.tilesSelection.tileToMoveRight = 0;
        piece.tilesSelection.tileToMoveLeftBehind = 0;
        piece.tilesSelection.tileToMoveLeftBehind = 0;
    })

    console.log(selectedPiece)

    const jumpY = (selectedPiece.player === '1') ? 1 : -1;
    
    const canMoveInsideTableY = (selectedPiece.player === '2') ? selectedY - 1 < 0 : selectedY + 1 >= CANVAS_HEIGHT / TILE_HEIGHT;
    
    const canMoveLeftInsideTable = !(selectedX - 1 < 0 || canMoveInsideTableY);
    const canMoveRightInsideTable = !(selectedX + 1 >= CANVAS_WIDTH / TILE_WIDTH || canMoveInsideTableY);

    const leftPiece = pieces.find(piece=> findPiece(piece, selectedX - 1, selectedY + jumpY))
    const rightPiece = pieces.find(piece => findPiece(piece, selectedX + 1, selectedY + jumpY))

    const leftPieceBehind = pieces.find(piece=> findPiece(piece, selectedX - 1, selectedY - jumpY))
    const rightPieceBehind = pieces.find(piece => findPiece(piece, selectedX + 1, selectedY - jumpY))


   

    // left behind
    moveOrKillPiece(
        selectedPiece, 
        leftPieceBehind,
        -1, 
        (jumpY) * -1 ,
    )

    // right behind
    moveOrKillPiece(
        selectedPiece, 
        rightPieceBehind,
        1, 
        (jumpY) * -1 
    )

    // left
    moveOrKillPiece(
        selectedPiece, 
        leftPiece,
        -1, 
        jumpY 
    )
    
    // right
    moveOrKillPiece(
        selectedPiece, 
        rightPiece,
        1, 
        jumpY 
    )

}

function moveOrKillPiece (selectedPiece, pieceToCheck, xToMove, yToMove){
    



    if (!pieceToCheck){

        selectedPiece.selectPiece({
            xToMove,
            yToMove,
        })
        
    } else if (pieceToCheck.player !== selectedPiece.player){ 
        const occupiedTile = 
        pieces.find(piece => findPiece(piece, pieceToCheck.x + xToMove , pieceToCheck.y + yToMove));
        

        if (!occupiedTile) {
            selectedPiece.selectPiece({
                xToMove: xToMove * 2,
                yToMove: yToMove * 2,
            })
        }
    }

}



function tableClick(e) {
    e.preventDefault();

    const { offsetX: xClick, offsetY: yClick } = e;
    const selectedX = Math.floor(xClick/TILE_WIDTH);
    const selectedY = Math.floor(yClick/TILE_HEIGHT);
    const selectedPiece = pieces.find(piece => piece.tilesSelection.isSelected === true);


    // IF THE PIECE WERE SELECTED
    if (selectedPiece) {
        const atackedPiece = pieces.find(piece => 
            piece.x === selectedX && piece.y === selectedY)

        
            
        if (atackedPiece) {
            const xDif = Math.abs(selectedPiece.x - atackedPiece.x);
            const yDif = Math.abs(selectedPiece.y - atackedPiece.y);

            if (xDif > 1 || yDif > 1 ) return;

            const moveLeftOrRight = selectedPiece.x - atackedPiece.x;
            const moveTopOrBottom = (selectedPiece.player === '1') ? -1 : 1;


            const isTileOccupied = pieces.find(piece => 
                piece.x === atackedPiece.x - moveLeftOrRight && 
                piece.y === atackedPiece.y - moveTopOrBottom)

            
            // mesmo time
            if (isTileOccupied || selectedPiece.player === atackedPiece.player){
                selectedPiece.tilesSelection.isSelected = false;
                return
            }
            
            const pieceAttackedIndex = pieces.findIndex(piece => 
                piece.x === selectedX && piece.y === selectedY)

            pieces.splice(pieceAttackedIndex, 1);
            selectedPiece.movePiece(selectedX - moveLeftOrRight, selectedY - moveTopOrBottom, true)
            return;
        }

        selectedPiece.movePiece(selectedX, selectedY)
        return;
    } 
    
    // SELECT PIECE


    
    pieceClickSelect(selectedX, selectedY);
}
canvas.onmousedown = tableClick;

const pieces = initPieces();

pieces[5].x = 0
pieces[5].y = 0

pieces[6].x = 0
pieces[6].y = 0



pieces[13].x = 4
pieces[13].y = 3

pieces[18].x = 6
pieces[18].y = 3


pieces[14].x = 0
pieces[14].y = 0
pieces[15].x = 0
pieces[15].y = 0
// pieces[15].x = 0
// pieces[15].y = 0

pieces[17].x = 0
pieces[17].y = 0
pieces[16].x = 0
pieces[16].y = 0



function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    informTurn();

    drawTable();

    pieces.forEach((piece, index)=>{
        piece.draw();
        piece.update();

        ctx.font = "15px Arial";
        ctx.fillStyle = "green"
        ctx.fillText(index, piece.piecePositionX, piece.piecePositionY);
    })

    requestAnimationFrame(animate);
}


animate();