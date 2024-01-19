<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import TravelCard from '@/components/TravelCard.vue';

const store = useStore();
const page = ref(0);
const limit = ref(10); // Number of items per page
const isAdmin = computed(() => store.getters.isAdmin);
const travels = computed(() => store.state.travels);
const totalNumberOfTravels = computed(() => store.getters.totalNumberOfTravels);

onMounted(() => {
  store.dispatch('fetchTravels');
});

const fetchPage = (pageNum: number) => {
  page.value = pageNum;
  store.dispatch('fetchTravels', { page: pageNum, limit: limit.value });

};

const deleteTravel = async (travelId: string) => {
  const confirmed = window.confirm('Are you sure you want to delete this travel?');
  if (!confirmed) return;
  try {
    await store.dispatch('deleteTravel', travelId);
    // filter out the deleted travel from the list of travels
    store.commit('setTravels', travels.value.filter((travel: any) => travel.id !== travelId));
  } catch (error) {
    console.error('Error deleting travel:', error);
  }
};

watch(page, (newPage: number) => {
  fetchPage(newPage);
});
</script>

<template>
  <div class="w-full flex flex-col">
    <h2 class="m-auto text-3xl lg:text-4xl font-bold text-gray-600">
      The most loved travels chosen by our users
    </h2>
    <div class="flex justify-center gap-2">
      <TravelCard v-for="travel in travels" :key="travel.id" :name="travel.name" :days="travel.numberOfDays"
        :priceFrom="travel.price" :isAdmin=isAdmin
        :img="travel.img || 'https://strapi-imaginary.weroad.it/resource/webp-icon/24161/viaggio-giordania-avventura-deserto-wadi-rum-novembre-autunno.webp'"
        :id="travel.id" @deleteTravel.once="deleteTravel" />

      <div class="flex justify-center" v-if="isAdmin">
        <RouterLink :to="{ name: 'newTravel' }"
          class="bg-gray-400 hover:bg-gray-500 text-white w-48 rounded-xl flex align-baseline justify-center">
          <button>Create Travel</button>
        </RouterLink>
      </div>
    </div>
    <div class="flex justify-between mt-5">
      <div>
        Page: {{ page + 1 }} / {{ Math.ceil(totalNumberOfTravels / limit) }}
      </div>
      <div class="flex justify-center gap-2">
        <button class="bg-gray-400 text-white w-8 h-8 rounded-full" :style="{ opacity: page === 0 ? 0.5 : 1 }"
          @click="fetchPage(page - 1)" :disabled="page === 0">&lt;</button>
        <button class="bg-gray-400 text-white w-8 h-8 rounded-full"
          :style="{ opacity: page === Math.ceil(totalNumberOfTravels / limit) - 1 ? 0.5 : 1 }"
          @click="fetchPage(page + 1)" :disabled="page === Math.ceil(totalNumberOfTravels / limit) - 1">&gt;</button>
      </div>
    </div>
  </div>
</template>