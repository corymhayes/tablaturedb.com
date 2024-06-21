<script lang="ts">
	// components
	import * as Card from "$lib/components/ui/card";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";

	// packages
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { loginSchema } from "$lib/schema";

	// data
	export let data;
	const form = superForm(data, { validators: zodClient(loginSchema) });
	const { form: formData, enhance } = form;
</script>

<Card.Root class="w-96 max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Login</Card.Title>
	</Card.Header>

	<Card.Content>
		<form method="POST" use:enhance class="grid gap-4">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Label>Email</Label>
					<Input {...attrs} bind:value={$formData.email} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Label>Password</Label>
					<Input {...attrs} type="password" bind:value={$formData.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<a
				href="/forgot-password"
				class="mb-5 ml-auto mt-[-10px] inline-block text-sm underline"
			>
				Forgot your password?
			</a>

			<Form.Button>Login</Form.Button>
		</form>
	</Card.Content>
</Card.Root>
