<script lang="ts">
	// types
	import type { PageData } from "./$types";
	import type { ColumnDef, TableOptions } from "@tanstack/svelte-table";

	// packages
	import { writable } from "svelte/store";
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		renderComponent
	} from "@tanstack/svelte-table";

	// Components
	import * as Table from "$lib/components/ui/table";
	import { Button } from "$lib/components/ui/button";
	import Link from "$lib/components/Link.svelte";

	// data
	import { pb } from "$lib/pocketbase";
	import { applyAction, enhance } from "$app/forms";
	import { prototypeKeysOf } from "@arktype/util";

	export let data: PageData;

	type Tab = {
		id: string;
		song: string;
		artist: string;
		tuning: string;
		instrument: string;
		link: string;
	};

	const defaultColumns: ColumnDef<Tab>[] = [
		{
			accessorKey: "id"
		},
		{
			accessorKey: "song",
			header: "Song"
		},
		{
			accessorKey: "artist",
			header: "Artist"
		},
		{
			accessorKey: "tuning",
			header: "Tuning"
		},
		{
			accessorKey: "instrument",
			header: "Instrument"
		},
		{
			accessorKey: "link",
			header: () => "Link",
			cell: (props) => renderComponent(Link, { link: props.getValue() })
		}
	];

	const options = writable<TableOptions<Tab>>({
		data: data.records,
		columns: defaultColumns,
		state: {
			columnVisibility: {
				id: false
			}
		},
		getCoreRowModel: getCoreRowModel()
	});

	const table = createSvelteTable(options);
</script>

<Table.Root>
	<Table.Header>
		{#each $table.getHeaderGroups() as headerGroup}
			<Table.Row class="hover:bg-none!">
				{#each headerGroup.headers as header}
					<Table.Head
						class="py-5 first:px-5 [&:nth-child(1)]:w-[20%] [&:nth-child(2)]:w-[20%] [&:nth-child(3)]:w-[10%] [&:nth-child(4)]:w-[10%] [&:nth-child(5)]:w-[40%]"
					>
						{#if !header.isPlaceholder}
							<svelte:component
								this={flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
							/>
						{/if}
					</Table.Head>
				{/each}
			</Table.Row>
		{/each}
	</Table.Header>
	<Table.Body>
		{#each $table.getRowModel().rows as row}
			<Table.Row class="border-none even:bg-secondary even:bg-opacity-25">
				{#each row.getVisibleCells() as cell}
					<Table.Cell class="py-5 first:px-5">
						<svelte:component
							this={flexRender(cell.column.columnDef.cell, cell.getContext())}
						/>
					</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
