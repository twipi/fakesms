<script lang="ts">
  import Person from "svelte-google-materialdesign-icons/Person.svelte"
  export let src = ""
  export let size = 48
  export let color = "blue"
</script>

<div class="avatar" style="--color: {color}; --size: {size}">
  {#if src}
    <img {src} alt="Avatar" />
  {:else}
    <Person size={`${size * 0.75}px`} />
  {/if}
</div>

<style lang="scss">
  .avatar {
    width: calc(var(--size) * 1px);
    height: calc(var(--size) * 1px);

    border-radius: 9999px;
    overflow: hidden;
    background: var(--color);

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
