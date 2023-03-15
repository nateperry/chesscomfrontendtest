<script setup>
    import {computed} from 'vue'
    import {gameState} from '../models/GameState';

    import PlayerAvatar from './PlayerAvatar.vue'
    import {WIN_CONDITION_DRAW} from '../constants';

    function data() {
      return {gameState};
    }

    const gameResults = computed(() => {
      const {
        winner, // instance of a Player
        winCondition
      } = gameState.gameResults();

      const isDraw = winCondition === WIN_CONDITION_DRAW;
      const currentUserWon = winner && !!winner.currentUser;
      const winnerName = currentUserWon ? 'You' : winner && winner.name || '';
      return {
        winner,
        winCondition,
        currentUserWon,
        winnerName,
        gameScore: isDraw ? '1/2 - 1/2' : currentUserWon ? '1 - 0' : '0 - 1'
      }
    })
</script>

<template>
    <div class="game-end-modal" :class="{'user-won': gameResults.currentUserWon}">
        <h3 v-if="gameResults.winCondition === WIN_CONDITION_DRAW">Game Drawn</h3>
        <h3 v-else-if="gameResults.currentUserWon">You Won!</h3>
        <h3 v-else>{{gameResults.winner.color}} Wins</h3>

        <h6 v-if="gameResults.winCondition === WIN_CONDITION_DRAW">Game Drawn by Agreement</h6>
        <h6 v-else>{{gameResults.winnerName}} won by {{gameResults.winCondition}}</h6>

        <div class="players">
            <PlayerAvatar
                :player="gameState.players.white"
                :large="true"
                :class="{'winner': gameResults.winner === gameState.players.white}"
            />
            <span class="game-score">{{gameResults.gameScore}}</span>
            <PlayerAvatar
                :player="gameState.players.black"
                :large="true"
                :class="{'winner': gameResults.winner === gameState.players.black}"
            />
        </div>

        <div class="quick-analysis">
            <span class="mistakes" :data-value="Math.floor(Math.random() * 8)">Mistakes</span>
            <span class="blunders" :data-value="Math.floor(Math.random() * 3)">Blunders</span>
            <span class="missed-wins" :data-value="Math.floor(Math.random() * 7)">Missed Wins</span>
        </div>

        <div class="actions">
            <button @click="gameState.startRematch()">New 30sec</button>
            <button @click="gameState.startRematch()">Rematch</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .game-end-modal {
        background: var(--menuLightBackgroundColor);
        border-radius: var(--siteBorderRadiusLg);
        box-shadow: 0 0 12px 1px var(--siteBlackShadow);
        color: var(--siteDarkTextColor);
        overflow: hidden;
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        min-height: 330px;
        min-width: 330px;
        padding: 24px;
        transform: translate(-50%, -50%);
        width: 30%;

        &:before {
            background: var(--siteLossColor);
            border-radius: 0 0 20% 20%;
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            height: 40%;
            width: 100%;
            z-index: -100;
        }

        &.user-won {
            &:before {
                background: var(--siteWinColor)
            }

        }

        h3 {
            color: var(--sitePrimaryTextColor);
            text-transform: capitalize;
            font-size: 36px;
            margin: 0 0 8px;
            text-shadow: var(--siteTextShadow);
        }

        h6 {
            color: var(--sitePrimaryTextColor);
            opacity: 0.8;
            font-size: 14px;
            font-weight: normal;
            margin: 8px 0;
            text-shadow: var(--siteTextShadow);
        }

        .players {
            display: flex;
            align-items: center;
            justify-content: space-evenly;

        }

        .game-score {
            color: var(--siteDarkTextColor);
            font-weight: 800;
        }

        .player-avatar {
            margin: 20px;

            &.winner {
                box-shadow: 0 0 0 5px var(--siteWinColor);
            }
        }

        .quick-analysis {
            display: flex;
            justify-content: space-between;
            margin: 12px 0 20px;

            .blunders,
            .mistakes,
            .missed-wins {
                &:before {
                    border-radius: var(--siteBorderRadius);
                    color: var(--sitePrimaryTextColor);
                    content: attr(data-value);
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 5px;
                    line-height: 20px;
                    text-align: center;
                    width: 20px;
                }
            }

            .blunders {
                color: var(--siteRed);
                &:before {
                    background-color: var(--siteRed);
                }
            }

            .mistakes {
                color: var(--siteOrange);
                &:before {
                    background-color: var(--siteOrange);
                }
            }

            .missed-wins {
                color: var(--siteYellow);
                &:before {
                    background-color: var(--siteYellow);
                }
            }
        }

        .actions {
            display: flex;
            align-items: center;
            justify-content: space-between;

            button {
                background: var(--siteLightGrey);
                color: var(--menuBackgroundColor);
                cursor: pointer;
                border: none;
                border-radius: var(--siteBorderRadius);
                font-size: 14px;
                font-weight: 600;
                padding: 12px 12px;
                min-width: 130px;

                &:hover,
                &:focus {
                    background: grey;
                }
            }
        }
    }
</style>