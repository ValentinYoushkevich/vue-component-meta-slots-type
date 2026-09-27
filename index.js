const path = require('node:path');
const { createChecker } = require('vue-component-meta');

const checker = createChecker(path.join(__dirname, 'tsconfig.json'), { schema: true, printer: { newLine: 1 } });
const slots = file => checker.getComponentMeta(path.join(__dirname, 'src', file)).slots;

const expected = {
	default: { type: '{ foo: string; }', kind: 'object' },
	header: { type: '{ n: number; }', kind: 'object' },
};

let failed = false;
for (const file of ['Setup.vue', 'Comp.ts']) {
	console.log(`\n${file}${file === 'Comp.ts' ? '  (slots: Object as SlotsType<...>)' : '  (defineSlots)'}`);
	for (const slot of slots(file)) {
		const actual = { type: slot.type, kind: typeof slot.schema === 'string' ? slot.schema : slot.schema.kind };
		const exp = expected[slot.name];
		const ok = actual.type === exp.type && actual.kind === exp.kind;
		failed ||= !ok;
		console.log(`  ${ok ? 'OK  ' : 'FAIL'} #${slot.name}`);
		console.log(`       expected: type ${JSON.stringify(exp.type)}, schema.kind ${JSON.stringify(exp.kind)}`);
		console.log(`       actual:   type ${JSON.stringify(actual.type)}, schema.kind ${JSON.stringify(actual.kind)}`);
	}
}
console.log(failed
	? '\nBUG: SlotsType slots are reported as the rest-argument tuple of `Slot<T>` instead of the slot props.'
	: '\nAll slots match.');
