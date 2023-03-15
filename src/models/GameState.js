import {reactive} from 'vue'
import {
  mapSquareNumToPGN,
  TIME_CONTROL,
  WIN_CONDITION_RESIGNATION,
  WIN_CONDITION_TIMEOUT,
  WIN_CONDITION_DRAW,
  SYSTEM
} from '../constants.js';
import {WIN_CONDITION_CHECKMATE} from "../constants";

export const gameState = reactive({
  // Click Square Order, displayed as 'moves'
  clickedSquares: [],

  // Square Highlighting
  highlightedSquares: {},
  highlightSquare(x, y) {
    if (this.gameCompleted) {
      // do nothing
      return;
    }

    // track the clicked squares
    this.clickedSquares.push(mapSquareNumToPGN(x, y));

    // toggles highlighted squares by coordinate
    const coordStr = `${x}${y}`;
    if (this.highlightedSquares[coordStr]) {
      delete this.highlightedSquares[coordStr];
      return;
    }

    // create an instance of the square
    this.highlightedSquares[coordStr] = {
      coord: coordStr,
      darkSquare: ((x + y) % 2) === 0,
    };

    // update current player turn
    this.endTurn();
  },

  // Game Completion
  gameStarted: false,
  gameCompleted: false,

  // Send a GooDGame

  // Player Avatar
  players: {
    white: {
      currentUser: true,
      color: 'white',
      avatar: 'chess-pawn.png',
      name: 'Chess.com Interviewer',
      elo: 1600,
      timeRemaining: TIME_CONTROL
    },
    black: {
      avatar: 'nperry_photo.png',
      color: 'black',
      name: 'Nate-Bot',
      elo: 3900,
      timeRemaining: TIME_CONTROL
    }
  },

  // Turn Order
  currentPlayerTurn: null,
  endTurn() {
    this.currentPlayerTurn = this.getNextPlayer();
    this.startGameClock();
  },
  getNextPlayer() {
    // return the player who's turn is next
    return !this.currentPlayerTurn || this.currentPlayerTurn === this.players.white
      ? this.players.black : this.players.white
  },

  // Game Clock
  _clockInterval: null,
  startGameClock() {
    if (this._clockInterval) return;

    this.sendMessage('Game Started', SYSTEM);
    this.sendMessage(`${this.players.white.name} (${this.players.white.elo})` +
      ` vs. ${this.players.black.name} (${this.players.black.elo}) - Good luck!`, SYSTEM);

    this.gameStarted = true;
    this._clockInterval = setInterval(() => {
      this.currentPlayerTurn.timeRemaining--;
      if (this.currentPlayerTurn.timeRemaining <= 0) {
        // player has timedout
        this.currentPlayerTurn.timeRemaining = 0;
        clearInterval(this._clockInterval);
        this.endGame(this.getNextPlayer(), WIN_CONDITION_TIMEOUT);
      }
    }, 1000);
  },

  // Game Completion
  _winner: null,
  _winCondition: null,
  gameResults() {
    return {
      winner: this._winner,
      winCondition: this._winCondition,
    }
  },
  endGame(winner, winCondition) {
    if (this.gameCompleted) {
      // the game was already completed, do nothing
      return;
    }
    this._winner = winner;
    this._winCondition = winCondition;
    this.gameStarted = false;
    this.gameCompleted = true;
    clearInterval(this._clockInterval);
    this._clockInterval = null;

    this.sendMessage(`Game Over - ${winner ? winner.color + ' won' : 'Drawn by Agreement'}`, SYSTEM);
    if (winner === this.players.black) {
      this.sendMessage('Woohoo - what a game! GG!', this.players.black.name)
    } else if (winner === null) {
      this.sendMessage('Alright, I\'ll accept your draw.', this.players.black.name);
    } else {
      this.sendMessage('Aww man, I hate losing. GG!', this.players.black.name);
    }
    this.sendMessage('Thank you for checking out my submission, I hope you enjoyed it.'+
      'I look forward to hearing from you about next steps!', this.players.black.name);
  },

  // Checkmate
  checkmate(winner) {
    this.endGame(winner, WIN_CONDITION_CHECKMATE);
    const lastMove = this.clickedSquares[this.clickedSquares.length - 1];
    this.clickedSquares[this.clickedSquares.length - 1] = lastMove + '#';
  },

  // Resign
  resignGame() {
    this.endGame(this.players.black, WIN_CONDITION_RESIGNATION);
  },

  // Draw
  offerDraw() {
    this.endGame(null, WIN_CONDITION_DRAW)
  },

  // Rematch
  startRematch() {
    this.gameStarted = true;
    this.gameCompleted = false;
    this.clickedSquares = [];
    this.highlightedSquares = {};
    this.currentPlayerTurn = this.players.white;
    this.players.white.timeRemaining = TIME_CONTROL;
    this.players.black.timeRemaining = TIME_CONTROL;
    this.sendMessage('You want a rematch, huh? Okay, let\'s do it!', this.players.black.name);
    this.startGameClock();
  },

  // Board Flip
  boardFlipped: false, // `flipped` defines the resting state
  boardFlipping: false, // `flipping` true during the period of time alotted for animations
  _flippingTimeout: null, // tracks flip animation timing
  isBoardFlippedXOR: () => {
    // XOR the flip state for components which `flip` immediately
    return gameState.boardFlipped && gameState.boardFlipping ? false :
      gameState.boardFlipping || gameState.boardFlipped
  },
  flipBoard() {
    if (this._flippingTimeout !== null) {
      return;
    }
    const state = !this.boardFlipped;
    this.boardFlipping = true;
    this._flippingTimeout = setTimeout(() => {
      this.boardFlipped = state;
      this.boardFlipping = false;
      this._flippingTimeout = null;
    }, 1200);
  },

  // In Game Chat
  chatMessages: [
    {author: SYSTEM, msg: 'Welcome to Nate Perry\'s submission app. Click a square on the board to start the game.'},
    {author: SYSTEM, msg: 'You are playing as White.'}
  ],
  sendMessage(msg, author) {
    this.chatMessages.push({msg, author})
  }
})