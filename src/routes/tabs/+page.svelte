<script lang="ts">
	// PROPS
	export let data: PageData;

	// TYPES
	import type { PageData } from "./$types";
	import type { ColumnDef, SortingState, OnChangeFn, TableOptions } from "@tanstack/svelte-table";
	import type { RecordModel } from "pocketbase";

	// PACKAGES
	import { writable } from "svelte/store";
	import { createSvelteTable, flexRender, getCoreRowModel, getSortedRowModel, renderComponent } from "@tanstack/svelte-table";

	// COMPONENTS
	import * as Table from "$lib/components/ui/table";
	import Button from "$lib/components/ui/button/button.svelte";
	import Link from "$lib/components/Link.svelte";
	import Header from "$lib/components/Header.svelte";
	import RowActions from "$lib/components/RowActions.svelte";
	import { TriangleDown, TriangleUp } from "svelte-radix";

	// VARIABLES
	let sorting: SortingState = [];

	const columns: ColumnDef<RecordModel>[] = [
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
			accessorKey: "capo",
			header: "Capo",
			cell: (props) => (props.getValue() === 0 ? "" : props.getValue())
		},
		{
			accessorKey: "link",
			header: () => "Link",
			cell: (props) => renderComponent(Link, { link: props.getValue() })
		},
		{
			accessorKey: " ",
			cell: (props) => renderComponent(RowActions, { row: props.row.getAllCells(), data: data, fn: refreshData })
		}
	];

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
			console.log(sorting);
		} else {
			sorting = updater;
		}

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const options = writable<TableOptions<RecordModel>>({
		columns: columns,
		data: data.records,
		state: {
			columnVisibility: {
				id: false
			}
		},
		enableSortingRemoval: false,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});

	const refreshData = () => {
		options.update((prev) => ({
			...prev,
			data: data.records
		}));
	};

	const table = createSvelteTable(options);
</script>

<Header {data} fn={refreshData} />
<Table.Root>
	<Table.Header>
		{#each $table.getHeaderGroups() as headerGroup}
			<Table.Row class="hover:bg-none! bg-secondary">
				{#each headerGroup.headers as header}
					<Table.Head class="py-5 first:px-5 [&:nth-child(1)]:w-[20%] [&:nth-child(2)]:w-[20%] [&:nth-child(3)]:w-[10%] [&:nth-child(4)]:w-[7%] [&:nth-child(5)]:w-[5%] [&:nth-child(6)]:w-[40%]">
						{#if !header.isPlaceholder}
							<Button on:click={header.column.getToggleSortingHandler()} variant="link" class="h-3 p-0 font-bold text-foreground hover:no-underline">
								<svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
								{#if header.column.getIsSorted().toString() === "asc"}
									<TriangleUp />
								{:else if header.column.getIsSorted().toString() === "desc"}
									<TriangleDown />
								{/if}
							</Button>
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
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
