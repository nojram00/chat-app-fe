<script setup>
const instance = useChatManager();
const { get } = useCookies();

const enc_user = get('uid');
const room = get('roomId');
const user = ref('');

const message_input = ref();

const messages = ref([]);

if (enc_user) {
    user.value = atob(enc_user);
}


instance.listen('message', (data) => {
    messages.value.push({
        user: data.uid,
        message: data.message,
        isOwner: data.uid === user.value
    });
})

const handleSend = () => {
    console.log(message_input.value)
    instance.send(message_input.value, room, user.value);
}

</script>

<template>
    <UCard class="h-96 flex flex-col">
        <!-- Messages Container -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div 
                v-for="(message, idx) in messages" 
                :key="idx"
                :class="['flex', message.isOwner ? 'justify-end' : 'justify-start']">
                <div :class="message.isOwner ? 'bg-primary-500 text-white rounded-lg px-4 py-2 max-w-xs' : 'bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 max-w-xs'">
                    <p class="text-sm">{{ message.message }}</p>
                </div>
            </div>
        </div>

        <!-- Input Container -->
        <div class="border-t p-4">
            <div class="flex gap-2">
                <UInput v-model="message_input" placeholder="Type a message..." class="flex-1" />
                <UButton @click="handleSend">
                    Send
                </UButton>
            </div>
        </div>
    </UCard>
</template>