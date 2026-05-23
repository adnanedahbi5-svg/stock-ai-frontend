import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  time: string
  error?: boolean
}

export interface ChatSession {
  id: string
  title: string
  date: string
  messages: ChatMessage[]
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const SESSIONS_KEY = 'ai_chat_sessions'
const CURRENT_SESSION_ID_KEY = 'ai_chat_current_session_id'

function nowTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function nowDate(): string {
  return new Date().toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Load sessions saved in localStorage. */
function loadSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Save sessions to localStorage. */
function persistSessions(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  } catch {
    // ignore quota errors
  }
}

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const useChatStore = defineStore('chat', () => {

  // ── State ──────────────────────────────────
  const sessions = ref<ChatSession[]>(loadSessions())
  const loading  = ref(false)
  const error    = ref<string | null>(null)

  const activeSessionId = ref<string | null>(localStorage.getItem(CURRENT_SESSION_ID_KEY))

  // ── Getters ────────────────────────────────

  // Find active session
  const activeSession = computed(() => sessions.value.find(s => s.id === activeSessionId.value))

  // The messages for the active session, or empty if none
  const messages = computed(() => activeSession.value?.messages || [])

  /** API-ready history: only role + content, excludes the newest message. */
  function buildApiHistory(excludeLast = false): { role: string; content: string }[] {
    const list = excludeLast ? messages.value.slice(0, -1) : messages.value
    return list.map(m => ({ role: m.role, content: m.content }))
  }

  // ── Actions ────────────────────────────────

  function startNewSession() {
    activeSessionId.value = null
    localStorage.removeItem(CURRENT_SESSION_ID_KEY)
  }

  function loadSession(id: string) {
    if (sessions.value.find(s => s.id === id)) {
      activeSessionId.value = id
      localStorage.setItem(CURRENT_SESSION_ID_KEY, id)
    }
  }

  function deleteSession(id: string) {
    sessions.value = sessions.value.filter(s => s.id !== id)
    persistSessions(sessions.value)
    if (activeSessionId.value === id) {
      startNewSession()
    }
  }

  /**
   * Send a user message to the Laravel AI endpoint.
   * The store keeps the conversation history so every request is aware
   * of the full prior context (multi-turn conversation).
   */
  async function sendMessage(userText: string): Promise<void> {
    if (!userText.trim() || loading.value) return

    error.value = null

    // If no active session, create one
    if (!activeSessionId.value || !activeSession.value) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: userText.trim().substring(0, 30) + (userText.trim().length > 30 ? '...' : ''),
        date: nowDate(),
        messages: []
      }
      sessions.value.unshift(newSession)
      activeSessionId.value = newSession.id
      localStorage.setItem(CURRENT_SESSION_ID_KEY, newSession.id)
    }

    const currentSession = activeSession.value!

    // 1 – Capture history BEFORE adding the new user message
    const history = buildApiHistory()

    // 2 – Optimistically add the user bubble
    currentSession.messages.push({ role: 'user', content: userText.trim(), time: nowTime() })
    persistSessions(sessions.value)
    loading.value = true

    try {
      const res = await api.post('chat/message', {
        message: userText.trim(),
        history,                   // history does NOT include the message we just sent
      })

      currentSession.messages.push({
        role:    'assistant',
        content: res.data.reply,
        time:    nowTime(),
        error:   !!res.data.error,
      })

    } catch (err: any) {
      const msg =
        err.response?.data?.reply   ||
        err.response?.data?.message ||
        'Something went wrong. Please try again.'

      error.value = msg

      currentSession.messages.push({
        role:    'assistant',
        content: msg,
        time:    nowTime(),
        error:   true,
      })
    } finally {
      loading.value = false
      persistSessions(sessions.value)
    }
  }

  /** Clear the active conversation */
  function clearChat(): void {
    if (activeSessionId.value) {
      deleteSession(activeSessionId.value)
    }
  }

  return {
    // state
    sessions,
    activeSessionId,
    messages,
    loading,
    error,
    // actions
    sendMessage,
    clearChat,
    startNewSession,
    loadSession,
    deleteSession
  }
})
