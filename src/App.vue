<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const isAdmin = computed(() => store.getters.isAdmin);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const name = computed(() => store.getters.name);
</script>

<template>
  <div>
    <nav class="bg-gray-200 py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex gap-4">
          <router-link class="text-2xl font-bold" :to="{ name: 'home' }"><span
              class="text-[#ff4758]">We</span>Road</router-link>
          <router-link v-if="isAdmin" class="text-lg" :to="{ name: 'create-account' }">Create Account</router-link>
        </div>
        <div>
          <p v-if="name" class="text-xl font-bold">Welcome, {{ name }}</p>
          <router-link v-if="isAuthenticated" class="text-xl" :to="{ name: 'logout' }">Logout</router-link>
          <RouterLink v-else class="text-xl" :to="{ name: 'login' }">Login</RouterLink>
        </div>
      </div>
    </nav>
  </div>
  <div class="container mx-auto min-h-[80vh] my-4"> <!-- fix min height -->
    <RouterView />
  </div>
  <footer class="bg-gray-200 py-16">
    <div class="grid grid-cols-3 gap-4">
      <ul class="text-center px-4">
        <li><a href="#">Home</a></li>
        <li><a href="#">Tours</a></li>
        <li><a href="#">About Us</a></li>
      </ul>
      <ul class="text-center px-4">
        <li><a href="#">Email</a></li>
        <li><a href="#">Phone</a></li>
        <li><a href="#">Social Media</a></li>
      </ul>
      <ul class="text-center px-4">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Terms and Conditions</a></li>
        <li><a href="#">Privacy Policy</a></li>
      </ul>
    </div>
  </footer>
</template>
