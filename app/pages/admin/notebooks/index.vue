<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type {
  IAllNotbooks,
  INewNotbook,
  INotebook,
  IUpdateNotbook,
} from "~/types/INotebook";

definePageMeta({
  middleware: "admin",
});

const toast = useToast();

const search = ref<string>("");
const page = ref(1);
const { notebooks, isLoading, fetchNotebooks } = useGetNotbooks(search, page);
const notebooksList = computed<IAllNotbooks | any>(() => {
  return notebooks?.value?.data ?? [];
});

onMounted(() => {
  fetchNotebooks();
});

// delete time table modal Ref
const delModal = ref(false);
const delId = ref<number | null>(null);

const { deleteNotebook, isPending } = useDeleteNotebook();

const openDeleteModal = (id: number) => {
  delId.value = id;
  delModal.value = true;
};
const handleDeleteNotebook = async () => {
  await deleteNotebook(delId.value as number, {
    onSuccess: () => {
      toast.add({
        description: $t("note_deleted_successfully"),
        color: "success",
      });
    },
  });
  delModal.value = false;
  delId.value = null;
};

const addForm = ref(false);
// Validation schema
const schema = yup.object({
  content: yup.string().required(`${$t("note is required")}`),
});

// edit time table modal Ref
const editId = ref<number>(0);
const { values: updateValues, setValues } = useForm<IUpdateNotbook>({
  initialValues: {
    content: "",
  },
  validationSchema: schema,
});

const handelEditMode = (notebook: INotebook) => {
  editId.value = notebook.id;
  setValues({
    content: notebook.content,
  });
};

const { updateNotebook, isPending: isUpdating } = useUpdateNotebook();
const handelUpdateNote = async () => {
  if (!updateValues.content) return;

  await updateNotebook(
    {
      id: editId.value as number,
      data: updateValues,
    },
    {
      onSuccess: () => {
        toast.add({
          description: $t("note_updated_successfully"),
          color: "success",
        });
      },
    }
  );
  editId.value = 0;
};
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-auto">
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <UIcon name="mdi:loading" />
      </div>
      <div v-else class="px-4 py-2">
        <AdminPageHeader :title="$t('note_book')">
          <UButton :label="$t('add')" @click="addForm = !addForm" />
        </AdminPageHeader>
        <!-- create notebook form -->
        <AdminNotebookCreate
          v-if="addForm"
          @close="addForm = false"
          @note_created="addForm = false"
        />

        <div class="mt-2">
          <div v-for="notebook in notebooksList" :key="notebook.id">
            <UCard class="my-3 relative">
              <div class="flex justify-between items-center">
                <!-- card title and Icon -->
                <div v-if="editId === notebook.id" class="flex items-center gap-3 w-full">
                  <div class="flex justify-center items-center gap-3 w-full">
                    <FormTextArea :label="$t('note')" name="content" class="w-3/4" />
                  </div>
                </div>

                <div v-else class="flex items-center gap-3">
                  <UIcon
                    name="mdi:notebook"
                    class="size-8 bg-pink-600 rounded-full p-2"
                  />
                  <span>{{ notebook.content }}</span>
                </div>
                <!-- card actions -->
                <div class="flex items-center gap-5">
                  <UButton
                    v-if="editId !== notebook.id"
                    icon="mdi:pen"
                    color="secondary"
                    @click="handelEditMode(notebook)"
                  />
                  <UButton
                    v-else
                    icon="mdi:pen-minus"
                    color="neutral"
                    @click="handelUpdateNote"
                    :loading="isUpdating"
                  />
                  <UButton
                    v-if="editId !== notebook.id"
                    icon="mdi:trash-can"
                    color="error"
                    @click="openDeleteModal(notebook.id)"
                  />
                </div>
              </div>

              <UButton
                v-if="editId == notebook.id"
                icon="mdi:close-circle"
                color="warning"
                variant="soft"
                @click="editId = 0"
                class="absolute left-2 top-2"
              />
            </UCard>
          </div>
          <!-- pagination -->
          <UPagination
            v-model:page="page"
            :items-per-page="notebooks?.limit ?? 1"
            :total="notebooks?.total ?? 0"
            :siblingCount="1"
            variant="soft"
            active-color="secondary"
            :next="notebooks?.has_next"
            :prev="notebooks?.has_prev"
            class="mt-4"
          />
        </div>

        <!-- delete appointment Modal -->
        <UModal v-model:open="delModal">
          <template #body>
            <div class="flex flex-col justify-center items-center gap-2">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("delete_note") }}
              </h1>
              <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-start items-start gap-2">
              <UButton
                :label="$t('yes')"
                color="error"
                @click="handleDeleteNotebook"
                :loading="isPending"
              />
            </div>
          </template>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
