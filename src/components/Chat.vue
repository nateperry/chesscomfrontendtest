<script setup>
    import {ref, onUpdated} from 'vue'
    import {gameState} from '../models/GameState';
    import {SYSTEM} from '../constants';

    function data() {
      return {gameState};
    }

    const input = ref(null);
    const chatBox = ref(null);

    onUpdated(() => {
      // scroll to see newest messages
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    })

    const onKeypress = (e) => {
      if (e.charCode === 13) { // ENTER key
        gameState.sendMessage(input.value.value, gameState.players.white.name);
        input.value.value = '';
      }
    }
</script>

<template>
    <div class="chat">
        <h3>Chat</h3>
        <div class="chat-messages" ref="chatBox">
            <div v-for="{msg, author} in gameState.chatMessages" class="chat-message">
                <span class="author" v-if="author !== SYSTEM">{{author}}:</span>
                <span :class="{'system-msg': author === SYSTEM}">{{msg}}</span>
            </div>
        </div>
        <textarea rows="4" placeholder="Send a message..." @keypress="onKeypress" ref="input"></textarea>
    </div>
</template>

<style lang="scss" scoped>
    @import '../styles/breakpoints';

    .chat {
        h3 {
            padding: 12px;
            margin: 0;
        }
    }

    textarea {
        background: var(--menuBackgroundAltColor);
        border-top: 1px solid  var(--menuBackgroundColor);
        border-radius: var(--siteBorderRadius);
        color: var(--sitePrimaryTextColor);
        display: block;
        padding: 4px 8px;
        resize: none;
        width: 100%;
    }

    .chat-messages {
        background:  var(--menuBackgroundAltColor);;
        border-bottom: 1px solid  var(--menuBackgroundAltColor);
        border-top: 1px solid  var(--menuBackgroundAltColor);
        height: 25vh;
        max-height: 450px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .chat-message {
        padding: 4px 4px 8px;
        overflow-wrap: break-word;
        line-height: 1.3em;

        .system-msg {
            color: var(--siteSystemColor);
        }
    }

    .author {
        opacity: 0.8;
        margin-right: 10px;
    }
</style>