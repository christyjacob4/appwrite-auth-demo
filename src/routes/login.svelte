<script lang="ts">
  import { AppwriteService } from '$lib/appwrite';
  import { goto } from '$app/navigation';
  import { Toast } from '$lib/Toast';

  let loading = false;
  let email = '';
  let password = '';

  const loginWithEmail = async () => {
    loading = true;
    try {
      await AppwriteService.createEmailSession(email, password);
      goto('/');
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
    } finally {
      loading = false;
    }
  };
</script>

<div class="w-screen h-screen bg-background items-center justify-center flex">
  <form
    class="
                  flex flex-col
                  bg-white
                  p-10
                  rounded-xl
                  shadow-2xl
                  items-center
                  space-y-8
                  max-w-lg
                  text-lg
                  text-gray-700
              "
  >
    <img
      src="https://avatars.githubusercontent.com/u/25003669?s=300"
      class="h-44 rounded-lg"
      alt=""
    />

    <p class="text-center">
      Welcome to the <b class="capitalize">Appwrite</b> Auth Demo! A simple Svelte app to showcase Appwrite's
      authentication capabilities!
    </p>

    <div class="flex flex-col space-y-2 w-full">
      <label class="block text-md font-medium" for="email">Email</label>
      <input
        name="email"
        type="text"
        bind:value={email}
        required
        class="
                          focus:ring-accent
                          focus:border-accent
                          block
                          w-full
                          rounded-md
                          sm:text-sm
                          border
                          border-gray-300
                          py-3
                          px-3
                      "
        placeholder="Enter your email"
      />
    </div>

    <div class="flex flex-col space-y-2 w-full">
      <label class="block text-md font-medium" for="password">Password</label>
      <input
        name="password"
        type="password"
        bind:value={password}
        required
        class="
                          focus:ring-accent
                          focus:border-accent
                          block
                          w-full
                          rounded-md
                          sm:text-sm
                          border
                          border-gray-300
                          py-3
                          px-3
                      "
        placeholder="Enter your Password"
      />
    </div>

    <button
      on:click|preventDefault={loginWithEmail}
      class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
    >
      {#if !loading}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 animate-spin text-white"
          v-else-if="loading"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      {/if}

      <p>Login</p>
    </button>

    <div class="flex space-x-2 w-full items-center text-gray-500">
      <div class="w-full bg-gray-300 h-0.5" />
      <p class="text-sm font-light">OR</p>
      <div class="w-full bg-gray-300 h-0.5" />
    </div>

    <div class="cursor-pointer" on:click={() => goto('/loginPhone')}>Login with Phone?</div>

    <div class="cursor-pointer text-sm" on:click={() => goto('/signup')}>Don't have an account? Signup here</div>

  </form>
</div>
