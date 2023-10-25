<template>
    <div class="board">
        <div class="board__list">
            <BoardItem 
                v-for="field in fields" 
                :field="field" 
                :status="gameStatus" 
                :key="`item-${field.id + 1}`"
                @select-field="selectField" 
            />
        </div>
        <p class="level">Level: <strong>{{ level }}</strong></p>
        <p v-if="isWin" class="win">Congratulations! Keep playing!</p>
        <p v-if="isFail" class="fail">You've failed! Try again!</p>
        <button class="btn" @click="start" :disabled="!canStartGame">Start</button>
    </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue';
import useGameInit from '@/hooks/useGameInit';
import useGameStart from '@/hooks/useGameStart';
import { GAME_STATUS } from '@/constants';
import {ref} from 'vue';
import useGameProcess from '@/hooks/useGameProcess';

export default {
  components: {
    BoardItem
  },
  methods: {
  },
  setup() {
    const number = 25;
    const gameStatus = ref(GAME_STATUS.NONE);

    const {level, fields, init} = useGameInit(number);
    const {start, canStartGame} = useGameStart(init, fields, number, level, gameStatus);
    const {selectField, isWin, isFail} = useGameProcess(fields, gameStatus, level, start);

    return {
        level,
        fields,
        init,
        start,
        gameStatus,
        canStartGame,
        selectField,
        isWin,
        isFail
    }
  },
  
}
</script>

<style scoped>
    .board__list {
        display: flex;
        width: 100%;
        max-width: 310px;
        margin: 0 auto;
        padding: 10px;
        gap: 10px;

        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        background: #eee;
    }

    .btn {
        margin-top: 10px;
        padding: 10px 30px;
        border: none;
        border-radius: 2px;

        background-color: #42b983cc;

        color: white;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;

        cursor: pointer;
        outline: none;

        transition: background-color 0.25s;
    }

    .btn:hover {
        background-color: #42b983;
    }

    .btn:disabled {
        opacity: 0.5;

        cursor: default;
    }

    .btn:disabled:hover {
        background-color: #42b983cc;
    }

    .win {
        color: #42b983;
    }

    .fail {
        color: #ff000066;
    }
</style>