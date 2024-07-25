<script lang="ts">
	// PROPS
	export let data: PageData;

	// TYPES
	import type { PageData } from "./$types";
	import type { ColumnDef, TableOptions } from "@tanstack/svelte-table";
	type Tab = {
		song: string;
		artist: string;
		tuning: string;
		instrument: string;
		link: string;
	};

	// PACKAGES
	import { writable } from "svelte/store";
	import { createSvelteTable, flexRender, getCoreRowModel } from "@tanstack/svelte-table";

	// COMPONENTS
	import * as Table from "$lib/components/ui/table";
	import * as Tabs from "$lib/components/ui/tabs";
	import Login from "$lib/components/Login.svelte";
	import SignUp from "$lib/components/SignUp.svelte";

	// VARIABLES
	import tabs from "$lib/data/tabs.json";

	const defaultColumns: ColumnDef<Tab>[] = [
		{
			accessorKey: "song",
			header: () => "Song",
			cell: (info) => info.getValue()
		},
		{
			accessorKey: "artist",
			header: () => "Artist",
			cell: (info) => info.getValue()
		},
		{
			accessorKey: "tuning",
			header: () => "Tuning",
			cell: (info) => info.getValue()
		},
		{
			accessorKey: "instrument",
			header: () => "Instrument",
			cell: (info) => info.getValue()
		},
		{
			accessorKey: "link",
			header: () => "Link",
			cell: (info) => info.getValue()
		}
	];

	const options = writable<TableOptions<Tab>>({
		data: tabs,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const table = createSvelteTable(options);
</script>

<div class="fixed z-50 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
	<h1 class="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight">TablatureDB</h1>
	<Tabs.Root value="login">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="login">Login</Tabs.Trigger>
			<Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="login">
			<Login data={data.loginForm} />
		</Tabs.Content>
		<Tabs.Content value="signup">
			<SignUp data={data.signupForm} />
		</Tabs.Content>
	</Tabs.Root>
</div>

<Table.Root>
	<Table.Header>
		{#each $table.getHeaderGroups() as headerGroup}
			<Table.Row class="hover:bg-none!">
				{#each headerGroup.headers as header}
					<Table.Head class="py-5 first:px-5 [&:nth-child(1)]:w-[20%] [&:nth-child(2)]:w-[20%] [&:nth-child(3)]:w-[10%] [&:nth-child(4)]:w-[10%] [&:nth-child(5)]:w-[40%]">
						{#if !header.isPlaceholder}
							<svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
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
