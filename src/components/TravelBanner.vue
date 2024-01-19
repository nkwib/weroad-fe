<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    tours: Object as () => any[],
    travel: Object as () => any,
})
const minPrice = computed(() => Math.min(...props.tours?.map((tour) => tour.price) || []));
const days = computed(() => props.travel?.numberOfDays);
const nights = computed(() => days.value - 1);
const firstTour = computed(() => {
    const tourDates = props.tours?.map((tour) => tour.startingDate);
    return tourDates?.sort()[0];
});

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

</script>

<template>
    <div class="w-full">
        <div class="rounded-2xl shadow-lg border-2 p-8 flex justify-between mx-[8vw]  bg-white">
            <div class="flex flex-row gap-4 self-center text-lg font-bold">
                <p>
                    First Tour on: {{ formatDate(firstTour) }}
                </p>
                <p>
                    {{ days }} days and {{ nights }} nights
                </p>
            </div>
            <div class="flex flex-row gap-4">
                <div>
                    <p>Tour Price from</p>
                    <span class="text-[#ff4758] font-extrabold text-3xl">{{ minPrice }}</span>€
                </div>
                <!-- <button class="bg-[#ff4758] text-white font-sm rounded font-extrabold py-1 px-2">
                    See Calendar
                </button> -->
            </div>
        </div>
    </div>
</template>