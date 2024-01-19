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
    <div class="max-w-48 flex flex-col justify-between">
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
        <div v-if="isAdmin" class="mt-4 grid grid-cols-2 gap-2">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-xs rounded text-sm py-1 px-2">
                <RouterLink :to="{ name: 'editTravel', params: { travelId: id } }">Edit Travel</RouterLink>
            </button>
            <button class="bg-red-500 hover:bg-red-600 text-white font-xs rounded text-sm py-1 px-2"
                @click="$emit('deleteTravel', id)">Delete</button>
        </div>
    </div>
</template>