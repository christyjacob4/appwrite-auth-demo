<script lang="ts">
  import { AppwriteService } from '$lib/appwrite';
  import { goto } from '$app/navigation';
  import { Toast } from '$lib/Toast';

  let loading = false;
  let number = '';
  let verificationSent = false;
  let verificationCode = '';
  let user: any = {};

  const signUpWithPhone = async () => {
    loading = true;
    try {
      user = await AppwriteService.createPhoneSession(number);
      verificationSent = true;
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
    } finally {
      loading = false;
    }
  };

  const verify = async () => {
    try {
      await AppwriteService.updatePhoneSession(user['userId'], verificationCode);
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
      <label class="block text-md font-medium" for="phone">Phone Number</label>
      <input
        name="phone"
        type="text"
        bind:value={number}
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
        placeholder="Enter your phone number with the country code"
      />
    </div>

    {#if verificationSent}
      <div class="flex flex-col space-y-2 w-full">
        <label class="block text-md font-medium" for="password">Verification Code</label>
        <input
          name="verficationCode"
          type="text"
          bind:value={verificationCode}
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
          placeholder="Enter the verification code"
        />
        <div class="text-sm">Resend code</div>
      </div>
    {/if}

    {#if !verificationSent}
      <button
        on:click|preventDefault={signUpWithPhone}
        class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
      >
        {#if !loading}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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

        <p>Get Code</p>
      </button>
    {:else}
      <button
        on:click|preventDefault={verify}
        class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
      >
        {#if !loading}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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
        <p>Verify</p>
      </button>
    {/if}

    <div class="flex space-x-2 w-full items-center text-gray-500">
      <div class="w-full bg-gray-300 h-0.5" />
      <p class="text-sm font-light">OR</p>
      <div class="w-full bg-gray-300 h-0.5" />
    </div>

    <div class="cursor-pointer" on:click={() => goto('/signup')}>Sign up with Email?</div>
  </form>
</div>
