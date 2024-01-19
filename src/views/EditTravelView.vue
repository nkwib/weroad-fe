<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
const store = useStore();
const router = useRouter();
const route = useRoute();

type Mood = {
  nature: number;
  relax: number;
  history: number;
  culture: number;
  party: number;
}

type Travel = {
  id: string;
  isPublic: boolean;
  slug: string;
  img: string;
  name: string;
  description: string;
  numberOfDays: number;
  moods: Mood;
}

const formData = reactive<Omit<Travel, 'id' | 'slug'>>({
  name: '',
  description: '',
  isPublic: false,
  img: '',
  numberOfDays: 1,
  moods: { nature: 0, relax: 0, history: 0, culture: 0, party: 0 },
});

function editTravel() {
  const travelData = {
    id: route.params.travelId,
    ...formData,
    moods: Object.fromEntries(
      Object.entries(formData.moods).map(([key, value]) => [key, Number(value)])
    ),
  };
  store
    .dispatch('updateTravel', travelData)
    .then(() => {
      router.push({ name: 'home' });
    })
    .catch((error: any) => {
      console.error('Update Travel failed:', error);
    });
}

onMounted(() => {
  store.dispatch('fetchTravels').then(() => {
    const travel = store.getters.findTravelById(route.params.travelId);
    if (travel) {
      const travelMood = {
        nature: travel.moods.nature.toString(),
        relax: travel.moods.relax.toString(),
        history: travel.moods.history.toString(),
        culture: travel.moods.culture.toString(),
        party: travel.moods.party.toString(),
      }

      formData.name = travel.name;
      formData.description = travel.description;
      formData.isPublic = travel.isPublic;
      formData.img = travel.img;
      formData.numberOfDays = travel.numberOfDays;
      formData.moods = travelMood
    } else {
      router.push({ name: 'home' });
    }
  });
});
</script>

<template>
  <div v-if="formData" class="w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold">Edit Travel: {{ formData.name }}</h1>
    <form @submit.prevent="editTravel">
      <div class="flex flex-col">
        <label for="name">Name</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="name" v-model="formData.name" required />
      </div>
      <div>
        <label for="isPublic">Public</label>
        <input class="m-2 border-gray-400 rounded" id="isPublic" v-model="formData.isPublic" type="checkbox" />
      </div>
      <div class="flex flex-col">
        <label for="description">Description</label>
        <textarea class="p-2 border-2 border-gray-400 rounded-md" id="description" v-model="formData.description"
          required />
      </div>
      <div class="flex flex-col">
        <label for="numberOfDays">Number of Days</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="numberOfDays" v-model="formData.numberOfDays" min="1"
          max="30" type="number" required />
      </div>
      <div class="flex flex-col">
        <label for="img">Image URL</label>
        <p class="text-xs text-gray-600">Upload Photo: Coming shortly</p>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="img" v-model="formData.img" required />
      </div>
      <div class="flex flex-col">
        <label for="nature">Nature - {{ formData.moods.nature }}</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="nature" v-model="formData.moods.nature" type="range"
          min="1" max="100" required />
      </div>
      <div class="flex flex-col">
        <label for="relax">Relax - {{ formData.moods.relax }}</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="relax" v-model="formData.moods.relax" type="range"
          min="1" max="100" required />
      </div>
      <div class="flex flex-col">
        <label for="history">History - {{ formData.moods.history }}</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="history" v-model="formData.moods.history" type="range"
          min="1" max="100" required />
      </div>
      <div class="flex flex-col">
        <label for="culture">Culture - {{ formData.moods.culture }}</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="culture" v-model="formData.moods.culture" type="range"
          min="1" max="100" required />
      </div>
      <div class="flex flex-col">
        <label for="party">Party - {{ formData.moods.party }}</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="party" v-model="formData.moods.party" type="range"
          min="1" max="100" required />
      </div>
      <button class="bg-gray-400 hover:bg-gray-500 text-white rounded font-bold py-2 px-4" type="submit">Update
        Travel</button>
    </form>
  </div>
</template>
  