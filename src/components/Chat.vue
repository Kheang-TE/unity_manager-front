<template>
  <b-offcanvas v-if="project.id" id="chat" placement="end" :backdrop="false">
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
        <b-dropdown-item  v-if="collaborators"  v-for="collaborator in collaborators" :key="collaborator.id" @click="selectUser(user.id)">
          <i class="bi bi-person-circle"></i> {{  collaborator.firstname +' '+collaborator.lastname || 'Me'  }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="chat-messages" ref="chatMessages">
      <div class="message"  v-for="message in messages" :key="message._id">
        <div class="text-style">
          <span class="username" :class="{ 'me-username': message.user_id }">
            <i class="bi bi-person-circle"></i> {{ message.user ? message.user.firstname + ' ' + message.user.lastname : 'Unknown user' }}
          </span>
          <span class="text">{{ message.content }}</span>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="Your message" v-model="message" @keyup.enter="sendMessage()" />
        <button @click="sendMessage()" class="btn btn-secondary">Send</button>
      </div>
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
  initializeChatState,
  initializeUserState,
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
    initializeChatState(this.handleChatStateReceived);

    initializeMessageReceived(this.handleMessageReceived);

    initializeUserState(this.handleUserStateReceived);
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
      console.log('newCollaborator:', this.newCollaborator);
    },
    updateProject(project) {
      this.boardStore.selectedProject = { ...project };
    },
    async handleCollaboratorReceived() {
      console.log('initializeCollaboratorReceived');
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

    /**
     * Sends a message to the server after removing leading and trailing whitespace.
     *
     * @return {Promise<void>} A promise that resolves when the message is successfully sent,
     *                         and rejects with an error if there was an issue sending the message.
     */
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

    /**
     * Resets the messages array.
     */
    // resetMessages() {
    //   this.messages = [];
    // },
    // /**
    //  * Toggles the visibility of the chat window.
    //  * Updates the button class accordingly.
    //  */
    // toggleChat() {
    //   this.showChat = !this.showChat;
    //   if (this.showChat) {
    //     this.chatButtonClass = 'btn btn-close';
    //   }
    // },

    /**
     * Sends a message through the socket connection.
    //  */
    // sendMessage() {
    //   if (this.message.trim() === '') return;

    //   this.socket.emit('sendMessage', this.message);
    //   this.message = '';
    //   this.scrollToBottom();
    // },

    /**
     * Selects a user for a private chat.
     * @param {string} userId - The ID of the user to select.
     */
    // selectUser(userId) { // revoir cette fonction !!!!!!!!!
    //   this.selectedUser = userId;
    //   const existingChat = this.activeChat && this.activeChat.user.id === userId;
    //   if (!existingChat) {
    //     this.activeChat = {
    //       user: this.users.find((user) => user.id === userId),
    //       messages: [],
    //     };
    //   }
    // },

    /**
     * Scrolls the chat window to the bottom.
     */
    scrollToBottom() {
      this.$nextTick(() => {
        const { chatMessages } = this.$refs;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
    /**
    * Shows the modal dialog.
    // */
    showModal() {
      $('#confirmModal').modal('show');
    },

    /**
     * Clears the messages array and hides the modal dialog.
     */
    // clearMessages() {
    //   this.resetMessages();
    //   $('#confirmModal').modal('hide');
    // },
  },
};

</script>

<style>
.offcanvas-body{
  display: flex;
  flex-direction: column;
}
.chat-container {
  position: fixed;
  overflow-y: auto;
  right: 0;
  bottom: 0;
  width: 40vh;
  height: 90vh;
  background-color: #fff;
  border: 1px solid #e6e6e6;
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
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
  }

   .text-style {
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     margin-bottom: 10px;
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
    height: 50%;
     overflow-y: auto;
     flex: 1;
   }

   .message {
     display: flex;
     padding: 10px;
     margin: 5px 0;
     border-radius: 5px;
     background-color: #f1f1f1;
     word-wrap: break-word;
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
