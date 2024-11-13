<script lang="ts">
	import { db, type Tab } from "$lib/db";
	import { liveQuery } from "dexie";

	import InputWithClear from "$lib/components/InputWithClear.svelte";
	import Link from "$lib/components/Link.svelte";
	import SortHeader from "$lib/components/SortHeader.svelte";

	import { Button } from "$lib/components/ui/button";
	import * as Table from "$lib/components/ui/table";
	import { Plus, Trash, Pencil1, Check } from "svelte-radix";

	// if -1 add, otherwise update
	let id = -1;
	let song = "";
	let artist = "";
	let tuning = "";
	let instrument = "";
	let link = "";
	let header = "artist";
	let tabs = liveQuery(() => db.tabs.orderBy("song").toArray());

	let columnDefs = ["Song", "Artist", "Tuning", "Instrument", "Link"];

	const addTab = async () => {
		try {
			// check if id is < 0
			// if true, add
			// if false, update
			if (id < 0) {
				await db.tabs.add({
					song: song,
					artist: artist,
					tuning: tuning,
					instrument: instrument,
					link: link
				});
			} else {
				await db.tabs.update(id, {
					song: song,
					artist: artist,
					tuning: tuning,
					instrument: instrument,
					link: link
				});
			}
		} catch (e) {
			console.log(e);
		}

		id = -1;
		song = "";
		artist = "";
		tuning = "";
		instrument = "";
		link = "";
	};

	const editTab = async (tab: Tab) => {
		id = tab.id;
		song = tab.song;
		artist = tab.artist;
		tuning = tab.tuning;
		instrument = tab.instrument;
		link = tab.link;
	};

	const deleteTab = async (id: number) => {
		try {
			await db.tabs.delete(id);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="flex h-screen w-screen items-start justify-center">
	{#if !$tabs}
		<h1>Loading</h1>
	{:else}
		<div class="w-full">
			<div class="flex items-center justify-between px-5 pt-5">
				<h1 class="text-2xl font-bold tracking-tight">TablatureDB</h1>
			</div>
			<Table.Root class="w-full">
				<Table.Header>
					<Table.Row>
						{#each columnDefs as column}
							<SortHeader columnName={column} bind:tabs bind:header />
						{/each}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<InputWithClear bind:data={song} />
						</Table.Cell>
						<Table.Cell>
							<InputWithClear bind:data={artist} />
						</Table.Cell>
						<Table.Cell>
							<InputWithClear bind:data={tuning} />
						</Table.Cell>
						<Table.Cell>
							<InputWithClear bind:data={instrument} />
						</Table.Cell>
						<Table.Cell>
							<InputWithClear bind:data={link} />
						</Table.Cell>
						<Table.Cell class="flex items-end justify-end">
							{#if id < 0}
								<Button size="icon" on:click={addTab} class="size-8"><Plus size={16} /></Button>
							{:else}
								<Button size="icon" on:click={addTab} class="size-8"><Check size={16} /></Button>
							{/if}
						</Table.Cell>
					</Table.Row>
					{#each $tabs as tab}
						<Table.Row>
							<Table.Cell class="w-[30%] pl-5">{tab.song}</Table.Cell>
							<Table.Cell class="w-[20%] pl-5">{tab.artist}</Table.Cell>
							<Table.Cell class="w-[10%] pl-5">{tab.tuning}</Table.Cell>
							<Table.Cell class="w-[10%] pl-5">{tab.instrument}</Table.Cell>
							<Table.Cell class="w-[50%] pl-5"><Link link={tab.link} /></Table.Cell>
							<Table.Cell class="flex items-end justify-end gap-2">
								<Button variant="ghost" size="icon" class="size-8" on:click={() => editTab(tab)}>
									<Pencil1 size={16} />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									class="size-8"
									on:click={() => deleteTab(tab.id)}
								>
									<Trash size={16} />
								</Button>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{/if}
</div>
