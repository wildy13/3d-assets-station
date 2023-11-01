<script setup>
definePageMeta({
    auth: false,
});

const { data } = useAuth(); 
</script>

<template>
    <Dashboard />
</template>