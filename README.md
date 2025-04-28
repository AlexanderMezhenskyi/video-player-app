# 📘 Project Documentation (Vue 3 + TypeScript + Vite)

## 🌐 Live Demo

The application is deployed on GitHub Pages:  
👉 [video-player-app](https://alexandermezhenskyi.github.io/video-player-app)

## 🚀 Getting Started

To set up the project locally, follow these steps:

1. **Install Dependencies**  
   Run the following command in the root directory to install all libraries defined in `package.json`:

   ```bash
   yarn install
   ```

2. **Start Development Server**  
   Launch the Vite development server:

   ```bash
   yarn dev
   ```

   After startup, the app will be available at the URL shown in the terminal ([http://localhost:5173/video-player-app/](http://localhost:5173/video-player-app/)).

3. **Build for Production**  
   Create an optimized production build:

   ```bash
   yarn build
   ```

   The build output will be located in the `dist` directory.

4. **Preview Production Build Locally**  
   Serve the built application locally to test the production version:

   ```bash
   yarn preview
   ```

---

## 🧩 Available Scripts

The `package.json` file includes several useful scripts. Run them using:

```bash
yarn <script_name>
```

| Script      | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| `dev`       | Starts the Vite dev server with Hot Module Replacement.                 |
| `build`     | Bundles the app for production into the `dist` folder.                  |
| `preview`   | Serves the production build locally using a static file server.         |
| `lint`      | Runs ESLint to ensure code style consistency.                           |
| `format`    | Runs Prettier to enforce code formatting rules.                         |
| `predeploy` | Automatically runs `yarn build` before deploying to GitHub Pages.       |
| `deploy`    | Deploys the `dist` folder to GitHub Pages using the `gh-pages` package. |

## 🌐 Proxy Server

For some requests, a proxy server is used to handle CORS issues. The proxy server is deployed on Vercel and can be found in the following repository:

[Proxy server repository - https://github.com/AlexanderMezhenskyi/video-player-app-proxy](https://github.com/AlexanderMezhenskyi/video-player-app-proxy)

The proxy server is used to manage requests within the application and ensures smooth functionality.

## 🎮 Keyboard Shortcuts

The video player provides several keyboard shortcuts for quick navigation and control. Here are the available shortcuts:

| Key              | Action                     |
| ---------------- | -------------------------- |
| `Space / k`      | Toggle Play / Pause        |
| `ArrowLeft / j`  | Seek backward (10 seconds) |
| `ArrowRight / l` | Seek forward (10 seconds)  |
| `m`              | Toggle Mute                |
| `ArrowUp`        | Increase volume (by 10%)   |
| `ArrowDown`      | Decrease volume (by 10%)   |
| `f`              | Toggle Fullscreen          |
| `c`              | Toggle Captions            |
