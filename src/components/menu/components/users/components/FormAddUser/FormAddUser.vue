<script setup lang="ts">
import InputControl from "@/components/inputControl/InputControl.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { computed, reactive } from "vue";
import Button from "@/components/ui/button/Button.vue";
import SelectControl from "@/components/selectControl/SelectControl.vue";
import { useAppStore } from "@/store/useAppStore";

interface User {
  name?: string;
  cc?: number;
  destination?: string;
}

const user = reactive<User>({});

const store = useAppStore();
const optionsPlaces = computed(() =>
  store.places.map((place) => ({
    text: place.city,
    value: place.city,
  }))
);
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Agregar un nuevo usuario?</AccordionTrigger>
      <AccordionContent class="grid gap-4 p-4">
        <InputControl
          id="name_user"
          label="Ingrese el nombre del usuario"
          placeholder="ej: Sofia castro"
          type="text"
          v-model="user.name"
        />
        <InputControl
          id="cc_user"
          label="Ingrese el cc del usuario"
          placeholder="ej: 12345"
          type="number"
          v-model="user.cc"
        />
        <SelectControl
          label="Seleccione una ciudad"
          placeholder="Medellin"
          v-model="user.destination"
          :options="optionsPlaces"
        />
        <Button>Crear usuario</Button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
