<template>
    <div class="board">
        <div class="board__list">
            <BoardItem v-for="field in fields" :field="field"  :key="`item-${field.id + 1}`" />
        </div>

        <p class="level">Level: <strong>{{ level }}</strong></p>
        <button class="btn" @click="start">Start</button>
    </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue';
import {onBeforeMount, ref} from 'vue';

export default {
  components: {
    BoardItem
  },
  setup() {
    let level = ref(3);
    let fields = ref([]);
    const number = 25;

    const init = () => {
        fields.value = [];

        for (let i = 0; i < number; i++) {
            fields.value.push({
                id: i,
                clicked: false,
                value: 0,
            })
        }
    }

    onBeforeMount(init);

    return {
        level,
        fields,
        init,
        number
    }
  },
  methods: {
    start() {
        this.init();
        this.prepareGame();
    },

    prepareGame() {
        for (let i = 0; i < this.level; i++) {
            const index = this.rand(0, this.number - 1);

            if (this.fields[index].value !== 1) {
                this.fields[index].value = 1;
            } else {
                i--
            }
        }
    },

    rand(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  
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
</style>