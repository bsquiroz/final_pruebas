import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { toast } from "vue-sonner";

interface Search {
  user?: {
    cc: number;
    destination: string;
    name: string;
  };
  places?: {
    cc: number;
    city: string;
    country?: string;
    name: string;
  }[];
}

export const useAppStore = defineStore("counter", () => {
  const users = reactive([
    {
      name: "Stiven quiroz",
      cc: 10100,
      destination: "Medellin",
    },
    {
      name: "Brayan muñoz",
      cc: 10101,
      destination: "Bogota",
    },
    {
      name: "Pedro gomez",
      cc: 10102,
      destination: "Cali",
    },
    {
      name: "James sanchez",
      cc: 10103,
      destination: "Pereira",
    },
    {
      name: "Julian gallego",
      cc: 10104,
      destination: "Ciudad de mexico",
    },
    {
      name: "Maria correa",
      cc: 10105,
      destination: "Cancun",
    },
    {
      name: "Antonio jesus",
      cc: 10106,
      destination: "Monterrey",
    },
    {
      name: "Andres mendoza",
      cc: 10107,
      destination: "Buenos aires",
    },
    {
      name: "Mario cazas",
      cc: 10108,
      destination: "Cordoba",
    },
    {
      name: "Alejandro marin",
      cc: 10109,
      destination: "Rosario",
    },
    {
      name: "Alejandro roldan",
      cc: 10110,
      destination: "Medellin",
    },
    {
      name: "Camila higuita",
      cc: 10111,
      destination: "Medellin",
    },
    {
      name: "Pablo jaramillo",
      cc: 10112,
      destination: "Medellin",
    },
    {
      name: "Jorge vargaz",
      cc: 10113,
      destination: "Bogota",
    },
  ]);

  const places = reactive([
    { city: "Medellin", country: "Colombia" },
    { city: "Bogota", country: "Colombia" },
    { city: "Cali", country: "Colombia" },
    { city: "Pereira", country: "Colombia" },
    { city: "Ciudad de mexico", country: "Mexico" },
    { city: "Cancun", country: "Mexico" },
    { city: "Monterrey", country: "Mexico" },
    { city: "Buenos aires", country: "Argentina" },
    { city: "Cordoba", country: "Argentina" },
    { city: "Rosario", country: "Argentina" },
  ]);

  const valuesInputs = reactive({
    userCCCity: 0,
    userCCCountry: 0,
    userAmountCountry: "",
    userAmountCity: "",
  });

  const searchs = reactive<Search>({
    user: undefined,
    places: undefined,
  });

  const optionRequest = ref(0);

  const handleOptionsRequest = (op: number) => {
    if (op === 1) {
      const findUser = users.find(
        (user) => user.cc === valuesInputs.userCCCity
      );

      if (!findUser) {
        searchs.user = undefined;
        return toast.error(
          `El usuario con la CC ${valuesInputs.userCCCity} no tiene ningun viaje`
        );
      }

      searchs.user = findUser;

      valuesInputs.userCCCity = 0;

      return;
    }

    if (op === 2) {
      valuesInputs.userCCCountry;

      const findUser = users.find(
        (user) => user.cc === valuesInputs.userCCCountry
      );

      if (!findUser) {
        searchs.user = undefined;
        return toast.error(
          `El usuario con la CC ${valuesInputs.userCCCity} no tiene ningun viaje`
        );
      }

      const findDestination = places.find(
        (place) => place.city === findUser.destination
      );

      searchs.user = {
        ...findUser,
        destination: findDestination?.country!,
      };

      valuesInputs.userCCCountry = 0;

      return;
    }

    if (op === 3) {
      valuesInputs.userAmountCountry;

      const findCountry = places.find(
        (place) =>
          place.country.toLowerCase() ===
          valuesInputs.userAmountCountry.toLowerCase()
      );

      if (!findCountry) {
        searchs.places = undefined;
        return toast.error(
          `No se encontro el pais ${valuesInputs.userAmountCountry}`
        );
      }

      const findUserInContry = users.filter(
        (user) => user.destination === findCountry.city
      );

      searchs.places = findUserInContry.map((place) => ({
        ...place,
        country: findCountry.country,
        city: place.destination,
      }));

      return;
    }

    if (op === 4) {
      valuesInputs.userAmountCity;

      const findUserCities = users.filter(
        (user) =>
          user.destination.toLowerCase() ===
          valuesInputs.userAmountCity.toLowerCase()
      );

      if (!findUserCities.length) {
        searchs.places = undefined;
        return `No se encontro la ciudad ${valuesInputs.userAmountCountry}`;
      }

      searchs.places = findUserCities.map((data) => ({
        cc: data.cc,
        name: data.name,
        city: data.destination,
      }));

      return;
    }
  };

  const handleOptionsButtons = (value: number) => {
    optionRequest.value = value;
  };

  const handleResetValues = () => {
    searchs.user = undefined;
    searchs.places = undefined;

    valuesInputs.userAmountCity = "";
    valuesInputs.userAmountCountry = "";
    valuesInputs.userCCCity = 0;
    valuesInputs.userCCCountry = 0;
  };
  watch(optionRequest, handleResetValues);

  return {
    places,
    users,
    valuesInputs,
    searchs,
    optionRequest,
    handleOptionsRequest,
    handleOptionsButtons,
    handleResetValues,
  };
});
