<script lang="ts">
  import { AppwriteService } from '$lib/appwrite';
  import { goto } from '$app/navigation';
  import { Toast } from '$lib/Toast';

  let number = '';
  let verificationSent = false;
  let verificationCode = '';
  let user: any = {};

  const signUpWithPhone = async () => {
    try {
      user = await AppwriteService.createPhoneSession(number);
      verificationSent = true;
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
    }
  };

  const verify = async () => {
    try {
      await AppwriteService.updatePhoneSession(user['userId'], verificationCode);
      goto('/');
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
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
      </div>
    {/if}

    {#if !verificationSent}
      <button
        on:click|preventDefault={signUpWithPhone}
        class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
      >
        <p>Get Code</p>
      </button>
    {:else}
      <button
        on:click|preventDefault={verify}
        class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
      >
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
