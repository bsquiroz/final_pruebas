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
import { toast } from "vue-sonner";

interface User {
  name?: string;
  cc?: number;
  destination?: string;
}

const store = useAppStore();

const user = reactive<User>({});
const optionsPlaces = computed(() =>
  store.places.map((place) => ({
    text: place.city,
    value: place.city,
  }))
);

const handleAddUser = () => {
  if (!user.name) return toast.error("El nombre es necesario, Ingresalo");
  if (!user.cc) return toast.error("El CC es necesario, Ingresalo");
  if (!user.destination)
    return toast.error("El destino es necesario, Ingresalo");

  store.addUser({ ...user } as Required<User>);

  user.cc = undefined;
  user.destination = undefined;
  user.name = undefined;
};
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
          :regex-pattern="/^[a-zA-Z]$/"
          :max-length="30"
          v-model="user.name"
        />
        <InputControl
          id="cc_user"
          label="Ingrese el cc del usuario"
          placeholder="ej: 12345"
          type="text"
          :regex-pattern="/^[0-9]$/"
          :max-length="10"
          v-model="user.cc"
        />
        <SelectControl
          label="Seleccione una ciudad"
          placeholder="Medellin"
          v-model="user.destination"
          :options="optionsPlaces"
        />
        <Button @click="handleAddUser">Crear usuario</Button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
