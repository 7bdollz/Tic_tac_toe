let Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getboard = () => board;
  setmark = (index, mark) => {
    if (board[index] === "" && index >= 0 && index < 9) {
      board[index] = mark;
      return true;
    }
    return false;
  };
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getboard, setmark, reset };
})();

const player = (name, mark) => {
  return { name, mark };
};

const DisplayController = (() => {
  const Boarddiv = document.querySelector(".Gameboard");
  const gameStatus = document.querySelector("#statusUpdate");
  const cells = document.querySelectorAll(".grid");
  const restartbtn = document.querySelector("#restart");
  const render = () => {
    const board = Gameboard.getboard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const updateStatus = (message) => {
    gameStatus.textContent = message;
  };
  const addcellListeners = (handler) => {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        handler(cell.dataset.index);
      });
    });
  };

  const addRestartListener = (handler) => {
    restartbtn.addEventListener("click", handler);
  };
  return {
    render,
    updateStatus,
    addcellListeners,
    addRestartListener,
  };
})();

const gameController = (() => {
  const restart = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameActive = true;
    DisplayController.render();
    DisplayController.updateStatus(
      `${currentPlayer.name}'s turn (${currentPlayer.mark})`
    );
  };
  const player1 = player("player 1", "X");
  const player2 = player("player 2", "O");
  let currentPlayer = player1;
  let gameActive = true;
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  const checkWinner = () => {
    const board = Gameboard.getboard();
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkTie = () => {
    return Gameboard.getboard().every((cell) => cell !== "");
  };
  const handleMove = (index) => {
    if (!gameActive) return;
    const validMove = Gameboard.setmark(index, currentPlayer.mark);
    if (validMove) {
      DisplayController.render();
      const winner = checkWinner();
      if (winner) {
        DisplayController.updateStatus(
          `${currentPlayer.name} (${winner} wins!)`
        );
        gameActive = false;
        return;
      }
      if (checkTie()) {
        DisplayController.updateStatus(`its a tie`);
        gameActive = false;
        return;
      }
      switchPlayer();
      DisplayController.updateStatus(
        `${currentPlayer.name}'s turn (${currentPlayer.mark})`
      );
    }
  };
  const init = () => {
    DisplayController.addcellListeners(handleMove);
    DisplayController.addRestartListener(restart);
    DisplayController.render();
    DisplayController.updateStatus(
      `${currentPlayer.name}'s turn (${currentPlayer.mark})`
    );
  };
  return { init };
})();
gameController.init();
