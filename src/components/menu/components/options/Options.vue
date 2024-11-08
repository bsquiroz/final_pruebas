<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import InputControl from "@/components/inputControl/InputControl.vue";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "vue-sonner";

const store = useAppStore();

const handleRequestUser = (opcion: number) => {
  if (opcion === 1 && !store.valuesInputs.userCCCity)
    return toast.error(
      "Debes de ingresra la CC para buscar la ciudad a donde va"
    );
  if (opcion === 2 && !store.valuesInputs.userCCCountry)
    return toast.error(
      "Debes de ingresra la CC para buscar la pais a donde va"
    );
  if (opcion === 3 && !store.valuesInputs.userAmountCountry)
    return toast.error("Debes de ingresar la pais");
  if (opcion === 4 && !store.valuesInputs.userAmountCity)
    return toast.error("Debes de ingresar el ciudad");

  store.handleOptionsRequest(opcion);
};
</script>

<template>
  <section class="grid gap-4">
    <div class="flex flex-col gap-4">
      <Button
        @click="store.handleOptionsButtons(1)"
        :class="{ 'saturate-50': store.optionRequest == 1 }"
      >
        Por CC mirar a que ciudad viaja una persona
      </Button>
      <Button
        @click="store.handleOptionsButtons(2)"
        :class="{ 'saturate-50': store.optionRequest == 2 }"
      >
        Por CC mirar a que pais viaja una persona
      </Button>
      <Button
        @click="store.handleOptionsButtons(3)"
        :class="{ 'saturate-50': store.optionRequest == 3 }"
      >
        Cantidad de personas que viajan a cierto pais
      </Button>
      <Button
        @click="store.handleOptionsButtons(4)"
        :class="{ 'saturate-50': store.optionRequest == 4 }"
      >
        Cantidad de personas que viajan a cierta ciudad
      </Button>
    </div>

    <section class="flex flex-col gap-4">
      <p v-if="store.optionRequest == 0" class="text-center">
        Selecciona algo!!!
      </p>
      <InputControl
        v-if="store.optionRequest == 1"
        id="user_cc_city"
        label="Ingrese la CC para ver a que ciudad viaja la persona"
        placeholder="ej: 12345"
        type="number"
        v-model="store.valuesInputs.userCCCity"
      />
      <InputControl
        v-if="store.optionRequest == 2"
        id="user_cc_country"
        label="Ingrese la CC para ver a que pais viaja la persona"
        placeholder="ej: 12345"
        type="number"
        v-model="store.valuesInputs.userCCCountry"
      />
      <InputControl
        v-if="store.optionRequest == 3"
        id="user_cc_country"
        label="Ingrese el pais para ver las personas que viajan"
        placeholder="ej: Colombia"
        type="text"
        v-model="store.valuesInputs.userAmountCountry"
      />
      <InputControl
        v-if="store.optionRequest == 4"
        id="user_cc_city"
        label="Ingrese una ciudad para ver las personas que viajan"
        placeholder="ej: Medellin"
        type="text"
        v-model="store.valuesInputs.userAmountCity"
      />
      <Button
        v-if="store.optionRequest"
        variant="secondary"
        @click="() => handleRequestUser(store.optionRequest)"
      >
        Realizar busqueda
      </Button>
    </section>

    <section>
      <div v-if="store.searchs.user">
        <p>
          El usuario {{ store.searchs.user.name }} con CC
          {{ store.searchs.user.cc }} se dirige hacia
          {{ store.searchs.user.destination }}
        </p>
      </div>

      <table v-if="store.searchs.places" class="table-auto">
        <thead>
          <tr>
            <th class="px-2">cc</th>
            <th class="px-2">Nombre</th>
            <th class="px-2">Ciudad</th>
            <th
              v-if="store.searchs.places.some((place) => place.country)"
              class="px-2"
            >
              Pais
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in store.searchs.places">
            <td class="px-2">{{ data.cc }}</td>
            <td class="px-2">{{ data.name }}</td>
            <td class="px-2">{{ data.city }}</td>
            <td class="px-2">{{ data.country }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<style scoped></style>
