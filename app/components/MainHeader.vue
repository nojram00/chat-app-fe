<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'Chat',
    to: '/chat',
    active: route.path.startsWith('/chat')
  }
]);
</script>

<template>
  <header>
    <UHeader>
      <template #title>
        <Logo class="h-6 w-auto" />
      </template>
  
      <UNavigationMenu :items="items" class="hidden lg:flex" />
  
      <template #right>
        <UColorModeButton />
  
        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/nuxt/ui"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>
      <template #body>
        <UNavigationMenu 
          :items="items"
          orientation="vertical"
          class="p-4"
        />
      </template>
    </UHeader>
  </header>
</template>
