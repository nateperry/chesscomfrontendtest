<script setup>
  import { ref, computed, onMounted, onUpdated } from 'vue'

  import {gameState} from "../models/GameState";

  function data() {
    return { gameState };
  }

  const moveList = ref(null);

  onUpdated(() => {
    // scroll to see newest messages
    moveList.value.scrollTop = moveList.value.scrollHeight;
  })

  const moveRows = computed(() => {
    const moveArr = [];
    for (let i=0; i < gameState.clickedSquares.length; i++) {
      const square = gameState.clickedSquares[i];
      if (i % 2 === 0) {
        moveArr.push([square]);
      } else {
        moveArr[moveArr.length - 1].push(square)
      }
    }
    return moveArr;
  })
</script>

<template>
    <h3>Moves</h3>
    <div class="move-list" ref="moveList">
        <div class="move-row" v-for="(row, moveOrder) in moveRows">
            <span class="move-order">{{moveOrder + 1}}.</span>
            <span class="move" v-for="move in row">{{move}}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/breakpoints';

    h3 {
        padding: 12px;
        margin: 0;
    }

    .move-list {
        background:  var(--menuBackgroundAltColor);;
        border-bottom: 1px solid  var(--menuBackgroundAltColor);
        border-top: 1px solid  var(--menuBackgroundAltColor);
        height: 30vh;
        max-height: 450px;
        overflow-y: scroll;
    }

    .move-row {
        align-items: center;
        display: flex;
        flex-direction: row;
        overflow-anchor: auto;
        padding: 4px 16px;

        &:nth-child(even) {
            background: var(--menuBackgroundColor);
        }
    }

    .move-order {
        color: grey;
        width: 2rem;
    }

    .move {
        color: white;
        width: 2rem;
    }
</style>
