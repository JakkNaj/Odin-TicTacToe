const gameboard = (() => {
    let _board = new Array(9);
    //_board.fill('O');
    const setField = (index, sign) => {
        if (index > _board.length) return;
        _board[index] = sign;
    }
    const getField = (index) => {
        if (index > _board.length) return;
        return _board[index];
    }

    const resetBoard = () => {
        _board = new Array(9);
    }

    return {
        getField, setField, resetBoard
    }
})()

const Player = (sign) => {
    let _sign = sign;
    const getSign = () => _sign;
    const setSign = (sign) => {
        _sign = sign;
    }

    return {
        getSign, setSign
    };
}

const gameController = (() => {
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let round = 1;
    let gamePlaying = true;

    const playRound = (index) => {
        gameboard.setField(index, getPlayerSign());
        if (round === 9){
            console.log("draw");
            gamePlaying = false;
        }
        if (checkWinCombinations(index)) {
            let playerSign = getPlayerSign();
            console.log(`Player with sign: ${playerSign} wins!`);
            gamePlaying = false;
        }
        round++;
    };

    const resetGame = () => {
        gamePlaying = true;
        gameboard.resetBoard();
    }

    const setSigns = (sign1, sign2) => {
        playerOne.setSign(sign1);
        playerTwo.setSign(sign2);
    }

    const getPlayerSign = ()=>{
        return round % 2 === 1 ? playerOne.getSign() : playerTwo.getSign();
    }

    const getGamePlaying = () => {
        return gamePlaying;
    }

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinCombinations = (index) => {
        let winConsWithSameIdx = winConditions.filter( (c) => c.includes(index));
        return winConsWithSameIdx.some( (combination) => {
            let outcome = true;
            combination.forEach((num) => {
                if (gameboard.getField(num) !== getPlayerSign()){
                    outcome = false;
                }
            })
            return outcome;
        })
    }

    return {
        playRound, getGamePlaying, setSigns, resetGame
    }
})()

const displayController = (() => {
    let gTiles = document.querySelectorAll(".gameTile");
    let startBtn = document.getElementById("start-game-btn");
    let resetBtn = document.getElementById("reset-game-btn");

    startBtn.addEventListener("click", () => {
        let sign1 = document.getElementById("sign-1").value;
        let sign2 = document.getElementById("sign-2").value;
        gameController.setSigns(sign1, sign2);

        let gbWrapper = document.querySelector(".gameboard-wrapper");
        gbWrapper.style.display = "grid";
        startBtn.style.display = "none";
        resetBtn.style.display = "block";
    })

    resetBtn.addEventListener("click", () => {
        let sign1 = document.getElementById("sign-1").value;
        let sign2 = document.getElementById("sign-2").value;
        gameController.setSigns(sign1, sign2);
        gameController.resetGame();
        updateGameboard();
    })

    gTiles.forEach((tile) => {
        tile.addEventListener("click", (e) => {
            if (!gameController.getGamePlaying() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.getAttribute("idx")));
            updateGameboard();
        })
    })

    const updateGameboard = () => {
        for (let i = 0; i < gTiles.length; i++) {
            gTiles[i].textContent = gameboard.getField(i);
        }
    };

    return {}
})()
