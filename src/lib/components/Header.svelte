<script lang="ts">
	import { addTab } from "$lib/stores/actions";

	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { Avatar, Plus } from "svelte-radix";
</script>

<div>
	<div class="flex h-14 items-center justify-between p-5">
		<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">TablatureDB</h4>

		<div class="flex gap-5">
			<Button class="bg-primary" on:click={() => addTab.set(true)}>
				<Plus class="mr-1 h-5 w-5" />
				Add tab
			</Button>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						size="icon"
						class="overflow-hidden rounded-full"
					>
						<Avatar class="h-8 w-8" />
						<!-- <img
							src="./ks-avatar.jpg"
							width={36}
							height={36}
							alt="Avatar"
							class="overflow-hidden rounded-full"
						/> -->
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item><a href="./logout">Logout</a></DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<slot />
</div>
