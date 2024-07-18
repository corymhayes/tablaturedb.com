<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { showSettings } from "$lib/stores/actions";
	import { currentUser } from "$lib/stores/user";
	import { Separator } from "$lib/components/ui/separator/";
	import { Input } from "$lib/components/ui/input/";
	import * as Form from "$lib/components/ui/form";
	import { cn } from "../utils";
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { Badge } from "$lib/components/ui/badge";
	import { Cross2 } from "svelte-radix";

	import { tuningSchema } from "$lib/schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

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
		// {
		// 	title: "Account",
		// 	href: "account"
		// },
		{
			title: "User",
			href: "user"
		}
	];

	$: selectedTab = "user";

	export let data;
	export let fn;
	let user;
	currentUser.subscribe((value) => {
		user = value;
	});

	const form = superForm(data.tuningForm, {
		validators: zodClient(tuningSchema),
		multipleSubmits: "prevent",
		onUpdated: ({ form }) => {
			if (form.valid) {
				fn();
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root open={settings} onOpenChange={() => showSettings.set(false)}>
	<Dialog.Content class="max-w-4xl">
		<Dialog.Header>
			<Dialog.Title class="text-2xl font-bold tracking-tight">Settings</Dialog.Title>
			<Dialog.Description>Update your user account as well as add/delete tunings or instruments</Dialog.Description>
		</Dialog.Header>
		<Separator />
		<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
			<aside class="-mx-4 lg:w-1/5">
				<nav class={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
					{#each items as item}
						{@const isActive = selectedTab === item.href}

						<Button on:click={() => (selectedTab = item.href)} variant="ghost" class={cn(!isActive && "hover:underline", "relative justify-start hover:bg-transparent")} data-sveltekit-noscroll>
							{#if isActive}
								<div class="absolute inset-0 rounded-md bg-muted" in:send={{ key: "active-sidebar-tab" }} out:receive={{ key: "active-sidebar-tab" }} />
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
					<!-- <div>
						<h3 class="text-lg font-medium">Account</h3>
						<p class="text-sm text-muted-foreground">Edit your email and password</p>
						<Separator class="mt-5" />

						<Card.Root class="w-3/4 border-none">
							<Card.Header class="px-0">
								<Card.Title>Change email</Card.Title>
								<form
									method="POST"
									class="flex flex-col gap-5"
									use:enhance
									action="?/updateEmail"
								>
									<Form.Field {form} name="email">
										<Form.Control let:attrs>
											<Form.Label>Email</Form.Label>
											<div class="flex gap-5">
												<Input {...attrs} type="email" />
												<Form.Button>Ok</Form.Button>
											</div>
										</Form.Control>
									</Form.Field>
								</form>
							</Card.Header>
						</Card.Root>

						<Card.Root class="mb-5 w-3/4 border-none">
							<Card.Header class="px-0">
								<Card.Title>Change password</Card.Title>
								<form
									method="POST"
									class="flex flex-col gap-5"
									use:enhance
									action="?/updatePassword"
								>
									<Form.Button class="w-auto">Request password reset</Form.Button>
								</form>
							</Card.Header>
						</Card.Root>
					</div> -->
				{:else}
					<div>
						<h3 class="text-lg font-medium">User</h3>
						<p class="text-sm text-muted-foreground">Add/Edit tunings and instruments</p>
						<Separator class="my-5" />
						<div>
							<!-- TUNINGS -->

							<Card.Root class="mb-5 w-3/4 border-none">
								<Card.Content class="p-0">
									<form method="POST" use:enhance action="?/addTuning">
										<Form.Field {form} name="tuning">
											<Form.Control let:attrs>
												<Form.Label>Tunings</Form.Label>
												<div class="flex gap-5">
													<Input {...attrs} bind:value={$formData.tuning} />
													<Form.Button>Ok</Form.Button>
												</div>
											</Form.Control>
										</Form.Field>
									</form>
								</Card.Content>
							</Card.Root>
							<Card.Root class="mt-5 border-none">
								<Card.Content class="flex flex-wrap gap-2 p-0">
									{#each data.user.settings.tunings as tuning}
										<Badge class="mr-2 h-2 p-3 hover:bg-primary">
											<div class="mr-2 text-xs">{tuning}</div>
											<form method="POST" use:enhance action="?/deleteTuning">
												<Form.Field {form} name="tuning">
													<Form.Control let:attrs>
														<Input {...attrs} bind:value={tuning} type="hidden" />
														<Form.Button class="m-0 h-4 bg-transparent p-0 shadow-none">
															<Cross2 size="14" class="mt-[-8px]" />
														</Form.Button>
													</Form.Control>
												</Form.Field>
											</form>
										</Badge>
									{/each}
								</Card.Content>
							</Card.Root>

							<!-- INSTRUMENTS -->

							<Card.Root class="my-5 w-3/4 border-none">
								<Card.Content class="p-0">
									<form method="POST" use:enhance action="?/addInstrument">
										<Form.Field {form} name="instrument">
											<Form.Control let:attrs>
												<Form.Label>Instruments</Form.Label>
												<div class="flex gap-5">
													<Input {...attrs} bind:value={$formData.instrument} />
													<Form.Button>Ok</Form.Button>
												</div>
											</Form.Control>
										</Form.Field>
									</form>
								</Card.Content>
							</Card.Root>
							<Card.Root class="mt-5 border-none">
								<Card.Content class="flex flex-wrap gap-2 p-0">
									{#each data.user.settings.instruments as instrument}
										<Badge class="mr-2 h-2 p-3 hover:bg-primary">
											<div class="mr-2 text-xs">{instrument}</div>
											<form method="POST" use:enhance action="?/deleteInstrument">
												<Form.Field {form} name="instrument">
													<Form.Control let:attrs>
														<Input {...attrs} bind:value={instrument} type="hidden" />
														<Form.Button class="m-0 h-4 bg-transparent p-0 shadow-none">
															<Cross2 size="14" class="mt-[-8px]" />
														</Form.Button>
													</Form.Control>
												</Form.Field>
											</form>
										</Badge>
									{/each}
								</Card.Content>
							</Card.Root>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
