<template>
  <div class="tab-pane fade active show" id="chat">
    <div class="ai-chat-wrapper">
      <!-- ── Header ───────────────────────────────────────── -->
      <div class="ai-chat-header">
        <div class="ai-bot-avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="26"
            height="26"
          >
            <rect
              x="16"
              y="20"
              width="32"
              height="24"
              rx="6"
              fill="currentColor"
              opacity="0.9"
            />
            <rect x="24" y="28" width="6" height="6" rx="2" fill="white" />
            <rect x="34" y="28" width="6" height="6" rx="2" fill="white" />
            <rect
              x="28"
              y="10"
              width="8"
              height="10"
              rx="3"
              fill="currentColor"
              opacity="0.7"
            />
            <rect
              x="4"
              y="30"
              width="8"
              height="4"
              rx="2"
              fill="currentColor"
              opacity="0.7"
            />
            <rect
              x="52"
              y="30"
              width="8"
              height="4"
              rx="2"
              fill="currentColor"
              opacity="0.7"
            />
            <rect
              x="22"
              y="44"
              width="8"
              height="8"
              rx="2"
              fill="currentColor"
              opacity="0.7"
            />
            <rect
              x="34"
              y="44"
              width="8"
              height="8"
              rx="2"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
        </div>
        <div class="ai-chat-title">
          <h6>Stock AI Assistant</h6>
          <span class="ai-status">
            <span class="ai-online-dot"></span> LLaMA 3.3 · Full inventory
            access
          </span>
        </div>
        <button
          v-if="messages.length > 0"
          class="ai-clear-btn"
          title="Clear conversation"
          @click="clearChat"
        >
          <i class="fa fa-trash-o"></i>
        </button>
      </div>

      <!-- ── Messages ─────────────────────────────────────── -->
      <div class="ai-messages-body" ref="messagesContainer">
        <!-- Welcome screen -->
        <div v-if="messages.length === 0" class="ai-welcome">
          <div class="ai-welcome-icon">🤖</div>
          <h6>How can I help you?</h6>
          <p>
            I have live access to your <strong>products</strong>,
            <strong>categories</strong>,
            <strong>users</strong
            >,<strong>activity</strong>,<strong>suppliers</strong>,
            <strong>orders</strong> and <strong>stock movements</strong>.
          </p>
          <div class="ai-suggestions">
            <button
              v-for="s in suggestions"
              :key="s"
              class="ai-chip"
              @click="handleSuggestion(s)"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <!-- Chat bubbles -->
        <template v-for="(msg, i) in messages" :key="i">
          <div v-if="msg.role === 'assistant'" class="ai-msg ai-msg--bot">
            <div class="ai-msg-avatar">🤖</div>
            <div class="ai-msg-content">
              <div
                class="ai-bubble ai-bubble--bot"
                :class="{ 'ai-bubble--error': msg.error }"
              >
                <span class="ai-bubble-text">{{ msg.content }}</span>
              </div>
              <span class="ai-msg-time">{{ msg.time }}</span>
            </div>
          </div>
          <div v-else class="ai-msg ai-msg--user">
            <div class="ai-msg-content">
              <div class="ai-bubble ai-bubble--user">
                <span class="ai-bubble-text">{{ msg.content }}</span>
              </div>
              <span class="ai-msg-time">{{ msg.time }}</span>
            </div>
          </div>
        </template>

        <!-- Typing indicator -->
        <div v-if="loading" class="ai-msg ai-msg--bot">
          <div class="ai-msg-avatar">🤖</div>
          <div class="ai-msg-content">
            <div class="ai-bubble ai-bubble--bot ai-typing">
              <span class="ai-dot-anim"></span>
              <span class="ai-dot-anim"></span>
              <span class="ai-dot-anim"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Input ─────────────────────────────────────────── -->
      <div class="ai-chat-footer">
        <div class="ai-input-row">
          <textarea
            id="ai-chat-input"
            v-model="inputText"
            rows="1"
            placeholder="Ask about stock, orders, suppliers…"
            :disabled="loading"
            @keydown.enter.exact.prevent="send"
            @input="autoResize"
            ref="inputRef"
          ></textarea>
          <button
            id="ai-send-btn"
            class="ai-send-btn"
            :disabled="loading || !inputText.trim()"
            @click="send"
            title="Send (Enter)"
          >
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
        <p class="ai-hint">Press <kbd>Enter</kbd> to send</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useChatStore } from "@/stores/chatStore";

