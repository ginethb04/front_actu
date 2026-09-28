<script>
  import Header from '$lib/components/Header.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '$lib/styles/modulos.css';
  import { page } from '$app/state';

  let { children } = $props();
</script>

<div class:login-shell={page.url.pathname === '/login'} class="app-shell">
  {#if page.url.pathname !== '/login'}
    <Navbar />
    <div class="app-main">
      <Header />
      <main class="app-content">{@render children()}</main>
      <Footer />
    </div>
  {:else}
    <main class="login-shell-inner">{@render children()}</main>
  {/if}
</div>
