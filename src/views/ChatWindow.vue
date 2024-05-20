<template>
  <div class="chat-container" v-if="showChat">
    <div class="header">
      Chat with all collaborators
    </div>
    <div class="userlist">
      <b-dropdown text="Show all users" variant="light" size="sm">
        <b-dropdown-item disabled>Show all users</b-dropdown-item>
        <b-dropdown-item v-for="user in users" :key="user.id" @click="selectUser(user.id)">
          {{ user.id === currentUser.id ? 'Me' : user.username }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="chat-messages" ref="chatMessages">
      <div class="message" v-for="msg in messages" :key="msg.text">
        <div class="text-style">
          <span class="username" :class="{ 'me-username': msg.user.id === currentUser.id }">{{ msg.user.id ===
            currentUser.id ? 'Me' : msg.user.username }}</span>
          <span class="text">{{ msg.text }}</span>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Your message" v-model="message" @keyup.enter="sendMessage" />
      <button @click="sendMessage" class="btn btn-secondary custom-btn-color">SEND</button>
    </div>
  </div>
  <button id="btn-Chat-Close" type="button" :class="chatButtonClass" @click="toggleChat">
    {{ showChat ? '': 'Chat' }}
  </button>
</template>

<script>
import io from 'socket.io-client';

export default {
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
    };
  },

  /**
   * Lifecycle hook called when the component is created.
   * Initializes the socket connection and sets up event listeners.
   */
  created() {
    this.socket = io('http://localhost:4000');

    /**
     * Event listener for 'message' events.
     * Adds the received message to the messages array and scrolls to the bottom of the chat.
     * @param {Object} payload - The payload containing the user and the message.
     * @param {Object} payload.user - The user who sent the message.
     * @param {string} payload.message - The message text.
     */
    this.socket.on('message', ({ user, message }) => {
      this.messages.push({ user, text: message });
      this.scrollToBottom();
    });

    /**
     * Event listener for 'chatState' events.
     * Updates the users and messages arrays and scrolls to the bottom of the chat.
     * @param {Object} data - The data containing the current chat state.
     * @param {Array} data.users - The list of users.
     * @param {Array} data.messages - The list of messages.
     */
    this.socket.on('chatState', (data) => {
      this.users = data.users;
      this.messages = data.messages.map(msg => ({ user: msg.user, text: msg.message }));
      this.scrollToBottom();
    });

    /**
     * Event listener for 'userState' events.
     * Updates the current user state.
     * @param {Object} userFromServer - The current user object.
     */
    this.socket.on('userState', (userFromServer) => {
      this.currentUser = userFromServer;
    });
  },

  /**
   * Lifecycle hook called when the component is updated.
   * Scrolls to the bottom of the chat.
   */
  updated() {
    this.scrollToBottom();
  },

  methods: {
    /**
     * Toggles the chat window visibility.
     */
    toggleChat() {
      this.showChat = !this.showChat;
      if (this.showChat) {
        this.chatButtonClass = 'btn btn-close';
      } else {
        this.chatButtonClass = 'btn btn-secondary chat-toggle';
      }
    },

    /**
     * Sends a message.
     * Emits the message to the server and adds it to the messages array.
     */
    sendMessage() {
      if (this.message.trim() === '') return;
      this.socket.emit('send', this.message);
      this.messages.push({ user: this.currentUser, text: this.message });
      this.message = '';
      this.scrollToBottom();
    },

    /**
     * Selects a user for a private chat.
     * @param {string} userId - The ID of the user to select.
     */
    selectUser(userId) {
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

   #btn-Chat-Close {
     position: fixed;
     top: 20px;
     right: 20px;
   }
   </style>