export default defineComponent({
  name: "AiChats",

  setup() {
    const chatStore = useChatStore();
    const { messages, loading } = storeToRefs(chatStore);
    const { sendMessage, clearChat } = chatStore;

    const inputText = ref("");
    const messagesContainer = ref<HTMLElement | null>(null);
    const inputRef = ref<HTMLTextAreaElement | null>(null);

    const suggestions = [
      "What products are low on stock?",
      "Show me all pending orders",
      "Which supplier has the most orders?",
      "Summarise today's stock movements",
    ];

    // ── Scroll helpers ──────────────────────────────────────
    const scrollToBottom = () => {
      // nextTick waits for Vue to update the DOM
      nextTick(() => {
        const el = messagesContainer.value;
        if (!el) return;
        el.scrollTop = el.scrollHeight;

        // Second pass: some browsers need a tiny delay after content renders
        setTimeout(() => {
          if (messagesContainer.value) {
            messagesContainer.value.scrollTop =
              messagesContainer.value.scrollHeight;
          }
        }, 80);
      });
    };

    // Scroll when a new message is added (after DOM update)
    watch(() => messages.value.length, scrollToBottom, { flush: "post" });

    // Scroll when typing indicator appears / disappears
    watch(() => loading.value, scrollToBottom, { flush: "post" });

    // Restore scroll position for persisted messages on mount
    onMounted(() => {
      scrollToBottom();
    });

    // ── Input helpers ───────────────────────────────────────
    const autoResize = () => {
      const el = inputRef.value;
      if (el) {
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 100) + "px";
      }
    };

    const send = async () => {
      const text = inputText.value.trim();
      if (!text || loading.value) return;
      inputText.value = "";
      if (inputRef.value) inputRef.value.style.height = "auto";
      await sendMessage(text);
      inputRef.value?.focus();
    };

    const handleSuggestion = (text: string) => {
      inputText.value = text;
      send();
    };

    return {
      messages,
      loading,
      inputText,
      messagesContainer,
      inputRef,
      suggestions,
      send,
      handleSuggestion,
      clearChat,
      autoResize,
    };
  },
});
</script>

<style scoped>
/* ── Wrapper ──────────────────────────────────────────────── */
.ai-chat-wrapper {
  display: flex;
  flex-direction: column;
  /* Use a fixed height so the flex children work even if the
     Bootstrap tab parents don't propagate height */
  height: 500px;
  max-height: 500px;
  overflow: hidden;
}

/* ── Header ───────────────────────────────────────────────── */
.ai-chat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #6c5dd3 0%, #5a4fc7 100%);
  color: #fff;
  flex-shrink: 0;
}
.ai-bot-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
}
.ai-chat-title {
  flex: 1;
  min-width: 0;
}
.ai-chat-title h6 {
  margin: 0;
  font-size: 12.5px;
  font-weight: 700;
  color: #fff;
}
.ai-status {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  gap: 4px;
}
.ai-online-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  flex-shrink: 0;
}
.ai-clear-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
  transition: background 0.2s;
}
.ai-clear-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* ── Messages body ────────────────────────────────────────── */
.ai-messages-body {
  flex: 1;
  overflow-y: auto; /* THIS is what enables scrolling  */
  overflow-x: hidden;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* min-height: 0 is REQUIRED for flex children to shrink
     below their content size and actually scroll */
  min-height: 0;
  scroll-behavior: smooth;
}
.ai-messages-body::-webkit-scrollbar {
  width: 3px;
}
.ai-messages-body::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

