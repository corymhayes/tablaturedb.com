<script lang="ts">
	// PROPS
	export let data;
	export let fn;

	// COMPONENTS
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { showSettings } from "$lib/stores/actions";
	import { HamburgerMenu } from "svelte-radix";
	import Logout from "./Logout.svelte";
	import Settings from "./Settings.svelte";
	import AddTab from "./AddTab.svelte";
</script>

<Settings {data} {fn} />

<div>
	<div class="flex h-14 items-center justify-between p-5">
		<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">TablatureDB</h4>

		<div class="flex gap-3">
			<AddTab {data} {fn} />

			<DropdownMenu.Root disableFocusFirstItem={true}>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="overflow-hidden">
						<HamburgerMenu />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item on:click={() => showSettings.set(true)}>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<Logout />
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<slot />
</div>
