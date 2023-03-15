<script setup>
  import { ref, onMounted } from 'vue'
  import Chessboard from './Chessboard.vue'
  import EvaluationBar from './EvaluationBar.vue'
  import PlayerCard from './PlayerCard.vue'

  import { gameState } from "../models/GameState";

  function data() {
    return { gameState };
  }
</script>

<template>
    <div class="chessboard-layout">
        <PlayerCard :player="gameState.players.black" :top="!gameState.isBoardFlippedXOR()" />
        <PlayerCard :player="gameState.players.white" :top="gameState.isBoardFlippedXOR()" />
        <EvaluationBar />
        <Chessboard />
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/breakpoints';

    .chessboard-layout {
        position: relative;
        display: grid;
        grid-row: chessboard-layout;
        grid-column: chessboard-layout;
        grid-template-columns: 4vw var(--chessboardSize);
        grid-template-areas: ". playercard-top"
                            "evalbar chessboard"
                            ". playercard-bottom";
        grid-gap: 1vw;

        @include breakpoint-mobile {
            grid-area: chessboard-layout;
            grid-template-rows: 44px var(--chessboardSize) 44px;
            grid-template-areas: ". playercard-top"
            "evalbar chessboard"
            ". playercard-bottom";
        }

        @include breakpoint-tablet {
            grid-template-columns: none;
        }

        @include breakpoint-desktops {
            grid-template-columns: 40px calc(var(--chessboardSize) + 20px);
        }
    }
</style>
