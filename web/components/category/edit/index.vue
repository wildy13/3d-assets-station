<script setup>
import { z } from 'zod';
import { useCategoryStore } from '../../../stores/category';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const store = useCategoryStore();
const toast = useToast();

const isOpen = ref(false);
const form = ref();
const state = ref({
  name: undefined,
});

watch(() => [props.show, props.data], ([showValue, dataValue]) => {
  isOpen.value = showValue;
  state.value = { ...dataValue[0] };
});

const schema = z.object({
  name: z.string(),
});

const {
  status,
  error,
  execute,
} = useLazyAsyncData(() => store.update(state.value), {
  immediate: false,
});

const close = () => {
  status.value = undefined;
  error.value = undefined;
  emit('close');
};

const submit = async () => {
  await form.value?.validate();

  await execute();

  if (status.value !== 'error') {
    close();

    toast.add({
      title: 'Done',
      description: 'Data has been updated successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green',
    });
  }

  return null;
};
</script>

<template>
  <div>
    <UModal
      v-model="isOpen"
      prevent-close
    >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="text-base">
              Edit Category
            </div>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              class="-my-1"
              @click="close"
            />
          </div>
        </template>

        <div class="flex flex-col space-y-[2rem]">
          <ErrorHandler
            v-if="status === 'error'"
            :error="error?.message"
          />

          <UForm
            ref="form"
            :schema="schema"
            :state="state"
            class="flex flex-col space-y-[2rem]"
            @submit="submit"
          >
            <UFormGroup
              label="Name"
              name="name"
            >
              <UInput v-model="state.name" />
            </UFormGroup>
          </UForm>
        </div>

        <template #footer>
          <div class="flex space-x-[1rem]">
            <div class="flex-1" />
            <UButton
              label="Close"
              color="white"
              @click="close"
            />
            <UButton
              label="Save"
              :loading="status === 'pending'"
              @click="submit"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>