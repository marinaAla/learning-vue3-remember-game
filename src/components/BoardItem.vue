<template>
    <span class="item" :class="getBoardItemExtraClasses" @click="select(field.id)"></span>
</template>

<script>
import { FIELD, GAME_STATUS } from '@/constants';
import { computed } from 'vue';

export default {
    props: {
        field: {
            type: Object,
            required: true,
        },
        status: {
            type: Number,
            required: false,
            default: GAME_STATUS.NONE
        }
    },
    setup(props) {
        // computed
        const getBoardItemExtraClasses = computed (() => {
            let extraClass = '';
            if (props.field.value === FIELD.FILLED && (props.status === GAME_STATUS.PREVIEW || props.field.clicked || props.status === GAME_STATUS.FAIL)) {
                extraClass = 'is-active';
                if (props.field.value === FIELD.FILLED && !props.field.clicked && props.status === GAME_STATUS.FAIL) {
                    extraClass += ' is-lost'
                }
            }
            else if (props.field.clicked && props.field.value === FIELD.EMPTY) {
                extraClass = 'is-errored';
            }
            
            return extraClass;
        })

        return {
            getBoardItemExtraClasses
        }
    },
    methods: {
        select(id) {
            if (this.status === GAME_STATUS.STARTED) {
                this.$emit('select-field', id);
            }
        }
    }
}

</script>

<style scoped>
    .item {
        display: block;
        width: 50px;
        height: 50px;

        position: relative;

        background: #ccc;

        cursor: pointer;

        transition: all 0.25s;
        transform-style: preserve-3d;
    }

    .item.is-active {
        background-color: #42b983cc;
        transform: rotateX(180deg);
    }

    .item.is-lost {
        opacity: 0.4;
    }

    .item.is-errored {
        background-color: #ff000055;
        transform: rotateX(180deg);
    }
</style>