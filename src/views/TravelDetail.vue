<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TravelMood from '@/components/TravelMood.vue';
import TravelBanner from '@/components/TravelBanner.vue';
import ToursList from '@/components/ToursList.vue';

const route = useRoute();
const travelId = computed(() => route.params.travelId);

const store = useStore();
const travel = computed(() => store.state.travels.find(
  (travel: any) => travel.id === travelId.value
));

onMounted(() => {
  store.dispatch('fetchTravels');
});

</script>
<template class="max-w-screen-xl mx-auto">
  <div :class="`bg-cover bg-center h-[50vh] w-full flex flex-col justify-center items-center`"
    :style="{ backgroundImage: `url(${travel?.img})` }">
    <h1 class="text-6xl font-extrabold text-white bg-opacity-50 bg-black rounded-lg p-4">{{ travel?.name }}</h1>
  </div>
  <TravelBanner class="translate-y-[-50%]" v-if="travel?.tours.length" :tours="travel?.tours" :travel="travel" />
  <TravelMood v-if="travel?.moods" :moods="travel.moods" />
  <div class="w-full flex flex-col justify-center my-8 leading-loose	text-justify p-4">
    <h2 class="capitalize text-4xl font-extrabold my-4 text-[#4d4d4d]">A brief description</h2>
    <p>{{ travel?.description }}</p>
  </div>
  <ToursList v-if="travel" :travel="travel" />
</template>
