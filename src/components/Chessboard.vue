<script setup>
  import {ref} from 'vue'
  import {NUM_SQUARES_ROW} from '../constants.js'
  import {gameState} from '../models/GameState'
  import ChessboardCoordinates from './ChessboardCoordinates.vue'
  import GameEndModal from './GameEndModal.vue'

  function data() {
    return {gameState};
  }

  const chessboard = ref(null);

  function onBoardClicked(e) {
    e.preventDefault();
    const {squareX, squareY} = getSquareFromClick(e);
    gameState.highlightSquare(squareX, squareY);
  }

  // determines which square was clicked based on the click coordinates
  function getSquareFromClick(e) {
    const rect = chessboard.value.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const squareSize = rect.width / NUM_SQUARES_ROW;

    let squareX = ((x - (x % squareSize)) / squareSize) + 1;
    let squareY = ((y - (y % squareSize)) / squareSize) + 1;

    if (gameState.isBoardFlippedXOR()) {
      squareX = Math.abs(squareX - NUM_SQUARES_ROW) + 1;
    } else {
      squareY = Math.abs(squareY - NUM_SQUARES_ROW) + 1;
    }
    return {squareX, squareY};
  }

  function onContextMenu(e) {
    // prevents right click
    e.preventDefault();
  }

</script>

<template>
    <div class="chessboard"
         @click="onBoardClicked"
         @contextmenu="onContextMenu"
         ref="chessboard">
        <ChessboardCoordinates />
        <!-- interactive squares -->
        <div class="chessboard-overlays"
             :class="{
                'flipped' : gameState.isBoardFlippedXOR(),
             }">
            <div class="highlighted-square"
                 v-for="({coord}, sq) in gameState.highlightedSquares" :key="sq"
                 :class="'square-' + coord"></div>
        </div>
    </div>
    <GameEndModal v-if="gameState.gameCompleted"/>
</template>

<style lang="scss" scoped>
    @use "sass:math";

    .chessboard {
        // Chess board image is sourced from Chess.com directly -- Thanks!
        background-image: url(https://www.chess.com/boards/blue/150.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        border-radius: var(--siteBorderRadius);
        cursor: grab;
        grid-area: chessboard;
        position: relative;
        height: var(--chessboardSize);
        width: var(--chessboardSize);
        max-width: var(--chessboardMaxSize);
        max-height: var(--chessboardMaxSize);
    }

    .highlighted-square {
        background: var(--chessboardSquareHighlightBg);
        pointer-events: none;
        position: absolute;
        left: 0;
        bottom: 0;
        height: var(--chessboardSquareSize);
        width: var(--chessboardSquareSize);
    }

    .chessboard-overlays {
        position: relative;
        width: 100%;
        height: 100%;

        &.flipped {
            transform: rotateZ(180deg);
        }
    }

    @for $x from 1 through 8 {
        @for $y from 1 through 8 {
            .square-#{$x}#{$y} {
                $xValue: 0;
                $yValue: 0;
                @if ($y >= 1) {
                    $yValue: $y;

                }
                @if ($x > 1) {
                    $xValue: $x - 1;
                }
                transform: translate(#{math.percentage($xValue)}, #{math.percentage(1 - $yValue)});
            }
        }
    }
</style>
