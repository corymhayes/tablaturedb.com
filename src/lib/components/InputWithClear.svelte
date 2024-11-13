<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Cross1 } from "svelte-radix";

	export let data = "";

	const clearInput = () => (data = "");
</script>

<div class="flex">
	<Input type="text" bind:value={data} class="pr-[35px]" />
	{#if data != ""}
		<Button
			size="icon"
			variant="link"
			on:click={clearInput}
			class="ml-[-35px] mr-0.5 mt-0.5 h-8 w-8 flex-1 text-primary-foreground"
		>
			<Cross1 size={16} />
		</Button>
	{/if}
</div>
