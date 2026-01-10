<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

import { type INewPersonInfo } from "@/types/IPersonInfo";

const toast = useToast();

const emit = defineEmits(["closeModal"]);


// Validation schema
const schema = yup.object({
  full_name: yup
    .string()
    .required(`${$t("Full name is required")}`),
  phone_number: yup
    .string()
    .required(`${$t("Phone number is required")}`),
});



const initialForm: INewPersonInfo = {
  full_name:"",
  phone_number: ""
};

const { values } = useForm<INewPersonInfo>({
  validationSchema: schema,
  initialValues: initialForm
});

const {createPersonInfo, isPending} = useCreateNewPersonInfo()
const onSubmit = async () => {
  try {
    await createPersonInfo(values, {
      onSuccess: () => {
        toast.add({
          description: $t('new_subscriber_created_successfully'),
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
            <span>{{ $t("save") }}</span>
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
