const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getboard = () => board;
  const setmark = (index, mark) => {
    if (board[index] === "" && index >= 0 && index < 9) {
      board[index] = mark;
      return true;
    }
    return false;
  };
  const checkwinner = () => {
    let board = getboard();
    let winPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const pattern of winPattern) {
      let [a, b, c] = pattern;
      if (
        board[a] === board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  };
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const checkforemptycell = () => {
    board = getboard();
    if (board.every((item) => item !== "")) {
      return false;
    }
    return true;
  };
  const checkdraw = () => {
    if (checkwinner() === null) {
    }
  };

  return {
    getboard,
    setmark,
    checkwinner,
    reset,
    checkdraw,
    checkforemptycell,
  };
})();

Gameboard.setmark(2, "X");
Gameboard.setmark(0, "X");
Gameboard.setmark(1, "X");
console.log(Gameboard.getboard());
console.log(Gameboard.checkwinner());
Gameboard.reset();
console.log(Gameboard.getboard());
console.log(Gameboard.checkwinner());

Gameboard.setmark(0, "o");
Gameboard.setmark(1, "X");
Gameboard.setmark(2, "");
Gameboard.setmark(3, "o");
Gameboard.setmark(4, "o");
Gameboard.setmark(5, "X");
Gameboard.setmark(6, "o");
Gameboard.setmark(7, "o");
Gameboard.setmark(8, "x");
Gameboard.setmark(9, "o");
console.log(Gameboard.getboard());
console.log(Gameboard.checkforemptycell());
console.log(Gameboard.checkdraw());
console.log(Gameboard.checkwinner());
