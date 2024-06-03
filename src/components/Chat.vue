<template>
  <b-button v-b-toggle.chat v-if="boardStore.project.messages">
    <font-awesome-icon :icon="['fas', 'comments']" />
  </b-button>
  <b-offcanvas v-if="project.id" @shown="scrollToBottom" id="chat" placement="end" :backdrop="false">
    <template #title>
      Collaborators
      <b-button v-b-modal.new-collaborator>
        <font-awesome-icon :icon="['fas', 'plus']" />
      </b-button>
      <b-modal id="new-collaborator" centered @ok="submitNewCollaborator(this.newCollaborator)">
        <template #title>
          Add new collaborator
        </template>
        <label for="newCollaboratorEmail">Enter the collaborator email:</label>
        <b-form-input id="newCollaboratorEmail" type="email" v-model="newCollaborator.email"></b-form-input>
      </b-modal>
    </template>
    <div class="userlist">
      <b-dropdown text="Show all users" variant="light" size="sm">
        <b-dropdown-item disabled><i class="bi bi-people-fill"></i></b-dropdown-item>
        <b-dropdown-item v-if="collaborators" v-for="collaborator in collaborators" :key="collaborator.id"
          @click="selectUser(user.id)">
          <i class="bi bi-person-circle"></i> {{ collaborator.firstname + ' ' + collaborator.lastname || 'Me' }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="chat-messages" ref="chatMessages">
      <div class="message" v-for="message in messages" :key="message._id">
        <div class="text-style">
          <span class="username" :class="{ 'me-username': message.user_id }">
            <i class="bi bi-person-circle"></i> {{ message.user ? message.user.firstname + ' ' + message.user.lastname :
              'Unknown user' }}
          </span>
          <span class="text">{{ message.content }}</span>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Your message" v-model="message" @keyup.enter="sendMessage()" />
      <button @click="sendMessage()" class="btn btn-secondary">Send</button>
    </div>
  </b-offcanvas>
</template>
<script>
/**
 * Component for managing chat functionality.
 * @module ChatManager
 * @exports default
 */
import { computed } from 'vue';
import {
  initializeMessageReceived,
  initializeCollaboratorReceived,
} from '@/sockets/socket.js';
import { createMessage, getMessagesbyProject } from '@/api/message.js';
import useBoardStore from '../store/board.store';
import useUserStore from '../store/user.store';

export default {
  setup() {
    const boardStore = useBoardStore();
    const userStore = useUserStore();
    const collaborators = computed(() => boardStore.collaborators);
    const messages = computed(() => boardStore.messages);
    const project = computed(() => boardStore.project);
    const newCollaborator = {};
    return {
      boardStore, userStore, collaborators, messages, project, newCollaborator,
    };
  },
  data() {
    return {
      selectedProject: null,
      showChat: false,
      chatButtonClass: 'btn btn-secondary chat-toggle',
      currentUser: null,
      users: [],
      selectedUser: '',
      message: '',
      activeChat: null,
    };
  },
  created() {
    initializeCollaboratorReceived(this.handleCollaboratorReceived);
    initializeMessageReceived(this.handleMessageReceived);
  },

  /**
   * Lifecycle hook called when the component is updated.
   * Scrolls to the bottom of the chat window.
   */
  updated() {
    this.scrollToBottom();
  },

  /**
   * Methods for interacting with the chat manager component.
   * @namespace methods
   */
  methods: {
    submitNewCollaborator() {
      this.newCollaborator = {
        email: this.newCollaborator.email,
        project_id: this.project.id,
      };
      this.boardStore.addCollaborator(this.newCollaborator);
    },
    updateProject(project) {
      this.boardStore.selectedProject = { ...project };
    },
    async handleCollaboratorReceived() {
      this.boardStore.fetchLastCollaborator();
    },

    async handleMessageReceived() {
      useBoardStore().selectedProject.messages = await getMessagesbyProject(useBoardStore().selectedProject.id);
      this.scrollToBottom();
    },
    handleChatStateReceived(data) {
      this.users = data.users;
      this.messages = data.messages.map((msg) => ({ user: msg.user, text: msg.message }));
      this.scrollToBottom();
    },

    handleUserStateReceived(userFromServer) {
      this.currentUser = userFromServer;
    },

    async sendMessage() {
      const trimmedMessage = this.message.trim();

      if (!trimmedMessage) return;

      createMessage({
        content: trimmedMessage,
        project_id: useBoardStore().selectedProject.id,
      })
        .then(() => {
          this.message = '';
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const { chatMessages } = this.$refs;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },

    showModal() {
      $('#confirmModal').modal('show');
    },

  },
};

</script>

<style>
.offcanvas-body {
  display: flex;
  flex-direction: column;
}

.header {
  padding: 10px;
  background-color: #f5f5f5;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.username {
  font-weight: bold;
  color: #fff;
  border-radius: 5px;
  background-color: #a6a6a6;
  padding: 0.1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.8rem;
}

.me-username {
  background-color: #267699;
  padding: 2px 5px;
  border-radius: 3px;
}

.text {
  padding-top: 0.5rem;
  overflow-wrap: break-word;
  max-width: 100%;
}

.text-style {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  max-width: 100%;
}

.user-info {
  padding: 10px;
  font-size: 12px;
}

.custom-btn-color {
  background-color: #FFAB27;
  border: none;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
}

.message {
  display: flex;
  padding: 10px;
  margin: 5px 0;
  max-width: 100%;
  border-radius: 5px;
  background-color: #f1f1f1;
}

.my-message {
  background-color: #d4edda;
}

.avatar {
  margin-right: 10px;
}

.chat-input {
  display: flex;
  justify-content: end;
  padding: 10px;
  background-color: #f9f9f9;
}

.chat-input input {
  flex: 1;
  padding: 6px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#btn-Chat-Open {
  position: fixed;
  top: 20px;
  right: 20px;
  border: none;
  background-color: #fff;
  font-size: 25px;
  color: #666666;
}

#clearBtn {
  border: none;
  background-color: #F5F5F5;
  font-size: 22px;
  color: #666666;
}

#btn-Chat-Close {
  font-size: 20px;
}
</style>
