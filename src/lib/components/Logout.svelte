<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
</script>

<form
	method="POST"
	action="/logout"
	use:enhance={() => {
		return async ({ result }) => {
			pb.authStore.clear();
			await applyAction(result);
		};
	}}
>
	<Form.Button tabindex="-1" variant="link" class="h-6 pl-0 font-normal text-white hover:no-underline">Logout</Form.Button>
</form>
