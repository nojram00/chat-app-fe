<script setup lang="ts">

const instance = useChatManager();
const { set, get } = useCookies();
const { publish } = usePubsub();
// const instance = useLocalChatManager();

const room = ref();
const user = ref();

const ready = ref(false);

const handleJoin = () => {
    const roomId = room.value;
    const userId = user.value;
    
    console.log(`Room: ${roomId} \nUser: ${userId}`);

    instance.join(roomId, userId);  

    set('uid', btoa(userId));
    set('roomId', roomId)
}

const cookie_room = get('roomId');
const cookie_user = (function(){
    const enc = get('uid');

    if(enc) {
        return atob(enc);
    }

    return null;
})();

if(cookie_room && cookie_user) {
    user.value = cookie_user;
    room.value = cookie_room;
}

onMounted(async () => {
    await instance.waitForConnection();
    ready.value = true; 
    publish('wsready');
});

</script>

<template>
    <UCard class="w-full max-w-md mx-auto">
        <div class="space-y-4">
            <h2 class="text-xl font-semibold text-center">Join Room</h2>

            <div class="space-y-3">
                <UInput v-model="room" :disabled="!ready" placeholder="Enter room ID..." class="w-full" />
                <UInput v-model="user" :disabled="!ready" placeholder="Enter Username..." class="w-full" />
                <UButton :disabled="!ready" class="w-full" size="lg" @click="handleJoin">
                    Join
                </UButton>
            </div>
        </div>
    </UCard>
</template>
