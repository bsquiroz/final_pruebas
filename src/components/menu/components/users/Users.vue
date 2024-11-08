<script setup lang="ts">
import { useAppStore } from "@/store/useAppStore";
import FormAddUser from "./components/FormAddUser/FormAddUser.vue";

const store = useAppStore();
</script>

<template>
  <FormAddUser />
  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-2">cc</th>
        <th class="px-2">Nombre</th>
        <th class="px-2">Ciudad de viaje</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in store.users">
        <td class="px-2">{{ user.cc }}</td>
        <td class="px-2">{{ user.name }}</td>
        <td class="px-2">{{ user.destination }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
