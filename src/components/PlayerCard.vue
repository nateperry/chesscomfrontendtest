<script setup>
    import GameClock from './GameClock.vue'
    import PlayerAvatar from './PlayerAvatar.vue'

    defineProps({
      player: Object,
      top: Boolean
    })
</script>

<template>
    <div class="player-card" :class="{['player-card-'+ (top? 'top' : 'bottom')]: true}">
        <PlayerAvatar :player="player" />
        <div class="player-info">
            <span>{{player.name}}</span>
            <span class="player-elo">({{player.elo}})</span>
        </div>
        <GameClock :player="player"/>
    </div>
</template>

<style lang="scss" scoped>
    .player-card-top {
        grid-area: playercard-top;
    }

    .player-card-bottom {
        grid-area: playercard-bottom;
    }

    .player-card {
        display: flex;
        margin: 4px 0;
        flex-direction: row;
        max-width: var(--chessboardMaxSize);
    }

    .player-avatar {
        margin-right: 12px;
    }

    .player-info {
        display: flex;
        font-weight: 600;
        line-height: 1.2em;
    }

    .player-elo {
        color: rgba(255, 255, 255, 0.7);
        margin: 0 6px;
    }
</style>