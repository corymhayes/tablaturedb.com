<script lang="ts">
	import { db } from "$lib/db";
	import { liveQuery } from "dexie";

	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Cross1, Gear } from "svelte-radix";

	let tunings = liveQuery(() => db.tunings.toArray());
	let instruments = liveQuery(() => db.instruments.toArray());

	let tuning = "";
	let instrument = "";

	const addTuning = async () => {
		try {
			await db.tunings.add({
				name: tuning
			});
		} catch (e) {
			console.log(e);
		}

		tuning = "";
	};

	const deleteTuning = async (id: number) => {
		try {
			await db.tunings.delete(id);
		} catch (e) {
			console.log(e);
		}
	};

	const addInstrument = async () => {
		try {
			await db.instruments.add({
				name: instrument
			});
		} catch (e) {
			console.log(e);
		}

		instrument = "";
	};

	const deleteInstrument = async (id: number) => {
		try {
			await db.instruments.delete(id);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<Dialog.Root>
	<Dialog.Trigger><Gear size={24} /></Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Configure Tunings/Instruments</Dialog.Title>
			<Dialog.Description></Dialog.Description>
		</Dialog.Header>

		<div class="my-5 flex flex-col gap-2">
			<Label>Tuning</Label>
			<div class="flex gap-2">
				<Input type="text" bind:value={tuning} />
				<Button on:click={addTuning}>Add</Button>
			</div>
			<div class="mt-2 flex gap-3">
				{#each $tunings as tuning}
					<Badge class="bg-primary">
						{tuning.name}
						<Cross1
							size={12}
							class="ml-2 cursor-pointer"
							withEvents
							on:click={() => deleteTuning(tuning.id)}
						/>
					</Badge>
				{/each}
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Label>Instrument</Label>
			<div class="flex gap-2">
				<Input type="text" bind:value={instrument} />
				<Button on:click={addInstrument}>Add</Button>
			</div>
			<div class="mt-2 flex gap-3">
				{#each $instruments as instrument}
					<Badge class="bg-primary">
						{instrument.name}
						<Cross1
							size={12}
							class="ml-2 cursor-pointer"
							withEvents
							on:click={() => deleteInstrument(instrument.id)}
						/>
					</Badge>
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>

<!-- <div class="flex h-screen w-screen items-center justify-center">
	<div class="w-1/5 rounded border px-7 pb-10 pt-7">
		<div class="mb-10 flex flex-col gap-2">
			<Label>Tuning</Label>
			<div class="flex gap-2">
				<Input type="text" />
				<Button>Add</Button>
			</div>
			<div class="mt-2 flex gap-3">
				<Badge class="bg-primary hover:bg-none">
					Standard
					<Cross1 size={12} class="ml-2" on:click={() => deleteTuning(0)}/>
				</Badge>
				<Badge class="bg-primary">Drop D</Badge>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<Label>Instrument</Label>
			<div class="flex gap-2">
				<Input type="text" />
				<Button>Add</Button>
			</div>
			<div class="mt-2 flex gap-3">
				<Badge class="bg-primary">Guitar</Badge>
				<Badge class="bg-primary">Bass</Badge>
			</div>
		</div>
	</div>
</div> -->
