<script setup lang="ts">
    const mode = ref<'join' | 'chat'>('join');

    const instance = useChatManager();

    instance.listen('join', () => {
        mode.value = 'chat';
    });

    instance.listen('disconnected', () => {
        mode.value = 'join';
    });

</script>

<template>
    <UContainer>
        <MainHeader />

        <UMain>
            <JoinContainer v-if="mode === 'join'" />
            <ChatContainer v-if="mode === 'chat'" />
        </UMain>
    </UContainer>
</template>