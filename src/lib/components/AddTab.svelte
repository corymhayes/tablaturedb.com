<script lang="ts">
	// components
	import * as Card from "$lib/components/ui/card";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";
	import { toast } from "svelte-sonner";
	import BackgroundBlur from "./BackgroundBlur.svelte";
	import { Reload } from "svelte-radix";
	import * as Select from "$lib/components/ui/select";

	// packages
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { addTabSchema } from "$lib/schema";

	import { addTab } from "$lib/stores/actions";

	let isLoading = false;

	// data
	export let data;
	export let fn;

	const form = superForm(data.addTabForm, {
		validators: zodClient(addTabSchema),
		multipleSubmits: "prevent",
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				isLoading = false;
				addTab.set(false);
				fn();
				toast.success(form.message);
			}
		}
	});
	const { form: formData, enhance } = form;

	const handleEscape = ({ key }) => {
		if (key === "Escape") {
			addTab.set(false);
		}
	};

	$: selectedTuning = $formData.tuning ? { label: $formData.tuning, value: $formData.tuning } : undefined;

	$: selectedInstrument = $formData.instrument ? { label: $formData.instrument, value: $formData.instrument } : undefined;
</script>

{@debug data}
<svelte:window on:keyup={handleEscape} />
<BackgroundBlur>
	<Card.Root class="w-96 max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Add Tab</Card.Title>
		</Card.Header>

		<Card.Content>
			<form method="POST" use:enhance class="grid gap-3" action="?/addTab">
				<Form.Field {form} name="song">
					<Form.Control let:attrs>
						<Label>Song</Label>
						<Input {...attrs} bind:value={$formData.song} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="artist">
					<Form.Control let:attrs>
						<Label>Artist</Label>
						<Input {...attrs} bind:value={$formData.artist} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<!-- TUNINGS/INSTRUMENTS -->
				<div class="flex gap-6">
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

				<Form.Field {form} name="link">
					<Form.Control let:attrs>
						<Label>Link</Label>
						<Input {...attrs} bind:value={$formData.link} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Button class="my-3 w-full">
					{#if isLoading}
						<Reload class="mr-2 h-4 w-4 animate-spin" />
						Add tab
					{:else}
						Add tab
					{/if}
				</Form.Button>
			</form>
			<Form.Button class="w-full" variant="outline" on:click={() => addTab.set(false)}>Cancel</Form.Button>
		</Card.Content>
	</Card.Root>
</BackgroundBlur>