/* ── Welcome ──────────────────────────────────────────────── */
.ai-welcome {
  margin: auto;
  text-align: center;
  padding: 16px 8px;
  animation: fadeUp 0.4s ease;
}
.ai-welcome-icon {
  font-size: 38px;
  margin-bottom: 10px;
}
.ai-welcome h6 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
}
.ai-welcome p {
  font-size: 11.5px;
  color: #6b7280;
  margin-bottom: 12px;
  line-height: 1.55;
}
.ai-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}
.ai-chip {
  background: #f3f0ff;
  color: #6c5dd3;
  border: 1px solid #d9d2f8;
  border-radius: 20px;
  padding: 5px 11px;
  font-size: 10.5px;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
}
.ai-chip:hover {
  background: #6c5dd3;
  color: #fff;
  border-color: #6c5dd3;
}

/* ── Message rows ─────────────────────────────────────────── */
.ai-msg {
  display: flex;
  align-items: flex-end;
  gap: 7px;
  animation: fadeUp 0.22s ease;
  flex-shrink: 0; /* prevent messages from being compressed */
}
.ai-msg--user {
  flex-direction: row-reverse;
}
.ai-msg-avatar {
  font-size: 17px;
  flex-shrink: 0;
  line-height: 1;
}
.ai-msg-content {
  display: flex;
  flex-direction: column;
  max-width: 84%;
}
.ai-msg--user .ai-msg-content {
  align-items: flex-end;
}

/* ── Bubbles ──────────────────────────────────────────────── */
.ai-bubble {
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 12.5px;
  line-height: 1.55;
  word-break: break-word;
}
.ai-bubble--bot {
  background: #f3f4f6;
  color: #111827;
  border-bottom-left-radius: 4px;
}
.ai-bubble--user {
  background: linear-gradient(135deg, #6c5dd3, #8b78f5);
  color: #fff;
  border-bottom-right-radius: 4px;
}
.ai-bubble--error {
  background: #fee2e2 !important;
  color: #dc2626 !important;
  border: 1px solid #fca5a5;
}
.ai-bubble-text {
  display: block;
  white-space: pre-wrap;
}
.ai-msg-time {
  font-size: 10px;
  color: #9ca3af;
  margin-top: 3px;
  padding: 0 3px;
}

/* ── Typing indicator ─────────────────────────────────────── */
.ai-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 14px;
  min-width: 48px;
}
.ai-dot-anim {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #9ca3af;
  display: inline-block;
  animation: bounce 1.2s infinite ease-in-out;
}
.ai-dot-anim:nth-child(2) {
  animation-delay: 0.2s;
}
.ai-dot-anim:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-6px);
  }
}

/* ── Footer / Input ───────────────────────────────────────── */
.ai-chat-footer {
  padding: 9px 12px 7px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  flex-shrink: 0; /* footer must never shrink */
}
.ai-input-row {
  display: flex;
  align-items: flex-end;
  gap: 7px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  padding: 5px 5px 5px 12px;
  transition: border-color 0.2s;
}
.ai-input-row:focus-within {
  border-color: #6c5dd3;
}
.ai-input-row textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  font-size: 12.5px;
  color: #111827;
  line-height: 1.5;
  max-height: 100px;
  overflow-y: auto;
  padding: 2px 0;
}
.ai-input-row textarea::placeholder {
  color: #9ca3af;
}
.ai-input-row textarea:disabled {
  opacity: 0.5;
}
.ai-send-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #6c5dd3, #8b78f5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 12px;
  transition:
    opacity 0.18s,
    transform 0.15s;
}
.ai-send-btn:hover:not(:disabled) {
  opacity: 0.88;
  transform: scale(1.06);
}
.ai-send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.ai-hint {
  font-size: 10px;
  color: #9ca3af;
  text-align: center;
  margin: 5px 0 0;
}
.ai-hint kbd {
  background: #e5e7eb;
  border-radius: 3px;
  padding: 1px 4px;
  font-size: 9px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
