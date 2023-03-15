<script setup>
  import {gameState} from "../models/GameState";

  defineProps({
    player: Object,
    white: Boolean
  })

  function data() {
    return {gameState};
  }
</script>

<template>
    <div class="game-clock"
         :class="{
            [player.color]: true,
            'current-player': player === gameState.currentPlayerTurn && !gameState.gameCompleted
        }">
        0:{{player.timeRemaining < 10 ? '0' + player.timeRemaining : player.timeRemaining}}
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/breakpoints';

    .game-clock {
        background: var(--gameClockBlack);
        border-radius: var(--siteBorderRadius);
        color: var(--gameClockWhite);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        margin-left: auto;
        line-height: 2em;
        padding: 0 4px;
        text-align: right;
        width: 70px;

        @include breakpoint-tablet {
            font-size: 20px;
            padding: 0 12px;
            width: 110px;
        }

        &.white {
            background: var(--gameClockWhite);
            color: var(--gameClockBlack);
        }

        &:before {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            content: '';
            display: inline-block;
            height: 20px;
            width: 20px;
            vertical-align: middle;

            @include breakpoint-tablet {
                height: 30px;
                width: 30px;
            }
        }

        &.current-player:before {
            background-image: url(../assets/timer.png);
            animation-name: clock-spin;
            animation-duration: 4s;
            animation-timing-function: steps(5, start);
            animation-iteration-count: infinite;
            animation-fill-mode: forwards;
        }

        @keyframes clock-spin {
            0% {
                transform: rotateZ(0deg);
            }
            25% {
                transform: rotateZ(90deg);
            }
            50% {
                transform: rotateZ(180deg);
            }
            75% {
                transform: rotateZ(270deg);
            }
            100% {
                transform: rotateZ(360deg);
            }
        }
    }
</style>