<script setup lang="ts">
import Layout from "./components/layout/Layout.vue";
import Menu from "./components/menu/Menu.vue";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <Layout>
    <Menu />
  </Layout>
  <Toaster richColors />
</template>

<style scoped></style>
