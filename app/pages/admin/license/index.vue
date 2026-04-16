<script setup lang="ts">

const {getSystemLicense} = useGetSystemLicense()

const progress = computed(() => {
  return getSystemLicense.value?.usage || 0
})

const processStyle = computed(() => {
  return {background: `conic-gradient(#3b82f6 ${progress.value}%, #f3f4f6 ${progress.value}%)`}
})
</script>
<template>
  <NuxtLayout>
    <div class="h-screen w-full">
      <div class="px-4 py-2">
        <UCard 
          :title="$t('License')" 
          :description="$t('License_description')" 
          icon="material-symbols:license">

          <template #header>
            <AdminPageHeader 
              :title="$t('License')" 
              :subtitle="$t('License_description')" 
              icon="material-symbols:license" 
              iconClass="text-3xl text-secondary size-5"/>
          </template>

          <div class="flex justify-between flex-wrap items-center gap-5">
            <div class="mt-5 flex flex-col">
                <div class="flex gap-3">
                  <span>{{ $t('your_license') }} : </span>
                  <UBadge color="secondary">{{ $t(getSystemLicense?.status ? 'is_active' : '') }}</UBadge>
                </div>
                <div class="flex gap-3">
                  <span>{{ $t('expire_date') }} : </span>
                  <UBadge color="neutral">{{ getSystemLicense?.expiry_date.toString().split('T')[0] }}</UBadge>
                </div>
            </div>

            
            <div class="w-50 h-50 rounded-full flex items-center justify-center" :style="processStyle">
              <div class="w-40 h-40 bg-white rounded-full flex items-center justify-center">
                {{ progress }}%
              </div>
            </div>
          
          </div>


        </UCard>
      </div>
    </div>  
  </NuxtLayout>
</template>

