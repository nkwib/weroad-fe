<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
const store = useStore();
const router = useRouter();
const route = useRoute();

const formData = reactive({
  name: '',
  startingDate: new Date().toISOString().split('T')[0],
  endingDate: new Date().toISOString().split('T')[0],
  price: 0,
});

function editTour() {
  const tourData = {
    id: route.params.tourId,
    ...formData,
    price: Number(formData.price) * 100,
  };
  store
    .dispatch('updateTour', tourData)
    .then(() => {
      router.push({ name: 'travelDetail', params: { travelId: route.params.travelId } });
    })
    .catch((error: any) => {
      console.error('Update Tour failed:', error);
    });
}

onMounted(() => {
  store.dispatch('fetchTravels').then(() => {
    const tour = store.getters.findTourById(route.params.tourId);
    if (tour) {
      formData.name = tour.name;
      formData.startingDate = tour.startingDate;
      formData.endingDate = tour.endingDate;
      formData.price = tour.price;
    } else {
      router.push({ name: 'home' });
    }
  });
});
</script>
<template>
  <div class="w-full flex flex-col justify-center items-center mb-8">
    <h1 class="text-4xl font-bold">Edit Tour: {{ formData.name }}</h1>

    <form @submit.prevent="editTour">
      <div class="flex flex-col">
        <label for="name">Name</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="name" v-model="formData.name" required />
      </div>
      <div class="flex flex-col">
        <label for="startingDate">Starting Date</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="startingDate" v-model="formData.startingDate"
          type="date" required />
      </div>
      <div class="flex flex-col">
        <label for="endingDate">Ending Date</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="endingDate" v-model="formData.endingDate" type="date"
          required />
      </div>
      <div class="flex flex-col">
        <label for="price">Price</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="price" v-model="formData.price" type="number" min="0"
          required />
      </div>
      <button class="bg-gray-400 hover:bg-gray-500 text-white rounded font-bold py-2 px-4 my-4" type="submit">Update
        Tour</button>
    </form>
  </div>
</template>
