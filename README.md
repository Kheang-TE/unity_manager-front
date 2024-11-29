# Unity Manager
![Project Logo](/public/img/unity_manager_logo.webp)
## General Information
- **Project Name**: projet-gestionnaire-projet-front
- **Version**: 0.1.0
- **Private**: Yes
- **Type**: module
- **Description**: Unity Manager is a dynamic project management application featuring real-time collaboration tools, including an integrated chat system. It allows teams to efficiently manage tasks, track project progress, and communicate seamlessly within a single platform.
- **Author**: Kheang TE, Mohamed ZERROUKI, Xavier Landron, Henry Iosipov
- **License**: ISC

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
    ```sh
    git clone git@github.com:Kheang-TE/unity_manager-front.git
    ```
2. Navigate to the project directory:
    ```sh
    cd unity_manager-front
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Project
To start the development server:
    ```sh
    npm run dev
    ```
    or
    ```sh
    yarn dev
    ```

To build the project for production:
    ```sh
    npm run build
    ```
    or
    ```sh
    yarn build
    ```

To preview the production build:
    ```sh
    npm run preview
    ```
    or
    ```sh
    yarn preview
    ```

## Project Structure
```
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── public
│   ├── css
│   │   └── main.css
│   └── img
│       ├── background_parallax.webp
│       ├── background-wall.webp
│       ├── favicon.ico
│       └── unity_manager_logo.webp
├── README.md
├── src
│   ├── api
│   │   ├── axios.js
│   │   ├── card.js
│   │   ├── list.js
│   │   ├── message.js
│   │   ├── project.js
│   │   ├── tag.js
│   │   └── user.js
│   ├── App.vue
│   ├── components
│   │   ├── BoardHeader.vue
│   │   ├── Chat.vue
│   │   ├── HomeFooter.vue
│   │   ├── HomeHeader.vue
│   │   └── HomeNavigation.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── sockets
│   │   └── socket.js
│   ├── store
│   │   ├── board.store.js
│   │   ├── tag.store.js
│   │   └── user.store.js
│   ├── utils
│   │   └── handleTokenExpiry.js
│   └── views
│       ├── Board.vue
│       ├── Home.vue
│       ├── NotFound.vue
│       ├── SignIn.vue
│       └── SignUp.vue
└── vite.config.js
```

## Integration with Unity Manager API

This project utilizes the Unity Manager API to manage and orchestrate various components. This API is crucial for the functionality of our project as it provides essential management capabilities.

### API Documentation and Access
You can find more details about the Unity Manager API, including how to obtain access and integrate it with your projects, by visiting the following link: [Unity Manager API Documentation](https://github.com/O-clock-Muffin/projet-gestionnaire-projet-back). Please refer to the API's own README for comprehensive documentation and setup instructions.

## Dependencies
- **@fortawesome/fontawesome-svg-core**: ^6.5.2
- **@fortawesome/free-brands-svg-icons**: ^6.5.2
- **@fortawesome/free-regular-svg-icons**: ^6.5.2
- **@fortawesome/free-solid-svg-icons**: ^6.5.2
- **@fortawesome/vue-fontawesome**: ^3.0.6
- **axios**: ^1.7.1
- **bootstrap**: ^5.3.3
- **bootstrap-vue-next**: ^0.17.6
- **pinia**: ^2.1.7
- **socket.io**: ^4.7.5
- **socket.io-client**: ^4.7.5
- **vue**: ^3.4.27
- **vue-router**: ^4.3.0
- **vuedraggable**: ^4.1.0

## Dev Dependencies
- **@vitejs/plugin-vue**: ^5.0.4
- **concurrently**: ^8.2.2
- **eslint**: ^8.57.0
- **eslint-config-airbnb-base**: ^15.0.0
- **eslint-import-resolver-node**: ^0.3.9
- **eslint-plugin-import**: ^2.29.1
- **eslint-plugin-vue**: ^9.26.0
- **unplugin-vue-components**: ^0.27.0
- **vite**: ^5.2.8
