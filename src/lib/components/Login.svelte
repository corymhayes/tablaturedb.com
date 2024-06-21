<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.js";
</script>

<Card.Root class="w-96 max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Login</Card.Title>
	</Card.Header>

	<Card.Content class="grid gap-4">
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input type="email" id="email" />
		</div>

		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input type="password" id="password" />
		</div>
		<a href="##" class="mb-5 ml-auto mt-[-10px] inline-block text-sm underline">
			Forgot your password?
		</a>
		<Button class="w-full">Login</Button>
	</Card.Content>
</Card.Root>
