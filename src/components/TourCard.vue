<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
    tour: Object as () => any,
    start: String,
    end: String,
})

const isAdmin = computed(() => store.getters.isAdmin);
const isEditor = computed(() => store.getters.isEditor);
</script>

<template>
    <div class="w-full">
        <div class="rounded-2xl shadow-lg border-2 p-8 flex justify-between bg-white">
            <div class="flex flex-row gap-4 self-center text-lg font-bold">
                <p>
                    {{ start }}
                </p>
                <p>
                    {{ end }}
                </p>
            </div>
            <div class="flex flex-row gap-4">
                <div>
                    <p>Tour Price</p>
                    <span class="text-[#ff4758] font-extrabold text-3xl">{{ props.tour.price }}</span>€
                </div>
                <button class="bg-[#ff4758] text-white font-sm rounded font-extrabold py-1 px-2" @click="$emit('book')">
                    Book Now
                </button>
                <router-link v-if="isAdmin || isEditor"
                    class="bg-gray-500 hover:bg-slate-600 text-white font-sm rounded font-extrabold py-4 px-2"
                    :to="{ name: 'editTour', params: { travelId: $route.params.travelId, tourId: props.tour.id } }">Edit
                    Tour</router-link>

                <button v-if="isAdmin"
                    class="bg-[#8b8484] hover:bg-slate-600 text-white font-sm rounded font-extrabold py-4 px-2"
                    @click="$emit('deleteTour', props.tour.id)">Delete Tour</button>
            </div>
        </div>
    </div>
</template>