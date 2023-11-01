<script setup>
const { signOut, token } = useAuth();
const isOpen = ref(false);

const { metaSymbol } = useShortcuts()
const logout = async () => {
  await signOut({ callbackUrl: '/login' });
};

defineShortcuts({
  ctrl_k: {
    usingInput: true,
    handler: () => {
      isOpen.value = !isOpen.value
    }
  },

  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false }
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col px-4 py-5 sm:p-6 w-56 max-w-lg">
    <div class="py-5 mb-10">
      <img src="/favicon.ico" alt="Logo">
    </div>
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-4">

        <UButton icon="i-heroicons-magnifying-glass" variant="ghost" color="gray" @click="isOpen = true">
          <div class="flex gap-1">
            <span>Search</span>
            <div class="flex items-center gap-0.5">
              <UKbd>{{ metaSymbol }}</UKbd>
              <UKbd>K</UKbd>
            </div>
          </div>
        </UButton>

        <UButton v-if="token" icon="i-heroicons-home" variant="ghost" label="Dashboard" to="/" color="gray"
          class="active:text-blue-400 focus:text-blue-400" />

        <UButton v-if="token" icon="i-heroicons-folder-plus" variant="ghost" label="Category" to="/category" color="gray"
          class="active:text-blue-400 focus:text-blue-400" />

        <UButton v-if="token" icon="i-heroicons-folder-plus" variant="ghost" label="Asset" to="/asset" color="gray"
          class="active:text-blue-400 focus:text-blue-400" />
      </div>

      <div>
        <UButton v-if="token" icon="i-heroicons-arrow-right-on-rectangle" color="gray" variant="ghost" label="Log out"
          @click="logout" />

        <UButton v-if="!token" icon="i-heroicons-arrow-left-on-rectangle" color="gray" variant="ghost" label="Login"
          to="/login" />
      </div>

    </div>
    <Search :show="isOpen" @close="isOpen = false" />
  </div>
</template>
