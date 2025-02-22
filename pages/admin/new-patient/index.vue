      
<script setup>
const admin = ref("admin")
</script>
<!-- new patien page component -->
<template>
  <NuxtLayout name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <DashboardPageHeader title="Insert New Patient" subtitle="You can insert new patient information." />


				<div class="mt-20">
					<AppAppointmentForm />
				</div>
			</div>
    </div>
  </NuxtLayout>
</template>