<script lang="ts">
  import Send from "svelte-google-materialdesign-icons/Send.svelte"
  import Menu from "svelte-google-materialdesign-icons/Menu.svelte"
  import Phone from "svelte-google-materialdesign-icons/Phone.svelte"
  import Toast from "#/lib/components/Toast.svelte"
  import Avatar from "#/lib/components/Avatar.svelte"
  import { toasts } from "#/lib/toasts"
  import { messages, sendMessage, selfNumber, serverNumber } from "#/lib/wsbridge"

  function formatPhoneNumber(number: string): string {
    return number.match(/\+\d{11}/)
      ? `+${number[1]} (${number.slice(2, 5)}) ${number.slice(5, 8)}-${number.slice(8, 12)}`
      : number
  }

  const accountColor = {
    [selfNumber]: "var(--pico-color-blue-650)",
    [serverNumber]: "var(--pico-color-jade-650)",
  }

  let messageBody = ""
</script>

<div class="toast-overlay">
  {#each $toasts as toast}
    <Toast {toast} />
  {/each}
</div>

<main class="message-view">
  <header class="message-header">
    <Avatar size={32} color={accountColor[serverNumber]} />
    <b class="phone-number">
      {formatPhoneNumber(serverNumber)}
    </b>

    <div class="controls">
      <Phone />
      <Menu />
    </div>
  </header>

  <ol class="message-list">
    {#each $messages.slice().reverse() as message}
      <li class="message" class:self={message.from == selfNumber}>
        <header>
          <Avatar size={32} color={accountColor[message.from]} />
          <b>{formatPhoneNumber(message.from)}</b>
        </header>
        <p class="message-content">{message.body?.text?.text}</p>
      </li>
    {/each}
  </ol>

  <div class="message-composer">
    <div class="message-input" bind:innerText={messageBody} contenteditable role="textbox"></div>
    <button class="send">
      <Send variation="filled" />
    </button>
  </div>
</main>

<style lang="scss">
  .toast-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em;
    gap: 1em;
  }

  .message-view {
    height: 100%;

    display: flex;
    flex-direction: column;

    .message-list {
      flex: 1;
    }
  }

  .message-header {
    border-bottom: var(--pico-border-width) solid var(--pico-muted-border-color);
    padding: calc(var(--pico-spacing) / 1);

    display: flex;
    align-items: center;
    gap: calc(var(--pico-spacing) / 2);

    b {
      font-size: 1em;
      margin: 0;
      flex: 1;
    }

    .controls {
      display: flex;
      gap: calc(var(--pico-spacing));
    }
  }

  .message-composer {
    display: flex;
    padding: var(--pico-spacing);
    border-top: var(--pico-border-width) solid var(--pico-muted-border-color);

    .message-input,
    .send {
      padding: calc(var(--pico-spacing) / 2) calc(var(--pico-spacing) / 1.5);
      outline: none;
    }

    .message-input {
      flex: 1;
      color: var(--pico-color);
      border: var(--pico-border-width) solid var(--pico-secondary-border);
      border-right: 0;
      border-radius: var(--pico-border-radius) 0 0 var(--pico-border-radius);
      white-space: pre-wrap;
      overflow-wrap: break-word;
      transition: var(--pico-transition);

      &:focus {
        border-color: var(--pico-secondary);
      }
    }

    .send {
      border-radius: 0 var(--pico-border-radius) var(--pico-border-radius) 0;
    }
  }

  .message-input {
    &:empty::before {
      content: "Send message";
      color: var(--pico-secondary);
    }
  }

  .message-list {
    margin: var(--pico-spacing);
    padding: 0;
    list-style: none;
    box-sizing: border-box;

    display: flex;
    flex-direction: column-reverse;

    .message {
      background-color: var(--pico-secondary-background);
      max-width: clamp(300px, 80%, 600px);
      border-radius: var(--pico-border-radius);
      width: 100%;
      padding: calc(var(--pico-spacing) / 2);

      &.self {
        background-color: var(--pico-primary-background);
        margin-left: auto;
      }

      header {
        display: none;
      }

      p {
        margin: 0;
      }
    }

    .message:not(.self) + .message.self,
    .message.self + .message:not(.self) {
      margin-bottom: calc(var(--pico-spacing));
    }

    .message.self + .message.self,
    .message:not(.self) + .message:not(.self),
    .message:last-child,
    .message:first-child {
      header {
        display: flex;
        align-items: center;
        gap: calc(var(--pico-spacing) / 4);
      }
    }
  }
</style>
