<script setup>
import { useCategoryStore } from '../../stores/category';

const search = ref('');
const showCreate = ref(false);
const showEdit = ref(false);
const showDelete =ref(false);

const store = useCategoryStore();

const {
  status,
  error,
  execute,
} = useLazyAsyncData(() => store.getAll(), {
  immediate: false,
});

onMounted(async () => {
  await execute();
});

const data = computed(() => useFilter(store.items, search.value, ['name']) || []);


const columns = [
  {
    key: "index",
    label: "#",
  },
  {
    key: "name",
    label: "Name",
  },
  { key: "actions" },
];


/* Select */
function select(row) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}

/* Dropdown */

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => showEdit.value = true,
    },
  ],
];

const selected = ref([]);

const filteredRows = computed(() => {
  if (!search.value) {
    return data.value.map((category, index) => ({
      ...category,
      index: index + 1
    }));
  }

  return data.value;
});


</script>

<template>
  <div class="bg-[#F5FBFE] w-full my-10 mx-10 drop-shadow-xl rounded-xl">
    <div class="h-full">
      <div class="flex justify-between h-full">
        <div class="w-full px-4 sm:px-6 py-5">
         <!-- Header -->
          <div class="flex justify-between items-center">
            <UInput v-model="search" placeholder="Search Category..." />
            <div>
              <UButton
                icon="i-heroicons-plus"
                size="sm"
                color="primary"
                square
                variant="ghost"
                @click="showCreate = true"
              />
              <UButton
                icon="i-heroicons-trash"
                size="sm"
                color="red"
                square
                variant="ghost"
                @click="showDelete = true"
              />
            </div>
          </div>

          <!-- Table -->
          <div class="mx-4">
            <UTable
              v-model="selected"
              @select="select"
              :rows="filteredRows"
              :columns="columns"
            >
              <template #index-data="{ row }">
                {{ row.index }}
              </template>
              <template #name-data="{ row }">
                <span
                  >{{ row.name }}</span
                >
              </template>
              <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-ellipsis-horizontal-20-solid"
                  />
                </UDropdown>
              </template>
            </UTable>
          </div>
          <CategoryCreate :show="showCreate"  @close="showCreate = false" />
          <CategoryEdit :show="showEdit" :data="selected" @close="showEdit = false" />
          <CategoryDelete :show="showDelete" :data="selected" @close="showDelete = false" />
        </div>
      </div>
    </div>
  </div>
</template>
