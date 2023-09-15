
const gameboard = (() => {
    let _board = new Array(9);
    _board.fill('O');
    let gTiles = document.querySelectorAll(".gameTile");
    const _init = () => {
        //ready the gameboard for play - add event listeners to gameTiles etc.
        for (let tile of gTiles) {
            tile.addEventListener("click", function(){
                if (gameController.playerOnTurn){
                    this.textContent = 'X';
                    gameController.playerOnTurn = false;
                } else {
                    this.textContent = 'E';
                    gameController.playerOnTurn = true;
                }
            })
        }
    }
    const showGameBoard = () => {
        let gb = document.querySelector(".gameboard-wrapper");
        let index = 0;
        for(let tile of gTiles){
            tile.textContent = _board[index];
            index++;
        }
    }


    return {
        _board, showGameBoard, _init
    }
})()

const Player = (name, health) => {
    return {name, health};
}

const gameController = (() => {
    const player = Player("Jakub");
    const enemy = Player("Marek");
    const gamePlaying = true;
    let playerOnTurn = true;
    const _start = () => {
        gameboard._init();
        gameboard.showGameBoard();

    }
    return { player, enemy, _start, playerOnTurn }
})()

gameController._start();