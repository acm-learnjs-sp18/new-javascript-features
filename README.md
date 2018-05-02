# Session 2: New JavaScript Features and Syntax (ES6+)

## Essential Links

Slides: *will be up soon*

## The Project

**Check out the [final result][final]!**

![final pic][final-pic]

This week, we will be making a tic-tac-toe game with the JavaScript syntax we
just learned. We will be starting from the code in the `starter` directory.

Unlike last week, we will be splitting the entire project into several
"stages". After each stage we will be able to check if the code we just wrote
works or not.

### Stage 1: Getting Started

In this stage, we will be setting up some groundwork for later. It doesn't
really have an immediate effect on the page.

1. Start by opening the `main.js` file in the `starter` directory. This is
   where all of our work on the website will happen. Also, make sure to have
   `index.html` open in Google Chrome, and press Ctrl-Shift-I to open up
   DevTools. Right now the page should only have a single "Replay" button.

   ![where everything begins][starter]

2. We are going to create a constructor for the `GameBoard` class. Find the
   line where it says

   ```js
   // TODO: constructor(boardElement, statElement, replayButton)
   ```

   (It should be one of the first lines in the file, right under `class GameBoard`.)

   Replace that line with

   ```js
   constructor(boardElement, statElement, replayButton) {
     super(boardElement);

     this.statElement = new VisualElement(statElement);
   }
   ```

   The end result should look like

   ![stage-1-1][]

3. Refresh the page in Chrome. Make sure that we didn't break anything. If you
   see the following in the top-right corner of DevTools, then it is possible
   that you accidentally mistyped something.

   ![error][]

Yay! That's it for stage 1.

### Stage 2: Creating Tic-Tac-Toe Tiles

Now we need to create the playing tiles for the game.

1. Create a `Tile` class to represent each single tile.

   Find the line

   ```js
   // TODO: Tile class
   ```

   Replace that line with

   ```js
   class Tile extends VisualElement {
   }
   ```

2. Add a constructor for `Tile` class. Between the braces for `class Tile`, add
   the following:

   ```js
   constructor(tileElement, gameBoard) {
     super(tileElement);

     this.gameBoard = gameBoard;

     this.clickedBy = undefined;
   }
   ```

   `clickedBy` represents to which player this tile belongs to. Right now, no
   one has clicked on this tile yet, so the property is `undefined`.

   ----

   By this time, the code for `Tile` class should look like

   ![stage-2-1][]

3. Now, with the `Tile` class ready, we need to actually create tiles in the
   game board. Let's switch our attention back to `GameBoard` class.

   Create an array called `this.tiles` in `GameBoard`'s constructor, beneath
   `this.statElement`:

   ```js
   this.tiles = [];
   ```

   We will keep track of the nine `Tile`s belonging to the `GameBoard` through
   this array.

4. Now, after `this.tiles`, create a `for`-loop that runs nine times, each time
   to create a new tile.

   ```js
   for (let i = 0; i < 9; i++) {

   }
   ```

5. Inside the body of the loop we just created, put the following:

   ```js
   const tileElement = document.createElement("div");

   const tile = new Tile(tileElement, this);

   this.tiles.push(tile);

   this.insertVisualElement(tile);
   ```

   We first create an HTML `div` element representing a single tile, and put
   that into the `tileElement` variable. You don't really have to worry about
   what this means (but if you want to, come to our Hackschool event during
   Fall quarter!), only that this allows the tile to be displayed on the web
   page.

   We then create a `Tile` object for that tile, passing in the element we just
   created.

   We "push" the newly created `Tile` object into the `this.tiles` array we
   just made.

   Finally, we insert this `Tile` object into "this" game board. Remember? Our
   `Tile` class inherits from `VisualElement`. That's why `tile` is also a
   `VisualElement` object, and we can use `insertVisualElement` function.

   ----

   Now, your code for `GameBoard` should be roughly like

   ![stage-2-2][]

   And if you refresh the web page in Chrome, we should see the nine orange
   tiles!

   ![stage-2][]

### Stage 3: Making the Tiles Clickable

Now that we've created the tiles on the page, we need to find a way to make the
players be able to select the tile. But before we do that, we have to keep
track of whose turn it is first.

