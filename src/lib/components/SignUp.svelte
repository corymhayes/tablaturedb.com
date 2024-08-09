<script lang="ts">
	// PROPS
	export let data;

	// PACKAGES
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { signupSchema } from "$lib/schema";

	// COMPONENTS
	import * as Card from "$lib/components/ui/card";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	import { CheckCircled } from "svelte-radix";

	// VARIABLES
	export let tabValue: string;
	let isSubmitted = false;

	const form = superForm(data, {
		validators: zodClient(signupSchema),
		onUpdated: ({ form }) => {
			if (form.message.success) {
				isSubmitted = true;
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

{#if isSubmitted}
	<Card.Root class="w-96 *:max-w-sm">
		<Card.Content class="flex h-full flex-col items-center justify-center">
			<div class="my-32 flex flex-col items-center">
				<CheckCircled size="48" />
				<h1 class="mb-2 mt-4 text-center text-3xl font-bold">Thank you!</h1>
				<p class="text-muted-foreground">Check your inbox for a verification email.</p>
			</div>
			<Button class="w-full" on:click={() => (tabValue = "login")}>Back to login</Button>
		</Card.Content>
	</Card.Root>
{:else}
	<Card.Root class="w-96 max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
		</Card.Header>

		<Card.Content class="grid gap-4">
			<form method="POST" use:enhance class="grid gap-4" action="?/signup">
				<!-- EMAIL INPUT -->
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Label>Email</Label>
						<Input {...attrs} bind:value={$formData.email} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<!-- PASSWORD INPUT -->
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Label>Password</Label>
						<Input {...attrs} type="password" bind:value={$formData.password} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<!-- CONFIRM PASSWORD INPUT -->
				<Form.Field {form} name="confirmPassword" class="mb-5">
					<Form.Control let:attrs>
						<Label>Confirm Password</Label>
						<Input {...attrs} type="password" bind:value={$formData.confirmPassword} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Button>Create an account</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}
