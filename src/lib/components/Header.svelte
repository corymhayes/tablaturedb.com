<script lang="ts">
	import { addTab, showSettings } from "$lib/stores/actions";

	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import { Plus } from "svelte-radix";
	import Logout from "./Logout.svelte";
	import Settings from "./Settings.svelte";

	export let data;
	export let fn;
</script>

<Settings {data} {fn} />

<div>
	<div class="flex h-14 items-center justify-between p-5">
		<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">TablatureDB</h4>

		<div class="flex gap-5">
			<Button class="bg-primary" on:click={() => addTab.set(true)}>
				<Plus class="mr-1 h-5 w-5" />
				Add tab
			</Button>

			<DropdownMenu.Root disableFocusFirstItem={true}>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						size="icon"
						class="overflow-hidden rounded-full"
					>
						<!-- <Avatar class="h-8 w-8" /> -->
						<Avatar.Root>
							<Avatar.Image src="./avatars/sb-avatar.jpg" />
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item on:click={() => showSettings.set(true)}>
						Settings
					</DropdownMenu.Item>
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
