<script lang="ts">
	// PROPS
	export let data;
	export let fn;

	// PACKAGES
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { addTabSchema } from "$lib/schema";

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
	let isLoading = false;
	let dialogOpen = false;

	const form = superForm(data.addTabForm, {
		validators: zodClient(addTabSchema),
		multipleSubmits: "prevent",
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				isLoading = false;
				dialogOpen = false;
				fn();
				toast.success(form.message);
			}
		}
	});

	const { form: formData, enhance } = form;

	$: selectedTuning = $formData.tuning ? { label: $formData.tuning, value: $formData.tuning } : undefined;
	$: selectedInstrument = $formData.instrument ? { label: $formData.instrument, value: $formData.instrument } : undefined;
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger>
		<Button class="bg-primary pl-3 pr-4" variant="ghost" on:click={() => (dialogOpen = true)}>
			<Plus class="mr-1 h-5 w-5" />
			Add tab
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-2xl font-bold tracking-tight">Add tab</Dialog.Title>
		</Dialog.Header>

		<form method="POST" use:enhance class="grid gap-3" action="?/addTab">
			<!-- SONG INPUT -->
			<Form.Field {form} name="song">
				<Form.Control let:attrs>
					<Label>Song</Label>
					<Input {...attrs} bind:value={$formData.song} />
				</Form.Control>
			</Form.Field>

			<!-- ARTIST INPUT -->
			<Form.Field {form} name="artist">
				<Form.Control let:attrs>
					<Label>Artist</Label>
					<Input {...attrs} bind:value={$formData.artist} />
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
								v && ($formData.tuning = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="" />
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
						<input hidden bind:value={$formData.tuning} name={attrs.name} />
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
								v && ($formData.instrument = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="" />
							</Select.Trigger>
							<Select.Content>
								{#if data.user.settings.instruments.length != null}
									{#each data.user.settings.instruments as instrument}
										<Select.Item value={instrument} label={instrument} />
									{/each}
								{/if}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.instrument} name={attrs.name} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
			</div>

			<!-- LINK INPUT -->
			<Form.Field {form} name="link">
				<Form.Control let:attrs>
					<Label>Link</Label>
					<Input {...attrs} bind:value={$formData.link} />
				</Form.Control>
			</Form.Field>

			<!-- SUBMIT BUTTON -->
			<Form.Button class="my-3 w-full">
				{#if isLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Add tab
				{:else}
					Add tab
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
