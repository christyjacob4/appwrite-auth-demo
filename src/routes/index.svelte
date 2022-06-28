<script lang="ts">
  import { goto } from '$app/navigation';
  import { AppwriteService } from '$lib/appwrite';
  import { Toast } from '$lib/Toast';
  import { onMount } from 'svelte';

  let user: any = {};
  let secret = '';
  let codeSent = false;

  const logout = async () => {
    try {
      await AppwriteService.deleteSession();
      goto('/login');
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
    }
  };

  const updatePhone = async () => {
    try {
      let password = prompt('Please enter your password');
      if (!password) {
        throw new Error('Password is required');
      }
      user = await AppwriteService.updatePhone(user.phone, password);
      Toast.success('Phone number updated!');
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
    } finally {
      codeSent = false;
    }
  };

  const createVerfication = async () => {
    try {
      if (!user.phone) {
        throw new Error('Phone number is required');
      }
      await AppwriteService.createPhoneVerification();
      codeSent = true;
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
    }
  };

  const verifyPhone = async () => {
    try {
      await AppwriteService.updatePhoneVerification(user['$id'], secret);
      user = await AppwriteService.getAccount();
      Toast.success('Phone number verified!');
      codeSent = false;
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
    }
  };

  onMount(async () => {
    try {
      user = await AppwriteService.getAccount();
      console.log(user);
    } catch (e: any) {
      Toast.error(e.message ? e.message : e);
      goto('/login');
    }
  });
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
        w-full
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

    <p class="text-center font-medium text-2xl">My Profile</p>

    <div class="flex flex-col space-y-2 w-full">
      <label class="block text-md font-medium" for="name">Name</label>
      <input
        name="name"
        type="text"
        bind:value={user.name}
        disabled
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
      />
    </div>

    <div class="flex flex-col space-y-2 w-full">
      <label class="block text-md font-medium" for="email">Email</label>
      <input
        name="email"
        type="text"
        bind:value={user.email}
        disabled
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
      <div class="flex items-center space-x-2">
        <label class="block text-md font-medium" for="phone">Phone Number</label>
        {#if user.phoneVerification}
          <p class="bg-green-600 text-white rounded-2xl px-3 py-1 text-xs">Verfied</p>
        {:else}
          <p class="bg-red-600 text-white rounded-2xl px-3 py-1 text-xs">Unverified</p>
        {/if}
      </div>
      <div class="flex space-x-4">
        <input
          name="phone"
          type="phone"
          bind:value={user.phone}
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
          placeholder="Enter your Phone Number"
        />
        <button
          on:click|preventDefault={updatePhone}
          class="text-white font-medium rounded-md shadow-lg bg-background filter hover:brightness-90 px-6"
        >
          Update
        </button>
      </div>
    </div>

    {#if !user.phoneVerification && codeSent}
      <div class="flex flex-col space-y-2 w-full">
        <label class="block text-md font-medium" for="secret">Verification Code</label>
        <div class="flex space-x-4">
          <input
            name="secret"
            type="secret"
            bind:value={secret}
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
            placeholder="Enter your verification code"
          />
          <button
            on:click|preventDefault={verifyPhone}
            class="text-white font-medium rounded-md shadow-lg bg-background filter hover:brightness-90 px-6"
          >
            Verify
          </button>
        </div>
      </div>
    {/if}

    {#if !codeSent && !user.phoneVerification}
      <button
        on:click|preventDefault={createVerfication}
        class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
      >
        Verify Phone
      </button>
    {/if}

    <button
      on:click|preventDefault={logout}
      class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
    >
      Logout
    </button>
  </form>
</div>
