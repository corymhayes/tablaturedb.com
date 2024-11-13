<script lang="ts">
	import { db } from "$lib/db";
	import { liveQuery } from "dexie";
	import { Button } from "$lib/components/ui/button";
	import { CaretDown, CaretUp } from "svelte-radix";
	import * as Table from "$lib/components/ui/table";

	// sortOrder 0 = A-Z
	// sortOrder 1 = Z-A
	let sortOrder = 1;
	export let header: string;
	export let columnName;
	export let tabs;

	const changeSort = async (sortHeader: string) => {
		if (header != sortHeader) {
			header = sortHeader;
			sortOrder = 0;
		}

		if (sortOrder == 0) {
			tabs = liveQuery(() => db.tabs.orderBy(header).toArray());
			sortOrder = 1;
		} else {
			tabs = liveQuery(() => db.tabs.orderBy(header).reverse().toArray());
			sortOrder = 0;
		}
	};
</script>

<Table.Head class="pl-5">
	<Button
		variant="link"
		on:click={() => changeSort(columnName.toLocaleLowerCase())}
		class="m-0 w-full justify-start py-7 pl-0 text-muted-foreground hover:no-underline"
	>
		<div class="flex items-end gap-1">
			{columnName}
			<span>
				{#if header == columnName.toLocaleLowerCase()}
					{#if sortOrder == 0}
						<CaretUp size={16} />
					{:else}
						<CaretDown size={16} />
					{/if}
				{/if}
			</span>
		</div>
	</Button>
</Table.Head>
