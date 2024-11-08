<script setup lang="ts">
import InputControl from "@/components/inputControl/InputControl.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { reactive } from "vue";
import Button from "@/components/ui/button/Button.vue";

interface Place {
  city?: string;
  country?: string;
}

const place = reactive<Place>({});
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Agregar un nuevo destino</AccordionTrigger>
      <AccordionContent class="grid gap-4 p-4">
        <InputControl
          id="place_city"
          label="Ingrese el nombre de la ciudad"
          placeholder="ej: El fener"
          type="text"
          v-model="place.city"
        />
        <InputControl
          id="place_country"
          label="A que pais pertenece la ciudad?"
          placeholder="ej: Andorra"
          type="text"
          v-model="place.country"
        />
        <Button>Crear destino</Button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
