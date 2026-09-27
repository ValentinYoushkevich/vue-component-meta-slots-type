import { defineComponent, type SlotsType } from 'vue';

export default defineComponent({
	slots: Object as SlotsType<{
		/** Main content */
		default: { foo: string };
		/** Optional header */
		header?: { n: number };
	}>,
});
