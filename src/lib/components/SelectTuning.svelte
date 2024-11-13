<script lang="ts">
	import * as Select from "$lib/components/ui/select";

	export let data;
	export let value: string;

	$: selectedTuning = { value: value };
</script>

<Select.Root selected={selectedTuning} onSelectedChange={(s) => (value = s)}>
	<Select.Trigger>
		<Select.Value placeholder="" />
	</Select.Trigger>

	<Select.Content>
		{#each $data as d}
			<Select.Item value={d.name}>{d.name}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
