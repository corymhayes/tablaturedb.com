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
	import { toast } from "svelte-sonner";

	// VARIABLES
	const loginForm = superForm(data, {
		validators: zodClient(loginSchema),
		onUpdated: ({ form }) => {
			if (form.message.notValidated) {
				toast.error(form.message.info);
			}
		}
	});
	const { form: loginFormData, enhance } = loginForm;
</script>

<Card.Root class="w-96 max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Login</Card.Title>
	</Card.Header>

	<Card.Content>
		<form method="POST" use:enhance class="grid gap-4" action="?/login">
			<!-- EMAIL INPUT -->
			<Form.Field form={loginForm} name="email">
				<Form.Control let:attrs>
					<Label>Email</Label>
					<Input {...attrs} bind:value={$loginFormData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- PASSWORD INPUT -->
			<Form.Field form={loginForm} name="password">
				<Form.Control let:attrs>
					<Label>Password</Label>
					<Input {...attrs} type="password" bind:value={$loginFormData.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="mt-5">Login</Form.Button>
			<a href="/forgot-password" class="text-center text-sm"> Forgot your password? </a>
		</form>
	</Card.Content>
</Card.Root>
