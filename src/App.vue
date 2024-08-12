<template>
  <div class="w-56 h-56 bg-base-100 flex flex-col items-center justify-center gap-4">
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text mr-2">Hide Sidebar</span>
        <input 
          type="checkbox" 
          class="toggle toggle-primary" 
          v-model="isHideSidebar" 
          @change="toggleSidebar" 
        />
      </label>
    </div>
    <hr class="border w-8/12 opacity-10 mx-auto"/>
    <span class="text-base-content flex gap-2 items-center">
      <span>{{ isHideSidebar ? 'Hidden' : 'Visible' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="!isHideSidebar" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path v-if="!isHideSidebar" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    </span>
    <!-- Smaller GitHub Follow Button with Icon -->
    <a href="https://github.com/xaypanya" target="_blank" class="btn btn-primary btn-sm flex gap-2 items-center text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.21.68-.47 0-.23-.01-.84-.01-1.65-2.78.61-3.37-1.34-3.37-1.34-.45-1.14-1.1-1.44-1.1-1.44-.9-.61.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.89 1.52 2.34 1.08 2.91.82.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.02A9.571 9.571 0 0112 7.7c.85.004 1.7.115 2.5.337 1.9-1.29 2.74-1.02 2.74-1.02.55 1.41.2 2.45.1 2.71.64.7 1.02 1.59 1.02 2.68 0 3.85-2.35 4.7-4.58 4.95.36.31.68.91.68 1.83 0 1.32-.01 2.39-.01 2.71 0 .26.18.56.69.47C19.14 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
      </svg>
      Follow
    </a>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const isHideSidebar = ref(false)

function toggleSidebar() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "toggleSidebar", visible: !isHideSidebar.value});
  });
}

onMounted(() => {
 chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // Introduce a delay of 500 milliseconds (0.5 seconds)
  setTimeout(() => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSidebarState" }, function (response) {
      if (response) {
        console.log("Received sidebar state:", response.visible);
        isHideSidebar.value = !response.visible;
      }
    });
  }, 500); // Adjust the delay time as needed
});

});
</script>


<style>
@import 'daisyui/dist/full.css';
@import 'tailwindcss/tailwind.css';

body {
  margin: 0;
  padding: 0;
}
</style>
