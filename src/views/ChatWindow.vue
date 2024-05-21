<template>
 <div class="chat-container" v-if="showChat">
      <div class="header">
        Chat with all collaborators
        <div class="buttons">
          <button id="btn-Chat-Close" type="button" :class="chatButtonClass" @click="toggleChat">
          </button>
       <button @click="showModal" id="clearBtn"><i class="bi bi-trash3-fill"></i>
       </button>
      </div>
      </div>
      <div class="userlist">
        <b-dropdown text="Show all users" variant="light" size="sm">
          <b-dropdown-item disabled><i class="bi bi-people-fill"></i></b-dropdown-item>
          <b-dropdown-item v-for="user in users" :key="user.id" @click="selectUser(user.id)"><i class="bi bi-person-circle"></i>
            {{ user.id === currentUser.id ? 'Me' : user.username }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    <div class="chat-messages" ref="chatMessages">
      <div class="message" v-for="msg in messages" :key="msg.text">
        <div class="text-style">
          <span class="username" :class="{ 'me-username': msg.user.id === currentUser.id }"><i class="bi bi-person-circle"></i> {{ msg.user.id ===
            currentUser.id ? 'Me' : msg.user.username }}</span>
          <span class="text">{{ msg.text }}</span>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Your message" v-model="message" @keyup.enter="sendMessage" />
      <button @click="sendMessage" class="btn btn-secondary custom-btn-color"><i class="bi bi-send-fill"></i></button>
    </div>
  </div>
  <button id="btn-Chat-Open" type="button"  @click="toggleChat">
      <i class="bi bi-chat-dots-fill"></i>
    </button>
   
  <!-- Modal -->
  <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmModalLabel">Confirm Deletion</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete all messages?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="clearMessages">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

/**
 * Component for managing chat functionality.
 * @module ChatManager
 * @exports default
 */
export default {
  name: 'ChatWindow',
  /**
   * Data properties for the chat manager component.
   * @returns {object} Data object.
   */
  data() {
    return {
      showChat: false,
      chatButtonClass: 'btn btn-secondary chat-toggle',
      currentUser: null,
      users: [],
      selectedUser: '',
      messages: [],
      message: '',
      activeChat: null,
    }
  },

  /**
   * Lifecycle hook called when the component is created.
   * Initializes the socket connection and sets up event listeners.
   */
  created() {
    this.socket = io('http://localhost:4000');

    // Event listener for receiving new messages
    this.socket.on('message', ({ user, message }) => {
      this.messages.push({ user, text: message });
      this.scrollToBottom();
    });

    // Event listener for receiving chat state
    this.socket.on('chatState', (data) => {
      this.users = data.users;
      this.messages = data.messages.map(msg => ({ user: msg.user, text: msg.message }));
      this.scrollToBottom();
    });

    // Event listener for receiving user state
    this.socket.on('userState', (userFromServer) => {
      this.currentUser = userFromServer;
    });
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
    /**
     * Resets the messages array.
     */
    resetMessages() {
      this.messages = [];
    },
    /**
     * Toggles the visibility of the chat window.
     * Updates the button class accordingly.
     */
    toggleChat() {
      this.showChat = !this.showChat;
      if (this.showChat) {
        this.chatButtonClass = 'btn btn-close';
      }
    },

    /**
     * Sends a message through the socket connection.
     */
    sendMessage() {
      if (this.message.trim() === '') return;
      this.socket.emit('send', this.message);
      this.message = '';
      this.scrollToBottom();
    },

    /**
     * Selects a user for a private chat.
     * @param {string} userId - The ID of the user to select.
     */
    selectUser(userId) {                 // revoir cette fonction !!!!!!!!!
      this.selectedUser = userId;
      const existingChat = this.activeChat && this.activeChat.user.id === userId;
      if (!existingChat) {
        this.activeChat = {
          user: this.users.find(user => user.id === userId),
          messages: []
        };
      }
    },

    /**
     * Scrolls the chat window to the bottom.
     */
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
     /**
    * Shows the modal dialog.
    */
    showModal() {
      $('#confirmModal').modal('show');
    },

    /**
     * Clears the messages array and hides the modal dialog.
     */
    clearMessages() {
      this.resetMessages();
      $('#confirmModal').modal('hide');
    },
  },
};
</script>


<style scoped>
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
     align-items: center;
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