<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

import { type IEditPersonInfo } from "@/types/IPersonInfo";

const toast = useToast();

const props = defineProps(['id'])
const emit = defineEmits(["closeModal"]);

const { personData, fetchPersonData } = useGetPersonInfo(parseInt(props.id as string) || props.id);


// Validation schema
const schema = yup.object({
  full_name: yup
    .string()
    .required(`${$t("Full name is required")}`),
  phone_number: yup
    .string()
    .required(`${$t("Phone number is required")}`),
});

const initialForm = {
  full_name: "",
  phone_number: "",
};


const { values, resetForm } = useForm<IEditPersonInfo>({
  validationSchema: schema,
  initialValues: initialForm as IEditPersonInfo
});

onMounted(async () => {
  await fetchPersonData();
  if (personData.value?.body) {
    resetForm({
      values :personData.value.body
    });
  }
})

const {updatePersonInfo, isPending} = useUpdatePersonInfo()
const onSubmit = async () => {
  try {
    await updatePersonInfo({
      id: props.id,
      data: values
    }, {
      onSuccess: () => {
        toast.add({
          description: $t('subscriber_updated_successfully'),
          color: 'success'
        })

        emit('closeModal')
      }
    })

  }catch(error){
    console.log("create new subscriber error", error)

  }
};
</script>
<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard>
      <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <FormInput
            type="text"
            :label="$t('fullName')"
            :name="`full_name`"
            class="w-full"
          />
          <FormInput
            type="text"
            :label="$t('phone_number')"
            :name="`phone_number`"
            class="w-full"
          />
        </div>
      </form>
      <div>
        <div class="flex items-center justify-end gap-2 p-2 w-full mt-5">
          <UButton type="button" @click="onSubmit()" :loading="isPending">
            <span>{{ $t("update") }}</span>
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
