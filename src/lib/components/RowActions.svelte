<script lang="ts">
	// PROPS
	export let row, data, fn;

	// COMPONENTS
	import EditTab from "./EditTab.svelte";
</script>

<EditTab {data} {fn} {row} />
