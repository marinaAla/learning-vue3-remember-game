// import {ref} from 'vue';
// import { FIELD, GAME_STATUS } from '@/constants';
// import {computed} from 'vue';

import { FIELD, GAME_SPEED, GAME_STATUS, START_LEVEL } from "@/constants";
import { nextTick, computed } from "vue";

export default function useGameProcess(fields, gameStatus, level, start) {
    
    const selectField = (id) => {
        const index = fields.value.findIndex((field) => {
            return field.id === id;
        })

        if (index > -1 && !fields.value[index].clicked) {
            fields.value[index].clicked = true;

            checkGame();
        }
    }

    const checkGame = () => {
        const errorIndex = fields.value.findIndex(field => {
            return field.clicked && field.value === FIELD.EMPTY
        })

        console.log(errorIndex);

        if (errorIndex > -1) {
            setGameOver();
            return;
        }
    
        const notFoundItemIndex = fields.value.findIndex(field => {
            return !field.clicked && field.value === FIELD.FILLED
        })
    
        console.log(notFoundItemIndex);

        if (notFoundItemIndex === -1) {
            setGameWin();
        }
    }

    const setGameOver = () => {
        gameStatus.value = GAME_STATUS.FAIL;
        level.value = START_LEVEL;
    }

    const setGameWin = () => {
        gameStatus.value = GAME_STATUS.WIN
        // console.log(level)
        setTimeout(async () => {
            level.value += 1;

            await nextTick();

            start();

        }, GAME_SPEED)
    }

    const isWin = computed(() => {
        return gameStatus.value === GAME_STATUS.WIN;
    })

    const isFail = computed(() => {
        return gameStatus.value === GAME_STATUS.FAIL;
    })

    return {
        selectField,
        isWin,
        isFail
    }
}