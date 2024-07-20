<script lang="ts">
	// PROPS
	export let data;

	// PACKAGES
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { loginSchema } from "$lib/schema";

	// COMPONENTS
	import * as Card from "$lib/components/ui/card";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	// VARIABLES
	const form = superForm(data, { validators: zodClient(loginSchema) });
	const { form: loginForm, enhance } = form;
</script>

<Card.Root class="w-96 max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Login</Card.Title>
	</Card.Header>

	<Card.Content>
		<form method="POST" use:enhance class="grid gap-4" action="?/login">
			<!-- EMAIL INPUT -->
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Label>Email</Label>
					<Input {...attrs} bind:value={$loginForm.email} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			<!-- PASSWORD INPUT -->
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Label>Password</Label>
					<Input {...attrs} type="password" bind:value={$loginForm.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="mt-5">Login</Form.Button>
			<a href="/forgot-password" class="text-center text-sm"> Forgot your password? </a>
		</form>
	</Card.Content>
</Card.Root>
