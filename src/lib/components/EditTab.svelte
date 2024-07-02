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
	import { updateTabSchema } from "$lib/schema";

	import { editTab, tabInfo } from "$lib/stores/actions";

	let isLoading = false;

	// data
	export let data;
	export let fn;

	let id = "";
	let song = "";
	let artist = "";
	let tuning = "";
	let instrument = "";
	let link = "";

	tabInfo.subscribe((value) => {
		id = value[0];
		song = value[1];
		artist = value[2];
		tuning = value[3];
		instrument = value[4];
		link = value[5];
	});

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
				editTab.set(false);
				fn();
				toast.success(form.message);
			}
		}
	});
	const { form: _, enhance } = form;

	const handleEscape = ({ key }) => {
		if (key === "Escape") {
			editTab.set(false);
		}
	};
</script>

<svelte:window on:keyup={handleEscape} />
<BackgroundBlur>
	<Card.Root class="w-96 max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Edit Tab</Card.Title>
		</Card.Header>

		<Card.Content>
			<form method="POST" use:enhance class="grid gap-3" action="?/updateTab">
				<Form.Field {form} name="song">
					<Form.Control let:attrs>
						<Label>Song</Label>
						<Input {...attrs} bind:value={song} placeholder={song} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="artist">
					<Form.Control let:attrs>
						<Label>Artist</Label>
						<Input {...attrs} bind:value={artist} placeholder={artist} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<div class="flex gap-6">
					<Form.Field {form} name="tuning">
						<Form.Control let:attrs>
							<Label>Tuning</Label>
							<Input {...attrs} bind:value={tuning} placeholder={tuning} />
							<Form.FieldErrors />
						</Form.Control>
					</Form.Field>

					<Form.Field {form} name="instrument">
						<Form.Control let:attrs>
							<Label>Instrument</Label>
							<Input {...attrs} bind:value={instrument} placeholder={instrument} />
							<Form.FieldErrors />
						</Form.Control>
					</Form.Field>
				</div>

				<Form.Field {form} name="link">
					<Form.Control let:attrs>
						<Label>Link</Label>
						<Input {...attrs} bind:value={link} placeholder={link} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="id">
					<Form.Control let:attrs>
						<Input {...attrs} bind:value={id} type="hidden" />
					</Form.Control>
				</Form.Field>

				<Form.Button class="my-3 w-full">
					{#if isLoading}
						<Reload class="mr-2 h-4 w-4 animate-spin" />
						Ok
					{:else}
						Ok
					{/if}
				</Form.Button>
			</form>
			<Form.Button class="w-full" variant="outline" on:click={() => editTab.set(false)}
				>Cancel</Form.Button
			>

			<form method="POST" use:enhance class="grid gap-3" action="?/deleteTab">
				<Form.Field {form} name="id">
					<Form.Control let:attrs>
						<Input {...attrs} bind:value={id} type="hidden" />
					</Form.Control>
				</Form.Field>
				<Form.Button class="w-full" variant="destructive">Delete tab</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</BackgroundBlur>
