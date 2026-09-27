<script setup lang="ts">
// Same slots declared with defineSlots, for comparison
defineSlots<{
	/** Main content */
	default(props: { foo: string }): any;
	/** Optional header */
	header?(props: { n: number }): any;
}>();
</script>