1. Go to `GameBoard`'s constructor. Let's create a new instance variable called
   `turn`, which represents whose turn it currently is.

   At the end of the constructor function, add the following line:

   ```js
   this.turn = "O";
   ```

   (We are making O always go first.)

2. We will then create a new method for the `GameBoard` class called
   `updateTurn`. This method is going to be called every time a user clicks a
   tile, and we need to update whose turn it is.

   Find the line

   ```js
   // TODO: updateTurn()
   ```

   in that's right beneath the constructor for `GameBoard`, and replace it with

   ```js
   updateTurn() {
     if (this.turn === "O") {
       this.turn = "X";
     } else {
       this.turn = "O";
     }
   }
   ```

   The logic here is that we check if the current player is O, and if so change
   it to X. Otherwise, change it back to O.

   ----

   After these changes, `GameBoard` should now look like

   ![stage-3-1][]

3. We are now ready to finally define what happens when a user clicks a tile.
   Let's go to `Tile` class. After the constructor (but before the ending brace
   of the class), we create a new method `whenClicked` with the following
   content:

   ```js
   whenClicked() {
     if (this.clickedBy === undefined) {
       const player = this.gameBoard.turn;

       this.clickedBy = player;
       this.setText(player);

       this.gameBoard.updateTurn();
     }
   }
   ```

   The method itself is a bit longer than usual, but once you get it it will
   seem pretty straightforward.

   We first check if this tile has already been claimed, and only proceed if it
   hasn't using an `if`-statement (`this.clickedBy` is `undefined`).

   We then check to see whose turn it is using the `this.gameBoard.turn`
   property. This allows us to determine which player clicked the tile.

   We record that this tile has been clicked by `player` with the
   `this.clickedBy` property. We also set the text inside this tile to the
   player.

   Finally, we ask the game board to switch to the next turn, using the
   `updateTurn` function we just created.

   And that's it!

   Note: Ordinarily, we would need to hook up this function with the browser,
   so that it's called whenever the tile is clicked. However, for this project,
   this task is automatically done by the `VisualElement` we provided so you
   don't have to deal with it yourself. This is one of the perks provided by
   JavaScript inheritance.

   ----

   Make sure your `Tile` class looks like the following:

   ![stage-3-2][]

With this done, we should now be able to click on the tiles to claim a specific
box. Not only that, successive clicks should automatically switch the player.
This is how the web page looks like after I click on two tiles:

![stage-3][]

### Stage 4: Check and Announce Winners

We are almost done with making a fully functional game, but we are still
missing a crucial component: we should detect who won the game!

1. In the `GameBoard` class, you might notice the `checkWinner` method we
   provided. This method checks who won the game (if any), and returns the
   player who did (or `undefined` if no one has yet).

   We are going to use this method in the `updateTurn` method we created
   earlier. Change `updateTurn`, so that it is of the form:

   ```js
   const winner = this.checkWinner();

   if (winner !== undefined) {
     this.turn = undefined;

     this.statElement.setText(winner + " won!");
   } else {

     // Put existing code in updateTurn here

   }
   ```

   Note: you need to put the code that was there before in the `else`-clause,
   like this:

   ![stage-4-1][]

   Let me explain what's going on here.

   We first find out if there is a winner. If there is (`winner !==
   undefined`), we set `this.turn` to `undefined` to signify that the game has
   ended – and it is now no one's turn. Then, we set the text inside
   `this.statElement` to <code><var>player</var> won!</code>, so that it is
   displayed on the web page.

   Only if there isn't yet a winner, do we switch the player's turns, which was
   what the original code did.

2. We are so close to being done! Before we get too excited, there is one more
   thing we need to fix. Right now, even after the game has ended, a player can
   still click on tiles. We need to update the `whenClicked` function in
   `Tile`.

   Change this line

   ```js
   if (this.clickedBy === undefined) {
   ```

   to

   ```js
   if (this.clickedBy === undefined && this.gameBoard.turn !== undefined) {
   ```

By now, the game should be working! Try playing it against yourself, and make
sure the "O won!" (or "X won!") message is shown.

### Stage 5: Make the Replay Button Work

There is one issue with the game as it currently is: the big orange Replay
button doesn't quite work yet. Let's make it work.

