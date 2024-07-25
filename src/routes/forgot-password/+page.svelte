<script lang="ts">
	// PROPS
	export let data;

	// PACKAGES
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { forgotPasswordSchema } from "$lib/schema";
	import { toast } from "svelte-sonner";

	// COMPONENTS
	import * as Card from "$lib/components/ui/card";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";

	const form = superForm(data.form, {
		validators: zodClient(forgotPasswordSchema),
		onUpdated({ form }) {
			toast(form.message);
		}
	});

	const { form: formData, enhance, message } = form;
</script>

<div class="mt-5 flex w-screen justify-center">
	<Card.Root class="w-[500px] border-none">
		<Card.Header>
			<Card.Title class="text-4xl">Forgot password?</Card.Title>
			<Card.Description>Enter your email below and a link will be sent to reset your password.</Card.Description>
		</Card.Header>

		<Card.Content>
			<form method="POST" use:enhance>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Label>Email</Label>
						<Input {...attrs} bind:value={$formData.email} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Button class="mt-7 w-full">Reset password</Form.Button>
			</form>
			<Button class="mt-3 w-full" variant="outline" href="/">Back to login</Button>
		</Card.Content>
	</Card.Root>
</div>
