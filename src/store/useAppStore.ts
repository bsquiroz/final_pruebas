import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { toast } from "vue-sonner";

interface Place {
  city?: string;
  country?: string;
}

interface User {
  cc: number;
  destination: string;
  name: string;
}

interface Search {
  user?: User;
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
      name: "stiven quiroz",
      cc: 10100,
      destination: "medellin",
    },
    {
      name: "brayan muñoz",
      cc: 10101,
      destination: "bogota",
    },
    {
      name: "pedro gomez",
      cc: 10102,
      destination: "bali",
    },
    {
      name: "james sanchez",
      cc: 10103,
      destination: "pereira",
    },
    {
      name: "julian gallego",
      cc: 10104,
      destination: "ciudad de mexico",
    },
    {
      name: "maria correa",
      cc: 10105,
      destination: "cancun",
    },
    {
      name: "antonio jesus",
      cc: 10106,
      destination: "monterrey",
    },
    {
      name: "andres mendoza",
      cc: 10107,
      destination: "buenos aires",
    },
    {
      name: "mario cazas",
      cc: 10108,
      destination: "cordoba",
    },
    {
      name: "alejandro marin",
      cc: 10109,
      destination: "rosario",
    },
    {
      name: "alejandro roldan",
      cc: 10110,
      destination: "medellin",
    },
    {
      name: "camila higuita",
      cc: 10111,
      destination: "medellin",
    },
    {
      name: "pablo jaramillo",
      cc: 10112,
      destination: "medellin",
    },
    {
      name: "jorge vargaz",
      cc: 10113,
      destination: "bogota",
    },
  ]);

  const places = reactive([
    { city: "medellin", country: "colombia" },
    { city: "bogota", country: "colombia" },
    { city: "cali", country: "colombia" },
    { city: "pereira", country: "colombia" },
    { city: "ciudad de mexico", country: "mexico" },
    { city: "cancun", country: "mexico" },
    { city: "monterrey", country: "mexico" },
    { city: "buenos aires", country: "argentina" },
    { city: "cordoba", country: "argentina" },
    { city: "rosario", country: "argentina" },
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

  const addPlace = (place: Required<Place>) => {
    places.push(place);
  };

  const addUser = (user: User) => {
    users.push(user);
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
    addPlace,
    addUser,
  };
});
