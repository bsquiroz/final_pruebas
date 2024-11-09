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
import { toast } from "vue-sonner";
import { useAppStore } from "@/store/useAppStore";

interface Place {
  city?: string;
  country?: string;
}

const store = useAppStore();

const place = reactive<Place>({});

const handleAddPlace = () => {
  const city = place.city?.trim().toLowerCase();
  const country = place.country?.trim().toLowerCase();

  if (!city) return toast.error("La ciudad es necesaria, ingresala");
  if (!country) return toast.error("El pais es necesario, ingresalo");

  const placeFoundinStorage = store.places.find((place) => place.city === city);

  if (placeFoundinStorage?.country === country)
    return toast.error(
      `La ciudad ${place.city} con el pais ${place.country} Ya existen`
    );

  store.addPlace({ city, country } as Required<Place>);

  place.city = undefined;
  place.country = undefined;
};
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
          :regex-pattern="/^[a-zA-Z ]*$/"
          :max-length="30"
          v-model="place.city"
        />
        <InputControl
          id="place_country"
          label="A que pais pertenece la ciudad?"
          placeholder="ej: Andorra"
          type="text"
          :regex-pattern="/^[a-zA-Z ]*$/"
          :max-length="30"
          v-model="place.country"
        />
        <Button @click="handleAddPlace">Crear destino</Button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
