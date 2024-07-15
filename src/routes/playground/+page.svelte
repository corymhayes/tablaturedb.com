<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import Input from "$lib/components/ui/input/input.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import SettingsBadge from "$lib/components/SettingsBadge.svelte";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Form from "$lib/components/ui/form";

	import { settingsSchema, type SettingsSchema } from "$lib/schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import BackgroundBlur from "./BackgroundBlur.svelte";

	const json = {
		instruments: ["Guitar", "Bass"],
		tunings: ["Drop D", "Standard"]
	};

	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { cn } from "$lib/utils.js";
	import { page } from "$app/stores";
	import { Description } from "formsnap";

	let className: string | undefined | null = undefined;
	// export let items: { href: string; title: string }[];
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	$: selectedTab = "account";

	const changeSetting = (item: string) => {
		selectedTab = item;
		console.log(selectedTab);
	};

	const items = [
		{
			title: "Account",
			href: "account"
		},
		{
			title: "User",
			href: "user"
		}
	];

	export let data: SuperValidated<Infer<SettingsSchema>>;

	const form = superForm(data, {
		validators: zodClient(settingsSchema)
	});

	const { form: formData, enhance } = form;
</script>

<BackgroundBlur>
	<div class="flex h-screen w-screen flex-col items-center justify-center">
		<Card.Root class="h-[750px] w-[960px] p-3">
			<Card.Header>
				<Card.Title class="mb-4 text-2xl font-bold tracking-tight">Settings</Card.Title>
				<Separator />
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside class="-mx-4 lg:w-1/5">
						<nav
							class={cn(
								"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
								className
							)}
						>
							{#each items as item}
								{@const isActive = selectedTab === item.href}

								<Button
									on:click={() => changeSetting(item.href)}
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
						{#if selectedTab === "account"}
							<div class="w-full">
								<h3 class="text-lg font-medium">Account</h3>
								<p class="text-sm text-muted-foreground">
									Edit your email and password
								</p>
								<Separator class="my-5" />

								<Card.Root class="mb-5 w-3/4 border-none">
									<Card.Header class="px-0">
										<Card.Title>Change email</Card.Title>
									</Card.Header>
									<Card.Content class="flex flex-col gap-5 p-0">
										<form method="POST" use:enhance class="flex flex-col gap-5">
											<Form.Field {form} name="email">
												<Form.Control let:attrs>
													<Form.Label>Email</Form.Label>
													<Input {...attrs} type="email" />
												</Form.Control>
											</Form.Field>
											<Form.Button class="mt-3 w-20">Ok</Form.Button>
										</form>
									</Card.Content>
								</Card.Root>

								<Card.Root class="w-3/4 border-none">
									<Card.Header class="px-0">
										<Card.Title>Change password</Card.Title>
									</Card.Header>
									<Card.Content class="p-0">
										<form method="POST" use:enhance class="flex flex-col gap-5">
											<Form.Field {form} name="password">
												<Form.Control let:attrs>
													<Form.Label>New password</Form.Label>
													<Input {...attrs} type="password" />
												</Form.Control>
											</Form.Field>

											<Form.Field {form} name="confirm-password">
												<Form.Control let:attrs>
													<Form.Label>Confirm password</Form.Label>
													<Input {...attrs} type="password" />
												</Form.Control>
											</Form.Field>

											<Form.Button class="mt-3 w-20">Ok</Form.Button>
										</form>
									</Card.Content>
								</Card.Root>
							</div>
						{:else}
							<div class="w-full">
								<h3 class="text-lg font-medium">User</h3>
								<p class="text-sm text-muted-foreground">
									View and change your tunings and instruments
								</p>
								<Separator class="my-5" />
								<div>
									<Card.Root class="mb-5 w-3/4 border-none">
										<Card.Header class="px-0">
											<Card.Title>Tunings</Card.Title>
										</Card.Header>
										<Card.Content class="p-0">
											<div class="mb-5 flex gap-3">
												<Input />
												<Button>Add</Button>
											</div>
											<Card.Root class="border-none">
												<Card.Content class="flex gap-2 p-0">
													{#each json.tunings as tuning}
														<SettingsBadge name={tuning} />
													{/each}
												</Card.Content>
											</Card.Root>
										</Card.Content>
									</Card.Root>

									<Card.Root class="w-3/4 border-none">
										<Card.Header class="px-0">
											<Card.Title>Instruments</Card.Title>
										</Card.Header>
										<Card.Content class="p-0">
											<div class="mb-5 flex gap-3">
												<Input />
												<Button>Add</Button>
											</div>
											<Card.Root class="border-none">
												<Card.Content class="flex gap-2 p-0">
													{#each json.instruments as instrument}
														<SettingsBadge name={instrument} />
													{/each}
												</Card.Content>
											</Card.Root>
										</Card.Content>
									</Card.Root>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</BackgroundBlur>