1. Conceptually, the Replay button represents another kind of `VisualElement`.
   Let's create another class `ReplayButton` that inherits from `VisualElement`
   to represent it.

   Find the line

   ```js
   // TODO: ReplayButton class
   ```

   Replace the line with

   ```js
   class ReplayButton extends VisualElement {
     constructor(replayElement, gameBoard) {
       super(replayElement);

       this.gameBoard = gameBoard;
     }
   }
   ```

   Looks familiar? That's because this is pretty similar to what we had for
   `Tile` class as well.

2. Now, we want to find a way to restore the entire game board to its initial
   state. This involves doing several things, but first we want to reset the
   `this.turn` in `GameBoard` back to player O.

   In `GameBoard`, find the line

   ```js
   // TODO: reset()
   ```

   Replace it with

   ```js
   reset() {
     this.turn = "O";
   }
   ```

3. We also want to clear the message "<var>someone</var> won!"

   At the end of the `reset` method we just added, insert

   ```js
   this.statElement.setText("");
   ```

   Now, the `reset` method should look like

   ![stage-5-1][]

4. Now, we need to clear the text in each of the nine tiles. We first need to
   teach `Tile` objects how to reset themselves.

   At the end of the `Tile` class, under the existing `whenClicked` method, add
   a new `reset` method:

   ```js
   reset() {
     this.clickedBy = undefined;
     this.setText("");
   }
   ```

   The `Tile` class should now look like

   ![stage-5-2][]

5. We already have the nine `Tile` objects in `this.tiles` in `GameBoard`, so
   it's a matter of calling `reset` on those tiles. Let's use a `for`-`of` loop
   to do so.

   At the end of the `reset` method **in `GameBoard`**, add the following

   ```js
   for (const tile of this.tiles) {
     tile.reset();
   }
   ```

   Now, `GameBoard` should look like

   ![stage-5-3][]

6. Finally, we need to call `this.gameBoard.reset()` when the player clicks the
   Replay button. Add a `whenClicked` method to `ReplayButton` class:

   ```js
   whenClicked() {
     this.gameBoard.reset();
   }
   ```

   This will reset the entire game board, which will in turn reset all the
   tiles, etc.

----

And now, we are officially done!

[final]: https://acm-learnjs-sp18.github.io/new-javascript-features/final/index.html
[final-pic]: https://user-images.githubusercontent.com/1538624/39500939-dedf3f86-4d6c-11e8-9398-61314dafd2d9.png
[starter]: https://user-images.githubusercontent.com/1538624/39501451-cccaa01c-4d6f-11e8-8ebe-623da3a436f5.png
[error]: https://user-images.githubusercontent.com/1538624/39501584-a3587d16-4d70-11e8-9dad-3d8269997ff6.png
[stage-1-1]: https://user-images.githubusercontent.com/1538624/39501551-6a20b950-4d70-11e8-97de-75fb7d25d7b6.png
[stage-2-1]: https://user-images.githubusercontent.com/1538624/39502053-1b4afca2-4d73-11e8-9d33-62b8dab5c803.png
[stage-2-2]: https://user-images.githubusercontent.com/1538624/39502396-e05acda0-4d74-11e8-8275-4a3231e0d5be.png
[stage-2]: https://user-images.githubusercontent.com/1538624/39502427-122abd36-4d75-11e8-9692-9483fec881f5.png
[stage-3-1]: https://user-images.githubusercontent.com/1538624/39502878-871c5922-4d77-11e8-93c0-4ef646b37932.png
[stage-3-2]: https://user-images.githubusercontent.com/1538624/39503329-314e1d70-4d7a-11e8-9281-1108f99a3358.png
[stage-3]: https://user-images.githubusercontent.com/1538624/39503365-66a2faa4-4d7a-11e8-8414-ccb7bfcf5428.png
[stage-4-1]: https://user-images.githubusercontent.com/1538624/39503941-763ef686-4d7d-11e8-9015-0518a6edcf0f.png
[stage-5-1]: https://user-images.githubusercontent.com/1538624/39543207-70b12464-4dff-11e8-8f0d-8d60314168ca.png
[stage-5-2]: https://user-images.githubusercontent.com/1538624/39543204-70630ebe-4dff-11e8-8ca9-c1d5b9dbf8e2.png
[stage-5-3]: https://user-images.githubusercontent.com/1538624/39543206-70980cea-4dff-11e8-8f4f-a50c3b8f971b.png
