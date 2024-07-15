<script lang="ts">
	import { addTab, showSettings } from "$lib/stores/actions";

	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import { Plus } from "svelte-radix";

	import * as Dialog from "$lib/components/ui/dialog";
	import * as Card from "$lib/components/ui/card";
	import { currentUser } from "$lib/stores/user";
	import { Separator } from "$lib/components/ui/separator/";
	import { cn } from "$lib/utils";
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";

	let className: string | undefined | null = undefined;

	let settings = false;
	showSettings.subscribe((value) => {
		settings = value;
	});

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	const items = [
		{
			title: "User",
			href: "user"
		}
	];

	$: selectedTab = "user";
</script>

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
						<!-- <Avatar.Root>
							<Avatar.Image src="./avatars/sb-avatar.jpg" />
						</Avatar.Root> -->
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item on:click={() => showSettings.set(true)}>
						<!-- <Settings {data} {fn} /> -->
						Settings
					</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<slot />
</div>

<Dialog.Root open={settings} onOpenChange={() => showSettings.set(false)}>
	<Dialog.Content class="max-w-4xl">
		<Dialog.Header>
			<Dialog.Title class="text-2xl font-bold tracking-tight">Settings</Dialog.Title>
			<Dialog.Description
				>Update your user account as well as add/delete tunings or instruments</Dialog.Description
			>
		</Dialog.Header>
		<Separator />
		<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
			<aside class="-mx-4 lg:w-1/5">
				<nav class={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
					{#each items as item}
						{@const isActive = selectedTab === item.href}

						<Button
							on:click={() => (selectedTab = item.href)}
							variant="ghost"
							class={cn(
								!isActive && "hover:underline",
								"relative justify-start hover:bg-transparent"
							)}
							data-sveltekit-noscroll
						>
							{#if isActive}
								<div
									class="absolute inset-0 rounded-md bg-muted"
									in:send={{ key: "active-sidebar-tab" }}
									out:receive={{ key: "active-sidebar-tab" }}
								/>
							{/if}
							<div class="relative">
								{item.title}
							</div>
						</Button>
					{/each}
				</nav>
			</aside>
			<div class="flex-1 lg:max-w-2xl">
				<div>
					<h3 class="text-lg font-medium">User</h3>
					<p class="text-sm text-muted-foreground">Add/Edit tunings and instruments</p>
					<Separator class="my-5" />
					<div>
						<Card.Root class="mb-5 w-3/4 border-none">
							<Card.Content class="p-0">
								<h1>TUNINGS</h1>
							</Card.Content>
						</Card.Root>
						<Card.Root class="mt-5 border-none">
							<Card.Content class="flex flex-wrap gap-2 p-0">
								<h1>HERE</h1>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
