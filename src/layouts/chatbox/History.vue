<template>
  <div class="tab-pane fade" id="history">
    <div class="card mb-sm-3 mb-md-0 note_card">
      <div class="card-header chat-list-header text-center">
        <a href="javascript:void(0);" @click="startNewChat" title="New Chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </a>
        <div>
          <h6 class="mb-1">Chat History</h6>
          <p class="mb-0">Your previous conversations</p>
        </div>
        <a href="javascript:void(0);" @click="startNewChat">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect x="0" y="0" width="24" height="24" />
              <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="1" />
              <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero" />
            </g>
          </svg>
        </a>
      </div>
      <div class="card-body contacts_body p-0 dz-scroll" id="DZ_W_Contacts_Body2">
        <ul class="contacts">
          <li 
            v-for="session in sessions" 
            :key="session.id" 
            :class="{ active: session.id === activeSessionId }"
            @click="selectSession(session.id)"
            style="cursor: pointer;"
          >
            <div class="d-flex bd-highlight">
              <div class="user_info">
                <span>{{ session.title }}</span>
                <p>{{ session.date }}</p>
              </div>
              <div class="ms-auto">
                <a href="javascript:void(0);" class="btn btn-danger btn-xs sharp" @click.stop="deleteSession(session.id)">
                  <i class="fa fa-trash"></i>
                </a>
              </div>
            </div>
          </li>
          <li v-if="sessions.length === 0">
            <div class="d-flex bd-highlight justify-content-center mt-4">
              <span class="text-muted">No chat history found.</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'History',
  setup() {
    const chatStore = useChatStore()
    const { sessions, activeSessionId } = storeToRefs(chatStore)
    const { loadSession, deleteSession, startNewSession } = chatStore

    const selectSession = (id: string) => {
      loadSession(id)
      // Switch tab to chat
      const chatTab = document.querySelector('a[href="#chat"]') as HTMLElement
      if (chatTab) {
        chatTab.click()
      }
    }

    const startNewChat = () => {
      startNewSession()
      const chatTab = document.querySelector('a[href="#chat"]') as HTMLElement
      if (chatTab) {
        chatTab.click()
      }
    }

    return {
      sessions,
      activeSessionId,
      selectSession,
      deleteSession,
      startNewChat
    }
  }
})
</script>

<style scoped>
.contacts li {
  transition: background-color 0.2s;
}
.contacts li:hover {
  background-color: rgba(0,0,0,0.03);
}
.user_info span {
  font-weight: 500;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}
</style>
