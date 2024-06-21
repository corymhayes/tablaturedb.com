<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
	</Card.Header>

	<Card.Content class="grid gap-4">
		<div class="grid grid-cols-2 gap-4">
			<div class="grid gap-2">
				<Label for="first-name">First Name</Label>
				<Input type="text" id="first-name" required></Input>
			</div>

			<div class="grid gap-2">
				<Label for="last-name">Last Name</Label>
				<Input type="text" id="last-name" required></Input>
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input type="email" id="email" />
		</div>

		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input type="password" id="password" />
		</div>

		<Button class="w-full">Create an account</Button>
	</Card.Content>
</Card.Root>
