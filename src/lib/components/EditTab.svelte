<script lang="ts">
	// PROPS
	export let data;
	export let fn;
	export let row;

	// COMPONENTS
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Form from "$lib/components/ui/form";
	import * as Select from "$lib/components/ui/select";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button";
	import { toast } from "svelte-sonner";
	import { Pencil1, Reload } from "svelte-radix";

	// PACKAGES
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { updateTabSchema } from "$lib/schema";

	// VARIABLES
	let isLoading = false;
	let id = "";
	let song = "";
	let artist = "";
	let tuning = "";
	let instrument = "";
	let link = "";
	let dialogOpen = false;

	const getInfo = (info) => {
		let songInfo: string[] = [];

		for (let i = 0; i < info.length; i++) {
			songInfo.push(info[i].getValue());
		}

		id = songInfo[0];
		song = songInfo[1];
		artist = songInfo[2];
		tuning = songInfo[3];
		instrument = songInfo[4];
		link = songInfo[5];
	};

	const form = superForm(data.updateTabForm, {
		validators: zodClient(updateTabSchema),
		multipleSubmits: "prevent",
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				console.log(form.valid);
				isLoading = false;
				dialogOpen = false;
				fn();
				toast.success(form.message);
			}
		}
	});

	const { form: formData, enhance } = form;

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

		<form method="POST" use:enhance class="grid gap-3" action="?/updateTab">
			<!-- SONG INPUT -->
			<Form.Field {form} name="song">
				<Form.Control let:attrs>
					<Label>Song</Label>
					<Input {...attrs} bind:value={song} />
				</Form.Control>
			</Form.Field>

			<!-- ARTIST INPUT -->
			<Form.Field {form} name="artist">
				<Form.Control let:attrs>
					<Label>Artist</Label>
					<Input {...attrs} bind:value={artist} />
				</Form.Control>
			</Form.Field>

			<div class="flex gap-6">
				<!-- TUNING INPUT -->
				<Form.Field {form} name="tuning" class="w-1/2">
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
				<Form.Field {form} name="instrument" class="w-1/2">
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
			</div>

			<!-- LINK INPUT -->
			<Form.Field {form} name="link">
				<Form.Control let:attrs>
					<Label>Link</Label>
					<Input {...attrs} bind:value={link} />
				</Form.Control>
			</Form.Field>

			<!-- ID FOR BACKEND-->
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={id} type="hidden" />
				</Form.Control>
			</Form.Field>

			<!-- SUBMIT BUTTON -->
			<Form.Button class="mt-3 w-full">
				{#if isLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Add tab
				{:else}
					Add tab
				{/if}
			</Form.Button>
		</form>

		<form method="POST" use:enhance action="?/deleteTab">
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={id} type="hidden" />
				</Form.Control>
			</Form.Field>
			<Form.Button class="w-full" variant="destructive">Delete tab</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
