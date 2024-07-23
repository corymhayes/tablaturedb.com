<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Select from "$lib/components/ui/select";
	import { showTuning } from "$lib/stores/actions";
	import * as Form from "$lib/components/ui/form";

	export let userData;
	export let title;

	let open = false;
	showTuning.subscribe((value) => {
		open = value;
	});

	let tuning: string;
	let selected = userData[0];
	const add = () => {
		userData.tunings.push(tuning);
		showTuning.set(false);
		selected = tuning;
	};
</script>

<Select.Root selected={{ value: { selected }, label: `${selected}` }}>
	<Select.Trigger class="w-[180px]">
		<Select.Value />
	</Select.Trigger>
	<Select.Content>
		{#each userData as data}
			<Select.Item value={data.toLowerCase()}>
				{data}
			</Select.Item>
		{/each}
		<Select.Separator />
		<Select.Item value={"add"} on:click={() => showTuning.set(true)}>{title}</Select.Item>
	</Select.Content>
</Select.Root>

<Dialog.Root bind:open onOpenChange={() => showTuning.set(false)}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" bind:value={tuning} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={add}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
