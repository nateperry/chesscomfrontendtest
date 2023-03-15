<script setup>
    import {gameState} from "../models/GameState"

    function data() {
        return { gameState };
    }
</script>

<template>
    <div class="settings">
        <button
            @click="gameState.flipBoard()"
            :disabled="gameState.boardFlipping"
            title="Flip Board"
        ></button>
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/breakpoints';
    .settings {
        grid-row: settings;
        grid-column: settings;
        text-align: right;
        padding-right: 24px;

        @include breakpoint-mobile {
            grid-area: settings;
            padding-right: 0;
        }

        @include breakpoint-tablet {
            padding-top: 54px;
        }

        button {
            background: url(repeat.png);
            background-size: contain;
            background-position: center;
            border: 0;
            cursor: pointer;
            display: inline-block;
            height: 40px;
            text-align: center;
            transition: transform ease-in-out 200ms;
            transform: rotateZ(90deg);
            width: 38px;

            &:disabled {
                opacity: 0.4;
            }

            &:hover {
                transform: rotateZ(270deg);
            }
        }
    }
</style>