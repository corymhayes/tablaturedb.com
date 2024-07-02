<script lang="ts">
	// components
	import * as Card from "$lib/components/ui/card";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";
	import { toast } from "svelte-sonner";
	import BackgroundBlur from "./BackgroundBlur.svelte";
	import { Reload } from "svelte-radix";

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
</script>

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

				<div class="flex gap-6">
					<Form.Field {form} name="tuning">
						<Form.Control let:attrs>
							<Label>Tuning</Label>
							<Input {...attrs} bind:value={$formData.tuning} />
							<Form.FieldErrors />
						</Form.Control>
					</Form.Field>

					<Form.Field {form} name="instrument">
						<Form.Control let:attrs>
							<Label>Instrument</Label>
							<Input {...attrs} bind:value={$formData.instrument} />
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
			<Form.Button class="w-full" variant="outline" on:click={() => addTab.set(false)}
				>Cancel</Form.Button
			>
		</Card.Content>
	</Card.Root>
</BackgroundBlur>
