<script lang="ts">
	// PROPS
	export let data;
	export let fn;
	export let row;

	// PACKAGES
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { updateTabSchema, deleteSchema } from "$lib/schema";
	import type { Row } from "@tanstack/svelte-table";

	// COMPONENTS
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Form from "$lib/components/ui/form";
	import * as Select from "$lib/components/ui/select";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button";
	import { toast } from "svelte-sonner";
	import { Pencil1, Reload } from "svelte-radix";

	// VARIABLES
	let id = "";
	let song = "";
	let artist = "";
	let tuning = "";
	let instrument = "";
	let capo = 0;
	let link = "";
	let updateIsLoading = false;
	let deleteIsLoading = false;
	let dialogOpen = false;

	type Tab = {
		id: string;
		song: string;
		artist: string;
		tuning: string;
		instrument: string;
		capo: number;
		link: string;
	};

	const getInfo = (info: Row<Tab>[]) => {
		id = info[0].getValue("id");
		song = info[1].getValue("song");
		artist = info[2].getValue("artist");
		tuning = info[3].getValue("tuning");
		instrument = info[4].getValue("instrument");
		capo = info[5].getValue("capo");
		link = info[6].getValue("link");
	};

	const updateTabForm = superForm(data.updateTabForm, {
		validators: zodClient(updateTabSchema),
		multipleSubmits: "prevent",
		onSubmit: () => {
			updateIsLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				updateIsLoading = false;
				dialogOpen = false;
				fn();
				toast.success(form.message);
			}
		},
		id: `editForm-${Math.random()}`
	});

	const deleteForm = superForm(data.deleteForm, {
		validators: zodClient(deleteSchema),
		multipleSubmits: "prevent",
		onSubmit: () => {
			deleteIsLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				deleteIsLoading = false;
				dialogOpen = false;
				fn();
				toast.success(form.message);
			}
		}
	});

	const { form: updateTabFormData, enhance: updateTabFormEnhance, formId: updateTabFormId } = updateTabForm;
	const { form: deleteFormData, enhance: deleteEnhance } = deleteForm;

	$: selectedTuning = tuning ? { label: tuning, value: tuning } : undefined;
	$: selectedInstrument = instrument ? { label: instrument, value: instrument } : undefined;
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger>
		<Button variant="ghost" size="icon" on:click={() => getInfo(row)}>
			<Pencil1 class="h-5 w-5" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-2xl font-bold tracking-tight">Edit tab</Dialog.Title>
		</Dialog.Header>

		<form method="POST" use:updateTabFormEnhance class="grid gap-3" action="?/updateTab">
			<!-- SONG INPUT -->
			<Form.Field form={updateTabForm} name="song">
				<Form.Control let:attrs>
					<Label>Song</Label>
					<Input {...attrs} bind:value={song} />
				</Form.Control>
			</Form.Field>

			<!-- ARTIST INPUT -->
			<Form.Field form={updateTabForm} name="artist">
				<Form.Control let:attrs>
					<Label>Artist</Label>
					<Input {...attrs} bind:value={artist} />
				</Form.Control>
			</Form.Field>

			<div class="grid-cols-add grid gap-6">
				<!-- TUNING INPUT -->
				<Form.Field form={updateTabForm} name="tuning">
					<Form.Control let:attrs>
						<Label>Tuning</Label>
						<Select.Root
							selected={selectedTuning}
							onSelectedChange={(v) => {
								v && (tuning = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder={tuning} />
							</Select.Trigger>
							<Select.Content>
								{#if data.user.settings.tunings.length != null}
									{#each data.user.settings.tunings as tuning, i}
										{#if i === 0}
											<Select.Item value={tuning} label={tuning} />
										{:else}
											<Select.Item value={tuning} label={tuning} />
										{/if}
									{/each}
								{/if}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={tuning} name={attrs.name} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<!-- INSTRUMENT INPUT -->
				<Form.Field form={updateTabForm} name="instrument">
					<Form.Control let:attrs>
						<Label>Instrument</Label>
						<Select.Root
							selected={selectedInstrument}
							onSelectedChange={(v) => {
								v && (instrument = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder={instrument} />
							</Select.Trigger>
							<Select.Content>
								{#if data.user.settings.instruments.length != null}
									{#each data.user.settings.instruments as instrument}
										<Select.Item value={instrument} label={instrument} />
									{/each}
								{/if}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={instrument} name={attrs.name} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<!-- LINK INPUT -->
				<Form.Field form={updateTabForm} name="capo">
					<Form.Control let:attrs>
						<Label>Capo</Label>
						<Input {...attrs} bind:value={capo} />
					</Form.Control>
				</Form.Field>
			</div>

			<!-- LINK INPUT -->
			<Form.Field form={updateTabForm} name="link">
				<Form.Control let:attrs>
					<Label>Link</Label>
					<Input {...attrs} bind:value={link} />
				</Form.Control>
			</Form.Field>

			<!-- ID FOR BACKEND-->
			<Form.Field form={updateTabForm} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={id} type="hidden" />
				</Form.Control>
			</Form.Field>

			<!-- SUBMIT BUTTON -->
			<Form.Button class="mt-3 w-full">
				{#if updateIsLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Update tab
				{:else}
					Update tab
				{/if}
			</Form.Button>
		</form>

		<form method="POST" use:deleteEnhance action="?/deleteTab">
			<Form.Field form={deleteForm} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={id} type="hidden" />
				</Form.Control>
			</Form.Field>
			<Form.Button class="w-full" variant="destructive">
				{#if deleteIsLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Delete tab
				{:else}
					Delete tab
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
