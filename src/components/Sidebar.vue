<script setup>
  import { ref, onMounted } from 'vue'
  import MoveList from './MoveList.vue'
  import Chat from './Chat.vue'
  import {gameState} from '../models/GameState';
</script>

<template>
    <div class="sidebar">
        <MoveList />
        <Chat />
        <div class="game-actions" v-if="gameState.gameStarted">
            <button  @click="gameState.offerDraw()">Offer Draw</button>
            <button  @click="gameState.resignGame()">Resign</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/breakpoints';

    .sidebar {
        background: var(--menuBackgroundColor);
        border-radius: var(--siteBorderRadius);
        grid-column: sidebar;
        grid-row: sidebar;
        grid-area: sidebar;

        @include breakpoint-mobile {
            min-height: 96vh;
        }
    }

    .game-actions {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        padding: 12px;

        button {
            background: var(--siteBackground);
            color: var(--sitePrimaryTextColor);
            cursor: pointer;
            border: none;
            border-radius: var(--siteBorderRadius);
            font-size: 14px;
            font-weight: 600;
            padding: 12px 12px;
            margin: 0 0 8px;
            width: 100%;

            &:hover,
            &:focus {
                background: var(--siteLightGrey);
            }
        }
    }
</style>
