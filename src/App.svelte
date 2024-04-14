<script lang="ts">
  import Toast from "#/lib/components/Toast.svelte"
  import MessageView from "#/lib/components/MessageView.svelte"
  import { toasts } from "#/lib/toasts"
</script>

<div class="toast-overlay">
  {#each $toasts as toast}
    <Toast {toast} />
  {/each}
</div>

<main>
  <MessageView />
</main>

<style lang="scss">
  .toast-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1em;
    gap: 1em;
  }

  main {
    display: contents;
  }
</style>
