<script setup lang="ts">
import { computed, ref } from 'vue';
import TourCard from './TourCard.vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
    travel: Object as () => any,
})
const page = ref(0);
const limit = ref(3);
const tours = computed(() => props.travel?.tours?.slice(page.value * limit.value, (page.value + 1) * limit.value)) || [];

const totalNumberOfTours = computed(() => store.getters.totalNumberOfTourForTravel(props.travel.id));

function formatDate(date: string) {
    const [year, month, day] = date.split('-');
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ];
    return `${day} ${months[Number(month) - 1]} ${year}`;
}

function bookAlert() {
    alert('You have booked a tour!');
}

function deleteTour(tourId: string) {
    let approve = confirm('Are you sure you want to delete this tour?');
    if (!approve) return;
    store.dispatch('deleteTour', { tourId });
}
const isAdmin = computed(() => store.getters.isAdmin);

const fetchPage = (pageNum: number) => {
    page.value = pageNum;
};
</script>

<template>
    <div class="flex justify-center w-full my-4">
        <div class="flex flex-col justify-center gap max-w-4xl text-center">
            <h2 class="text-4xl font-extrabold my-4 text-[#4d4d4d]">Next Tours</h2>
            <router-link :to="{ name: 'newTour', params: { travelId: $route.params.travelId } }" v-if="isAdmin"
                class="bg-gray-400 hover:bg-gray-500 text-white rounded-xl font-bold py-10 px-4 mb-5 shadow-lg">
                Create Tour
            </router-link>
            <div class="flex flex-row flex-wrap gap-4">
                <TourCard v-for="tour in tours" :key="tour.id" :tour="tour" :start="formatDate(tour.startingDate)"
                    :end="formatDate(tour.endingDate)" @book="bookAlert" @deleteTour="deleteTour" />
            </div>
{{ totalNumberOfTours }} {{  tours.length }}
            <div class="flex justify-between">
                <div>
                    Page: {{ page + 1 }} / {{ Math.ceil(totalNumberOfTours / limit) }}
                </div>
                <button class="bg-gray-400 text-white w-8 h-8 rounded-full" :style="{ opacity: page === 0 ? 0.5 : 1 }"
                    @click="fetchPage(page - 1)" :disabled="page === 0">&lt;</button>
                <button class="bg-gray-400 text-white w-8 h-8 rounded-full"
                    :style="{ opacity: page === Math.ceil(totalNumberOfTours / limit) - 1 ? 0.5 : 1 }"
                    @click="fetchPage(page + 1)"
                    :disabled="page === Math.ceil(totalNumberOfTours / limit) - 1">&gt;</button>
            </div>
        </div>
    </div>
</template>