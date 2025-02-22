<script setup lang="ts">
const admin = ref("admin")
const columns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'title',
  label: 'Title'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role',
  label: 'Role'
}, {
  key: 'actions'
}]

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]

const items = (row: any) => [
  [{
   label: 'Details',
   icon: 'i-heroicons-view-columns-20-solid'
  }],
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }]
]

const selected = ref([people[1]])
</script>
<template>
  <NuxtLayout name="admin">
  <div class="w-full h-auto">
    <div class="px-4 py-2">
      <DashboardPageHeader title="Patient List" subtitle="List of all patients" />

      <div class="mt-2">
        <UTable v-model="selected" :rows="people" :columns="columns">
          <template #name-data="{ row }">
            <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
          </template>

          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>
