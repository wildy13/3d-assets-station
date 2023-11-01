<script setup>
const { items } = defineProps(["items"]);

</script>


<template>
  <div v-for="item in items" :key="item.id">
    <div class="border border-transparent transition duration-300 hover:ease-out hover:border-blue-400 rounded-lg">
      <img :src="`/image/${item.image}`" :alt="item.image" class="w-48 h-48 object-contain aspect-video " />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

