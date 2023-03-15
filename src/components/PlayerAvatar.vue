<script setup>
  defineProps({
    player: Object,
    large: Boolean
  })
</script>

<template>
    <img class="player-avatar" :class="{'size-lg': large}" :src="player.avatar" :alt="player.name"/>
</template>

<style lang="scss" scoped>
    .player-avatar {
        background-color: var(--menuBackgroundColor);
        border-radius: var(--siteBorderRadius);
        height: 40px;
        width: 40px;

        &.size-lg {
            height: 70px;
            width: 70px;
        }
    }
</style>