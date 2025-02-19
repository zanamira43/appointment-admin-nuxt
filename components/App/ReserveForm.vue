<script setup>
	const submitForm = (e) => {
		e.preventDefault();
		console.log('form submitted');
	}

	const state = reactive({
		name: '',
	});
</script>
<template>
	<div class="w-full h-auto shadow-md bg-smiley-100 p-4">
		<div class="flex flex-col items-center justify-center">
			<h2 class="font-bold text-sm md:text-2xl lg:text-4xl p-2 text-center w-full">you can make appointment with your special therapist</h2>

			<UForm @submit="submitForm">
				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
					<UFormGroup label="Name" name="name">
						<UInput  v-model="state.name" placeholder="Enter your name" />
					</UFormGroup>
					<UFormGroup label="Name" name="name">
						<UInput  v-model="state.name" placeholder="Enter your name" />
					</UFormGroup><UFormGroup label="Name" name="name">
						<UInput  v-model="state.name" placeholder="Enter your name" />
					</UFormGroup><UFormGroup label="Name" name="name">
						<UInput  v-model="state.name" placeholder="Enter your name" />
					</UFormGroup>
				</div>
		</UForm>
		</div>
	</div>
</template>