<template>
  <UApp :locale="locale">
    <VitePwaManifest />
    <!-- <PwaReload /> -->
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import type { Messages } from "@nuxt/ui";
import message from "../i18n/i18n.config";

const locale = defineLocale({
  name: "My custom locale",
  code: "ckb",
  dir: "rtl",
  messages: (message as unknown) as Messages,
});

useHead({
  title: "RawezhkarAso",
  htmlAttrs: {
    dir: locale.dir || "rtl",
    lang: locale.code || "ckb",
  },
  meta: [
    {
      name: "description",
      content: "Appointments System for the therapy clinic, using Nuxt/Vue 3",
    },
    { name: "theme-color", content: "#0ea5e9" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],

  link: [{ rel: "apple-touch-icon", href: "/apple-touch-icon.jpeg" }],
});
</script>
<style>
/* @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic&family=Amiri&display=swap"); */

* {
  font-family: "Noto Sans Arabic", sans-serif;
  font-size: 16px;
}
</style>
