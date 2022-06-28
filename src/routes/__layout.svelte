<script>
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  const options = {};
</script>

<slot />
<SvelteToast {options} />
