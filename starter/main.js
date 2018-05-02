"use strict";

class GameBoard extends VisualElement {
  // TODO: constructor(boardElement, statElement, replayButton)

  // TODO: updateTurn()

  // TODO: reset()

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

// TODO: Tile class

// TODO: ReplayButton class







// ********** BOILERPLATE **********

const gb = new GameBoard(document.getElementById("game-board"),
                         document.getElementById("stats"),
                         document.getElementById("replay"));
