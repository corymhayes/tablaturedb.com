<script lang="ts">
	import { tabInfo } from "$lib/stores/actions";
	import EditTab from "./EditTab.svelte";
	import Button from "./ui/button/button.svelte";
	import { Pencil1 } from "svelte-radix";

	export let row, data, fn;

	// let info: string[] = [];

	// const editButton = () => {
	// 	for (let i = 0; i < row.length - 1; i++) {
	// 		info.push(row[i].getValue());
	// 	}

	// 	tabInfo.set(info);
	// };
</script>

<EditTab {data} {fn} {row} />
<!-- <div class="flex justify-end gap-3">
	<Button variant="ghost" size="icon" on:click={editButton}>
		<Pencil1 class="h-5 w-5" />
	</Button>
</div> -->
