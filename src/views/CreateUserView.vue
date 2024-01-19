

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const formData = {
  username: '',
  displayName: '',
  password: '',
  roleName: 'user',
}
function createUser() {
  store
    .dispatch('createUser', formData)
    .then(() => {
      router.push({ name: 'home' });
    })
    .catch((error: any) => {
      console.error('Create user failed:', error);
    });
}
</script>
<template>
  <div class="w-full flex flex-col justify-center items-center mb-8">
    <h1 class="text-4xl font-bold">New User</h1>

    <form @submit.prevent="createUser">
      <div class="flex flex-col">
        <label for="username">Username</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="username" v-model="formData.username" required />
      </div>
      <div class="flex flex-col">
        <label for="displayName">Display Name</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="displayName" v-model="formData.displayName" />
      </div>
      <div class="flex flex-col">
        <label for="password">Password</label>
        <input class="p-2 border-2 border-gray-400 rounded-md" id="password" type="password" v-model="formData.password" required />
      </div>
      <div class="flex flex-col">
        <label for="roleName">Role</label>
        <select class="p-2 border-2 border-gray-400 rounded-md" id="roleName" v-model="formData.roleName">
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button class="bg-gray-400 hover:bg-gray-500 text-white rounded font-bold py-2 px-4 my-4" type="submit">Create User</button>
    </form>
  </div>
</template>