<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    }
});

const emit = defineEmits(['close']);
const isOpen = ref(false);

watch(() => props.show, (value) => {
    isOpen.value = value;
});

const people = [
    { id: 1, label: 'Wade Cooper' },
    { id: 2, label: 'Arlene Mccoy' },
    { id: 3, label: 'Devon Webb' },
    { id: 4, label: 'Tom Cook' },
    { id: 5, label: 'Tanya Fox' },
    { id: 6, label: 'Hellen Schmidt' },
    { id: 7, label: 'Caroline Schultz' },
    { id: 8, label: 'Mason Heaney' },
    { id: 9, label: 'Claudie Smitham' },
    { id: 10, label: 'Emil Schaefer' }
]
const selected = ref([]);

</script>

<template>
    <div>
        <UModal v-model="isOpen">
            <UCommandPalette v-model="selected" :multiple="true" :nullable="true"
                :groups="[{ key: 'people', commands: people }]"
                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
                @close="emit('close')">
            </UCommandPalette>

        </UModal>
    </div>
</template>