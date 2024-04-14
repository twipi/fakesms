<script lang="ts">
  import { type Toast, removeToast } from "#/lib/toasts.js"
  import Close from "svelte-google-materialdesign-icons/Close.svelte"

  export let toast: Toast
</script>

<div
  class="toast"
  class:info={toast.type === "info"}
  class:error={toast.type === "error"}
  role="alert"
>
  <div class="content">
    <h3>{toast.title}</h3>
    <p>{toast.message}</p>
  </div>
  <button class="close" on:click={() => removeToast(toast)}>
    <Close variation="filled" />
  </button>
</div>

<style lang="scss">
  .toast {
    padding: calc(var(--pico-spacing) / 2);
    padding-left: calc(var(--pico-spacing) / 1.5);
    display: flex;
    gap: calc(var(--pico-spacing) / 2);
    align-items: center;
    border-radius: var(--pico-border-radius);

    width: 100%;
    max-width: 300px;

    &.info {
      background-color: var(--pico-primary-background);
      * {
        color: white;
      }
    }

    &.error {
      background-color: var(--pico-form-element-invalid-focus-color);
      * {
        color: white;
      }
    }

    .content {
      flex: 1;

      h3,
      p {
        margin: calc(var(--pico-spacing) / 4) 0;
        line-height: 1.35;
      }

      h3 {
        font-weight: bold;
        font-size: 1em;
      }

      p {
        font-size: 0.95em;
      }
    }

    button.close {
      background: none;
      border: none;
      padding: calc(var(--pico-spacing) / 2);

      &:hover {
        background-color: rgba(255, 255, 255, 0.25);
      }
    }
  }
</style>
