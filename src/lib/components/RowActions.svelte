<script lang="ts">
	import { editTab, tabInfo } from "$lib/stores/actions";
	import Button from "./ui/button/button.svelte";
	import { Pencil1 } from "svelte-radix";

	export let row;

	let info: string[] = [];

	const editButton = () => {
		editTab.set(true);

		for (let i = 0; i < row.length - 1; i++) {
			info.push(row[i].getValue());
		}

		tabInfo.set(info);
	};
</script>

<div class="flex justify-end gap-3">
	<Button variant="ghost" size="icon" on:click={editButton}>
		<Pencil1 class="h-5 w-5" />
	</Button>
</div>
