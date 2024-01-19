<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const store = useStore();
const router = useRouter();
const credentials = {
  username: '',
  password: ''
};

onMounted(() => {
  if (store.getters.isAuthenticated) {
    alert('You are already logged in');
    router.push({ name: 'home' });
  }
});

function login() {
      store.dispatch('login', credentials)
        .then(() => {
          router.push({ name: 'home' });
        })
        .catch((error: any) => {
          console.error('Login failed:', error);
        });
    }
</script>
<template>
  <div class="w-full flex flex-col justify-center items-center h-[50vh]">
    <h1 class="text-4xl font-bold">WeRoad Test</h1>
    <form @submit.prevent="login" class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label for="username">Username:</label>
        <input type="text" class="p-2 border-2 border-gray-400 rounded-md" 
        id="username" v-model="credentials.username" required>
      </div>
      <div class="flex flex-col">
        <label for="password">Password:</label>
        <input type="password" class="p-2 border-2 border-gray-400 rounded-md" 
        id="password" v-model="credentials.password" required>
      </div>
      <button class="bg-gray-400 hover:bg-gray-500 text-white rounded font-bold py-2 px-4"
       type="submit">Login</button>
    </form>
  </div>
</template>
  
