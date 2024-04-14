<script lang="ts">
  import Send from "svelte-google-materialdesign-icons/Send.svelte"
  import Menu from "svelte-google-materialdesign-icons/Menu.svelte"
  import Phone from "svelte-google-materialdesign-icons/Phone.svelte"
  import Avatar from "#/lib/components/Avatar.svelte"
  import { messages, sendMessage, selfNumber, serverNumber } from "#/lib/wsbridge"
  import { addToast } from "#/lib/toasts"
  import { Message } from "../proto/twisms"

  function formatPhoneNumber(number: string): string {
    return number.match(/\+\d{11}/)
      ? `+${number[1]} (${number.slice(2, 5)}) ${number.slice(5, 8)}-${number.slice(8, 12)}`
      : number
  }

  const accountColor = {
    [selfNumber]: "var(--pico-color-blue-650)",
    [serverNumber]: "var(--pico-color-jade-650)",
  }

  let messageInput: HTMLDivElement
  let sendingMessage = false
  let hasInput = false
  $: disabled = sendingMessage
  $: canSend = !disabled && hasInput

  async function sendMessageInput() {
    const body = messageInput.innerText.trim()
    if (!body) {
      return
    }

    try {
      sendingMessage = true
      await sendMessage(body)
      messageInput.innerText = ""
    } catch (e) {
      console.error(e)
      addToast({ type: "error", message: "Cannot send message" })
    } finally {
      sendingMessage = false
    }
  }

  // Transform messages to display them in the chat.
  function transformMessages(messages: Message[]) {
    let lastMessage: Message | null = null
    return messages
      .map((m) => {
        const transformed = {
          ...m,
          collapse: lastMessage?.from == m.from,
        }
        lastMessage = m
        return transformed
      })
      .reverse()
  }
</script>

<div class="message-view">
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
    {#each transformMessages($messages) as message}
      <li class="message" class:self={message.from == selfNumber} class:collapse={message.collapse}>
        <header>
          <Avatar size={32} color={accountColor[message.from]} />
          <b>{formatPhoneNumber(message.from)}</b>
        </header>
        <p class="message-content">{message.body?.text?.text}</p>
      </li>
    {/each}
  </ol>

  <div class="message-composer" class:disabled>
    <div
      role="textbox"
      tabindex="0"
      class="message-input"
      contenteditable={!disabled}
      class:disabled
      class:empty={!hasInput}
      bind:this={messageInput}
      on:input={() => {
        hasInput = messageInput.innerText.trim() != ""
      }}
      on:keydown={(ev) => {
        if (ev.key == "Enter") {
          ev.preventDefault()
          sendMessageInput()
          return
        }
      }}
    ></div>
    <button class="send" disabled={!canSend} on:click={sendMessageInput}>
      <Send variation="filled" />
    </button>
  </div>
</div>

<style lang="scss">
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
      border: var(--pico-border-width) solid var(--pico-secondary-focus);
      border-right: 0;
      border-radius: var(--pico-border-radius) 0 0 var(--pico-border-radius);
      white-space: pre-wrap;
      overflow-wrap: break-word;
      transition: var(--pico-transition);

      &:focus {
        border-color: var(--pico-secondary-border);
      }

      position: relative;
      overflow: hidden;

      // Input placeholder
      &.empty:not(:focus):not(.disabled)::after {
        content: "Send message";
        color: var(--pico-secondary);

        z-index: 1;
        position: absolute;
        top: 0;
        height: 100%;
        left: 0;
        padding: 0 calc(var(--pico-spacing) / 1.5);
        display: flex;
        align-items: center;
      }

      --stripes-size: 10px;
      --stripes-color: var(--pico-secondary-focus);

      // Loading stripes animation
      &::before {
        content: "";
        opacity: 0;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: repeating-linear-gradient(
          135deg,
          var(--stripes-color),
          var(--stripes-color) var(--stripes-size),
          transparent var(--stripes-size),
          transparent calc(var(--stripes-size) * 2)
        );
        transition: opacity var(--pico-transition);
      }

      &.disabled::before {
        opacity: 1;
      }
    }

    .disabled,
    [disabled] {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }

    [contenteditable] {
      cursor: text;
    }

    .send {
      border-radius: 0 var(--pico-border-radius) var(--pico-border-radius) 0;
    }
  }

  .message-list {
    margin: 0;
    padding: var(--pico-spacing);
    list-style: none;
    box-sizing: border-box;

    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;

    .message {
      background-color: var(--pico-secondary-background);
      border-radius: var(--pico-border-radius);
      width: min(500px, 85%);
      padding: calc(var(--pico-spacing) / 2);

      header {
        display: flex;
        align-items: center;
        gap: calc(var(--pico-spacing) / 4);
      }

      @media (max-width: 350px) {
        header {
          display: none;
        }
      }

      p {
        margin: 0;
      }

      &.self {
        background-color: var(--pico-primary-background);
        margin-left: auto;
      }

      &.collapse {
        header {
          display: none;
        }
      }
    }
  }
</style>
