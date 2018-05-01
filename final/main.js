// We provided you all with a class called VisualElement that is loaded
// automatically.

"use strict";

class GameBoard extends VisualElement {
  constructor(boardElement, statElement, replayButton) {
    super(boardElement);

    this.statElement = new VisualElement(statElement);
    this.replayButton = new ReplayButton(replayButton, this);

    // O always goes first.
    this.turn = "O";

    // We first start with 0 tiles.
    this.tiles = [];

    // Create 9 tiles.
    for (let i = 0; i < 9; i++) {
      const newElement = document.createElement("div");
      const tile = new Tile(newElement, this);

      this.tiles.push(tile);
      this.insertVisualElement(tile);
    }
  }

  updateTurn() {
    // Do we have a winner yet? Drum roll...
    const winner = this.checkWinner();

    if (winner !== undefined) {
      // We do! Announce the winner.
      this.turn = undefined;
      this.statElement.setText(winner + " won!");
      return;
    }

    // Flip the turns. If it's currently O's turn, make it X's, and vice versa.
    if (this.turn === "O") {
      this.turn = "X";
    } else {
      this.turn = "O";
    }
  }

  reset() {
    // O always goes firt
    this.turn = "O";
    this.statElement.setText("");
    for (const tile of this.tiles) {
      tile.reset();
    }
  }

  // BOILERPLATE
  checkWinner() {
    const waysOfWinning = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [a, b, c] of waysOfWinning) {
      if (this.tiles[a].clickedBy !== undefined &&
          this.tiles[a].clickedBy === this.tiles[b].clickedBy &&
          this.tiles[a].clickedBy === this.tiles[c].clickedBy) {
        // Someone won!
        return this.tiles[a].clickedBy;
      }
    }
  }
}

class Tile extends VisualElement {
  constructor(tileElement, gameBoard) {
    super(tileElement);

    // Storing the gameBoard so we can access it later.
    this.gameBoard = gameBoard;

    // This tile hasn't been clicked by anyone yet.
    this.clickedBy = undefined;
  }

  whenClicked() {
    // Someone just clicked this tile.

    // Only continue if no one has already clicked this tile, and the game is
    // still on. We don't want the user to claim this tile after it has been
    // claimed already, or after the game has ended!
    if (this.clickedBy === undefined && this.gameBoard.turn !== undefined) {
      // Let's see who picked this.
      const clicker = this.gameBoard.turn;

      // Then, set the text to reflect this has been clicked.
      this.setText(clicker);
      this.clickedBy = clicker;

      // Next turn!
      this.gameBoard.updateTurn();
    }
  }

  reset() {
    this.clickedBy = undefined;
    this.setText("");
  }
}

class ReplayButton extends VisualElement {
  constructor(replayElement, gameBoard) {
    super(replayElement);

    this.gameBoard = gameBoard;
  }

  whenClicked() {
    this.gameBoard.reset();
  }
}

// ********** BOILERPLATE **********

const gb = new GameBoard(document.getElementById("game-board"),
                         document.getElementById("stats"),
                         document.getElementById("replay"));
