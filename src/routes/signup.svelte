<script lang="ts">
  import { AppwriteService } from '$lib/appwrite';
  import { goto } from '$app/navigation';
  import { Toast } from '$lib/Toast';

  let email = '';
  let password = '';
  let name = '';

  const signupWithEmail = async () => {
    try {
      await AppwriteService.createAccount(email, password, name);
      await AppwriteService.createEmailSession(email, password);
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
      <label class="block text-md font-medium" for="name">Name</label>
      <input
        name="name"
        type="text"
        bind:value={name}
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
        placeholder="Enter your name"
      />
    </div>

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
      on:click|preventDefault={signupWithEmail}
      class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-background filter hover:brightness-90"
    >
      <p>Sign Up</p>
    </button>

    <div class="flex space-x-2 w-full items-center text-gray-500">
      <div class="w-full bg-gray-300 h-0.5" />
      <p class="text-sm font-light">OR</p>
      <div class="w-full bg-gray-300 h-0.5" />
    </div>

    <div class="cursor-pointer" on:click={() => goto('/loginPhone')}>Sign up with Phone?</div>

    <div class="cursor-pointer text-sm" on:click={() => goto('/login')}>
      Already have an account? Login here
    </div>
  </form>
</div>
