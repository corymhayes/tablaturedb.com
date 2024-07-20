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

	// VARIABLES
	const form = superForm(data, { validators: zodClient(signupSchema) });
	const { form: formData, enhance } = form;
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
	</Card.Header>

	<Card.Content class="grid gap-4">
		<form method="POST" use:enhance class="grid gap-4" action="?/signup">
			<div class="grid grid-cols-2 gap-4">
				// FIRST NAME INPUT
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Label>First Name</Label>
						<Input {...attrs} bind:value={$formData.firstName} />
					</Form.Control>
				</Form.Field>

				// LAST NAME INPUT
				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Label>Last Name</Label>
						<Input {...attrs} bind:value={$formData.lastName} />
					</Form.Control>
				</Form.Field>
			</div>

			// EMAIL INPUT
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Label>Email</Label>
					<Input {...attrs} bind:value={$formData.email} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			// PASSWORD INPUT
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Label>Password</Label>
					<Input {...attrs} type="password" bind:value={$formData.password} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			// CONFIRM PASSWORD INPUT
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
