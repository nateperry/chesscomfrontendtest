<script setup>
  import {gameState} from '../models/GameState';
  import {COORDINATE_CHARS,COORDINATE_NUMS} from '../constants.js'

  function data() {
    return {gameState};
  }

  function isBoardFlipped() {
    return gameState.isBoardFlippedXOR();
  }
</script>

<template>
    <div class="x-coordinates"
         :class="{
            'flipped' : isBoardFlipped(),
         }">
        <span class="coordinate" v-for="char in COORDINATE_CHARS">{{char}}</span>
    </div>
    <div class="y-coordinates"
         :class="{
            'flipped' : isBoardFlipped(),
         }">
        <span class="coordinate" v-for="n in COORDINATE_NUMS">{{n}}</span>
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/breakpoints';

    $coordinate-padding: 4px;

    .coordinate {
        color: var(--theme-LightSQColor);
        font-size: .75rem;
        font-weight: 600;
        pointer-events: none;
        padding: 4px;
        height: 12.5%;
        user-select: none;

        &:nth-child(even) {
            color: var(--theme-DarkSQColor);
        }

        .flipped & {
            color: var(--theme-DarkSQColor);
            &:nth-child(even) {
                color: var(--theme-LightSQColor);
            }
        }

        @include breakpoint-mobile {
            font-size: 1rem;
        }
    }

    .x-coordinates,
    .y-coordinates {
        display: flex;
        position: absolute;
        pointer-events: none;
    }

    .x-coordinates {
        bottom: 0;
        flex-direction: row;
        height: auto;
        text-align: right;
        width: 100%;

        .coordinate {
            width: 12.5%;
        }

        &.flipped {
            flex-direction: row-reverse;
        }
    }

    .y-coordinates {
        flex-direction: column-reverse;
        height: 100%;
        top: 0;

        .coordinate {
            height: 100%;
        }

        &.flipped {
            flex-direction: column;
        }
    }
</style>