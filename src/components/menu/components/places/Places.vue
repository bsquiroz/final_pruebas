<script setup lang="ts">
import { useAppStore } from "@/store/useAppStore";

import FormAddPlaces from "./components/FormAddPlaces/FormAddPlaces.vue";

const store = useAppStore();
</script>

<template>
  <FormAddPlaces />
  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-2">Ciudad</th>
        <th class="px-2">Pais</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="place in store.places">
        <td class="px-2">{{ place.city }}</td>
        <td class="px-2">{{ place.country }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
