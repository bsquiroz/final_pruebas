<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Users from "./components/users/Users.vue";
import Options from "./components/options/Options.vue";
import Places from "./components/places/Places.vue";
import { useAppStore } from "@/store/useAppStore";

const store = useAppStore();
</script>

<template>
  <Tabs
    default-value="options"
    class="w-[400px]"
    @update:model-value="store.handleResetValues"
  >
    <TabsList>
      <TabsTrigger value="options"> Opciones </TabsTrigger>
      <TabsTrigger value="places"> Lugares </TabsTrigger>
      <TabsTrigger value="users"> Usuarios </TabsTrigger>
    </TabsList>
    <TabsContent value="options">
      <Options />
    </TabsContent>
    <TabsContent value="places">
      <Places />
    </TabsContent>
    <TabsContent value="users">
      <Users />
    </TabsContent>
  </Tabs>
</template>
