import { onBeforeMount, ref, watch } from 'vue';
import { FIELD, MAX_LEVEL, START_LEVEL } from '@/constants';

export default function useGameInit(number) {
	let level = ref(START_LEVEL);
	let fields = ref([]);

	const init = () => {
		fields.value = [];

		for (let i = 0; i < number; i++) {
			fields.value.push({
				id: i,
				clicked: false,
				value: FIELD.EMPTY,
			});
		}
	};

    watch(level, (newLevel) => {
        if (newLevel > MAX_LEVEL) {
            level.value = MAX_LEVEL;
        }
    })

	onBeforeMount(init);

	return {
		level,
		fields,
		init,
	};
}
