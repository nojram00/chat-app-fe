<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute();

const routes = [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'Chat',
    to: '/chat',
    active: route.path.startsWith('/chat')
  },
  {
    label: 'Join',
    to: '/join',
    active: route.path.startsWith('/join')
  }
];

const items = computed<NavigationMenuItem[]>(() => routes);
</script>

<template>
  <UHeader>
    <template #title>
      <Logo class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="items" />

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
  </UHeader>
</template>
