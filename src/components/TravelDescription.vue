<script setup lang="ts">
defineProps({
    name: String,
    days: Number,
    priceFrom: Number,
    img: String,
    id: String,
    isAdmin: Boolean,
    deleteTravel: Function
})
</script>

<template>
    <div class="max-w-48">
        <RouterLink :to="{ name: 'travelDetail', params: { travelId: id } }">
            <div class="rounded-xl w-48 h-48 bg-cover bg-center relative" :style="{ backgroundImage: `url(${img})` }">
                <p
                    class="text-xs leading-tight font-semibold text-white translate-x-2 translate-y-[-10px] absolute bottom-0">
                    {{ days }} days</p>
            </div>
        </RouterLink>
        <div class="mt-4 hover:underline">
            <RouterLink :to="{ name: 'travelDetail', params: { travelId: id } }">
                <p class="font-bold mb-0 travel-name text-base">{{ name }}</p>
                <p class="mt-[8px] leading-tight opacity-80 text-sm block">From {{ priceFrom || 1990 }}€</p>
            </RouterLink>
        </div>
        <div v-if="isAdmin" class="mt-4">
            <button>
                <RouterLink :to="{ name: 'editTravel', params: { travelId: id } }">Edit Travel</RouterLink>
            </button>
            <button @click="$emit('deleteTravel', id)">Delete</button>
        </div>
    </div>
</template>