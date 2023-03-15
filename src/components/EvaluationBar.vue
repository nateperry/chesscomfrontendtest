<script setup>
  import {computed} from 'vue'
  import {gameState} from '../models/GameState';

  function data() {
    return {gameState};
  }

  const evaluation = computed(() => {
    let numHighlighted = 0;
    let numLightSqaures = 0;
    let numDarkSquares = 0;
    for (let coord in gameState.highlightedSquares) {
      numHighlighted++
      if (gameState.highlightedSquares[coord].darkSquare) {
        numDarkSquares++;
      } else {
        numLightSqaures++;
      }
    }

    const defaultResult = {
      percentage: '50%',
      text: '0.0'
    }

    if (numHighlighted === 0 || numLightSqaures === numDarkSquares) {
      // game is even
       return defaultResult;
    }

    let val; // controls the height of the eval bar
    let score; // calculated score of number dark/light squares are highlighted
    let valText; // the eval text to be displayed
    let winningPlayer;
    const checkMateScore = 80;
    if (numDarkSquares > numLightSqaures) {
      // more dark squares
      score = (numDarkSquares - numLightSqaures) * 10;
      val = 50 - score;
      valText = `-${score * .1}`;
      winningPlayer = gameState.players.black
    } else {
      // more light squares
      score = (numLightSqaures - numDarkSquares) * 10;
      val = 50 + score;
      valText = `+${score* .1}`;
      winningPlayer = gameState.players.white
    }

    if (score === checkMateScore) {
      gameState.checkmate(winningPlayer);
      return {
        percentage: val > 0 ? '100%' :'0%',
        text: '#'
      }
    } else if (score >= 50) {
      valText = 'M' + ((checkMateScore - score) / 10);
    }

    if (isNaN(val)) {
      return defaultResult
    }
    // validate min and max range
    if (val > 100) {
      val = 100;
    }
    if (val < 0) {
      val = 0;
    }
    return {
      percentage: val+'%',
      text: valText
    };
  });
</script>

<template>
    <div class="evaluation-bar-container"
         :class="{
            'flipped' : gameState.boardFlipped,
            'flipping': gameState.boardFlipping
         }">
        <div class="evaluation-bar" :style="{
          height: evaluation.percentage
        }"></div>
        <span class="evaluation-text" :class="{
            'flipped' : gameState.boardFlipped,
            'flipping': gameState.boardFlipping
         }">{{evaluation.text}}</span>
    </div>
</template>

<style lang="scss" scoped>
    .evaluation-bar {
        background: var(--evalBarWColor);
        bottom: 0;
        height: 50%;
        max-height: 100%;
        position: absolute;
        transition: height 1s ease-in;
        width: 100%;
    }

    .evaluation-text {
        color: var(--siteDarkTextColor);
        font-weight: 600;
        font-size: 10px;
        text-align: center;
        display: inline-block;
        width: 100%;
        position: absolute;
        top: 50%;
        z-index: 100;

        &.flipping {
            display: none;
        }

        &.flipped {
            transform: rotateZ(180deg);
        }
    }

    .evaluation-bar-container {
        background: var(--evalBarBColor);
        border-radius: var(--siteBorderRadius);
        grid-area: evalbar;
        height: 100%;
        overflow: hidden;
        position: relative;
        transform-origin: center;
        margin-left: 23%;
        max-height: var(--chessboardMaxSize);
        max-width: 24px;
        width: 64%;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-duration: 1.2s;
        animation-timing-function: ease-in-out;

        &.flipping {
            // animate the 'flip' by shrinking, spinning, then expanding
            animation-name: flipping-animation;
        }

        &.flipped {
            transform: rotateZ(180deg) scaleY(1);

            &.flipping {;
                animation-direction: reverse;
            }
        }

        @keyframes flipping-animation {
            0% {
                transform: rotateZ(0) scaleY(1);
            }
            30% {
                transform: rotateZ(0) scaleY(.25);
            }
            70% {
                transform: rotateZ(180deg) scaleY(.25);
            }
            100% {
                transform: rotateZ(180deg) scaleY(1);
            }
        }
    }
</style>
