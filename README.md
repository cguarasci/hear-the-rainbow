# hear-the-rainbow
Choose a color and enter a genre and we'll help you make a playlist that fits your color mood, that you can add straight to your Spotify account.


<video width="630" height="300" src="https://github.com/cguarasci/hear-the-rainbow/assets/60052312/709446ef-138c-4ccd-8106-e1b73f677b4d"></video>
<video width="630" height="300" src="https://github.com/cguarasci/hear-the-rainbow/assets/60052312/59314801-7c8c-4fe5-98f6-151c50520860"></video>
<video width="630" height="300" src="https://github.com/cguarasci/hear-the-rainbow/assets/60052312/0625d12f-2f27-45b5-9fb4-6e8e2276aadf"></video>
<img width="600" alt="4th_demo" src="https://github.com/cguarasci/hear-the-rainbow/assets/60052312/ea31baae-aa38-41a0-ae5a-7ea1be2a0046">
<video width="630" height="300" src="https://github.com/cguarasci/hear-the-rainbow/assets/60052312/595568e6-196e-4a70-9f46-bd173603ce91"></video>


## Getting Started

To run the app locally, follow these steps:

1. Clone the repository to your local machine.

2. Navigate to the project directory:

   ```
   cd hear-the-rainbow
   ```

3. Install the dependencies by running:

    ```
    npm install
    ```

4. Start the development server by running:

    ```
    npm run start
    ```

    This command will transpile your code using Babel and bundle it with Webpack. Then, it will start the development server.

5. Open your web browser and visit http://localhost:3000 to access the app.

## Available Scripts

In the project directory, you can run the following scripts:

 - `npm run start`: Starts the development server and runs the app in development mode.
 - `npm run build`: Builds the app for production, generating an optimized bundle in the dist folder.
 - `npm test`: Launches the test runner in interactive watch mode.
 - `npm run eject`: Removes the single build dependency and copies configuration files into the project, allowing customization.

## Folder Structure

The project structure is organized as follows:

 - `src`: Contains the source code for the React application.
    - `index.js`: Entry point of the application.
    - `components`: Contains React components used in the app.
    - `index.css`: Styles specific to the application.
    - `registerServiceWorker.js`: Service worker for offline support.
    - `util`: Contains utility files used in the app.
        - `Spotify.js`: Provides utility functions for interacting with the Spotify API.
 - `public`: Contains the public assets and the HTML file.
    - `index.html`: The main HTML file that hosts the app.
