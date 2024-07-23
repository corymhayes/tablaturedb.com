<script lang="ts">
	// PROPS
	export let data;
	export let fn;

	// STORE
	import { showTuning } from "$lib/stores/actions";
	let open = false;
	showTuning.subscribe((value) => {
		open = value;
	});

	// PACKAGES
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { addTabSchema, instrumentSchema, tuningSchema } from "$lib/schema";

	// COMPONENTS
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Form from "$lib/components/ui/form";
	import * as Select from "$lib/components/ui/select";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button";
	import { toast } from "svelte-sonner";
	import { Plus, Reload } from "svelte-radix";

	// VARIABLES
	let tabIsLoading = false;
	let tabDialogOpen = false;
	let tuningIsLoading = false;
	let tuningDialogOpen = false;
	let instrumentIsLoading = false;
	let instrumentDialogOpen = false;

	const addTabForm = superForm(data.addTabForm, {
		validators: zodClient(addTabSchema),
		multipleSubmits: "prevent",
		onSubmit: () => {
			tabIsLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				tabIsLoading = false;
				tabDialogOpen = false;
				fn();
				toast.success(form.message);
			}
		},
		id: `addForm-${Math.random()}`
	});

	const tuningForm = superForm(data.tuningForm, {
		validators: zodClient(tuningSchema),
		invalidateAll: "force",
		multipleSubmits: "prevent",
		onSubmit: () => {
			tuningIsLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				selectedTuning = { label: form.data.tuning, value: form.data.tuning };
				$addTabFormData.tuning = form.data.tuning;
				tuningIsLoading = false;
				tuningDialogOpen = false;
				fn();
				toast.success(form.message);
			}
		},
		id: `tuningForm-${Math.random()}`
	});

	const instrumentForm = superForm(data.instrumentForm, {
		validators: zodClient(instrumentSchema),
		invalidateAll: "force",
		multipleSubmits: "prevent",
		onSubmit: () => {
			instrumentIsLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				selectedInstrument = { label: form.data.instrument, value: form.data.instrument };
				$addTabFormData.instrument = form.data.instrument;
				instrumentIsLoading = false;
				instrumentDialogOpen = false;
				fn();
				toast.success(form.message);
			}
		},
		id: `instrumentForm-${Math.random()}`
	});

	const { form: addTabFormData, enhance: addTabEnhance, formId: addFormId } = addTabForm;
	const { form: tuningFormData, enhance: tuningFormEnhance, formId: tuningFormId } = tuningForm;
	const { form: instrumentFormData, enhance: instrumentFormEnhance, formId: instrumentFormId } = instrumentForm;

	$: selectedTuning = $addTabFormData.tuning ? { label: $addTabFormData.tuning, value: $addTabFormData.tuning } : undefined;
	$: selectedInstrument = $addTabFormData.instrument ? { label: $addTabFormData.instrument, value: $addTabFormData.instrument } : undefined;
</script>

<Dialog.Root bind:open={tabDialogOpen}>
	<Dialog.Trigger>
		<Button class="bg-primary pl-3 pr-4" variant="ghost" on:click={() => (tabDialogOpen = true)}>
			<Plus class="mr-1 h-5 w-5" />
			Add tab
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-2xl font-bold tracking-tight">Add tab</Dialog.Title>
		</Dialog.Header>

		<form method="POST" use:addTabEnhance class="grid gap-3" action="?/addTab">
			<!-- SONG INPUT -->
			<Form.Field form={addTabForm} name="song">
				<Form.Control let:attrs>
					<Label>Song</Label>
					<Input {...attrs} bind:value={$addTabFormData.song} />
				</Form.Control>
			</Form.Field>

			<!-- ARTIST INPUT -->
			<Form.Field form={addTabForm} name="artist">
				<Form.Control let:attrs>
					<Label>Artist</Label>
					<Input {...attrs} bind:value={$addTabFormData.artist} />
				</Form.Control>
			</Form.Field>

			<div class="flex gap-6">
				<!-- TUNING INPUT -->
				<Form.Field form={addTabForm} name="tuning" class="w-1/2">
					<Form.Control let:attrs>
						<Label>Tuning</Label>
						<Select.Root
							selected={selectedTuning}
							onSelectedChange={(v) => {
								v && ($addTabFormData.tuning = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value />
							</Select.Trigger>
							<Select.Content>
								{#each data.user.settings.tunings as tuning}
									<Select.Item value={tuning} label={tuning}>
										{tuning}
									</Select.Item>
								{/each}
								<Select.Separator />
								<Select.Item value={""} on:click={() => (tuningDialogOpen = true)}>Add tuning</Select.Item>
							</Select.Content>
						</Select.Root>
						<Input type="hidden" bind:value={$addTabFormData.tuning} name={attrs.name} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<!-- INSTRUMENT INPUT -->
				<Form.Field form={addTabForm} name="instrument" class="w-1/2">
					<Form.Control let:attrs>
						<Label>Instrument</Label>
						<Select.Root
							selected={selectedInstrument}
							onSelectedChange={(v) => {
								v && ($addTabFormData.instrument = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value />
							</Select.Trigger>
							<Select.Content>
								{#each data.user.settings.instruments as instrument}
									<Select.Item value={instrument} label={instrument}>
										{instrument}
									</Select.Item>
								{/each}
								<Select.Separator />
								<Select.Item value={""} on:click={() => (instrumentDialogOpen = true)}>Add instrument</Select.Item>
							</Select.Content>
						</Select.Root>
						<Input type="hidden" bind:value={$addTabFormData.instrument} name={attrs.name} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
			</div>

			<!-- LINK INPUT -->
			<Form.Field form={addTabForm} name="link">
				<Form.Control let:attrs>
					<Label>Link</Label>
					<Input {...attrs} bind:value={$addTabFormData.link} />
				</Form.Control>
			</Form.Field>

			<!-- SUBMIT BUTTON -->
			<Form.Button class="my-3 w-full">
				{#if tabIsLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Add tab
				{:else}
					Add tab
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- TUNING DIALOG -->
<Dialog.Root bind:open={tuningDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Tuning</Dialog.Title>
		</Dialog.Header>
		<form method="POST" use:tuningFormEnhance action="?/addTuning">
			<Form.Field form={tuningForm} name="tuning">
				<Form.Control let:attrs>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label class="text-right">Tuning</Label>
							<Input {...attrs} bind:value={$tuningFormData.tuning} class="col-span-3" />
							<Input type="hidden" name="__superform_id" bind:value={$tuningFormId} />
						</div>
					</div>
					<Dialog.Footer>
						<Form.Button class="my-3 w-full">
							{#if tuningIsLoading}
								<Reload class="mr-2 h-4 w-4 animate-spin" />
								Add tuning
							{:else}
								Add tuning
							{/if}
						</Form.Button>
					</Dialog.Footer>
				</Form.Control>
			</Form.Field>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- INSTRUMENT DIALOG -->
<Dialog.Root bind:open={instrumentDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Instrument</Dialog.Title>
		</Dialog.Header>
		<form method="POST" use:instrumentFormEnhance action="?/addInstrument">
			<Form.Field form={instrumentForm} name="instrument">
				<Form.Control let:attrs>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label class="text-right">Instrument</Label>
							<Input {...attrs} bind:value={$instrumentFormData.tuning} class="col-span-3" />
							<Input type="hidden" name="__superform_id" bind:value={$instrumentFormId} />
						</div>
					</div>
					<Dialog.Footer>
						<Form.Button class="my-3 w-full">
							{#if instrumentIsLoading}
								<Reload class="mr-2 h-4 w-4 animate-spin" />
								Add instrument
							{:else}
								Add instrument
							{/if}
						</Form.Button>
					</Dialog.Footer>
				</Form.Control>
			</Form.Field>
		</form>
	</Dialog.Content>
</Dialog.Root>
