# Shoppy AI

Shoppy AI is a React Native application that provides users with AI-powered product suggestions. Users can input a query describing their needs, and the app will leverage an AI model to provide relevant product recommendations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm
- Expo CLI
- Android Studio or Xcode for device emulation

### Installing

1.  Clone the repository:
    ```bash
    git clone https://github.com/Sreejit-Sengupto/shoppy-rn
    ```
2.  Install dependencies:
    ```bash
    cd shoppy-rn
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```

## Architecture

The application is built using React Native and Expo, with a component-based architecture. The main components of the application are:

-   **App.tsx:** The main entry point of the application, which sets up the navigation and theme.
-   **Screens:** The application has two main screens:
    -   **Home:** The main screen where users can input their product queries.
    -   **Details:** This screen displays the AI-powered product suggestions based on the user's query.
-   **Components:** Reusable components are used throughout the application to maintain a consistent look and feel.
-   **Context:** The application uses React Context to manage the global state of the application, such as the user's query.
-   **Gemini:** The application uses the Gemini API to generate product suggestions based on the user's query.

### Data Flow

1.  The user enters a query in the `HomeScreen`.
2.  The query is stored in the `QueryContext`.
3.  The user navigates to the `DetailScreen`.
4.  The `DetailScreen` retrieves the query from the `QueryContext` and makes a request to the Gemini API.
5.  The Gemini API returns a list of product suggestions.
6.  The `DetailScreen` displays the product suggestions to the user.

## Approach

The following are some of the key design decisions made during the development of the application:

-   **React Native and Expo:** React Native and Expo were chosen to enable cross-platform development for both Android and iOS.
-   **Tailwind CSS:** Tailwind CSS is used for styling the application, which allows for rapid development and easy customization.
-   **Gemini API:** The Gemini API is used to generate product suggestions, which provides a powerful and flexible way to generate high-quality recommendations.
-   **React Context:** React Context is used for state management, which provides a simple and efficient way to share data between components.

## File Structure

```
.
├── assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
├── components
│   └── Spinner.tsx
├── context
│   └── query-store.tsx
├── gemini
│   └── index.ts
├── screens
│   ├── details.tsx
│   └── home.tsx
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
└── tsconfig.json
```

-   **assets:** Contains static assets such as images and icons.
-   **components:** Contains reusable components used throughout the application.
-   **context:** Contains the React Context for managing the global state of the application.
-   **gemini:** Contains the code for interacting with the Gemini API.
-   **screens:** Contains the main screens of the application.
-   **App.tsx:** The main entry point of the application.

## Available Scripts

-   `npm start`: Starts the development server.
-   `npm run android`: Starts the development server and runs the application on an Android emulator or device.
-   `npm run ios`: Starts the development server and runs the application on an iOS emulator or device.
-   `npm run web`: Starts the development server and runs the application in a web browser.
-   `npm run lint`: Lints the code using ESLint and Prettier.
-   `npm run format`: Formats the code using ESLint and Prettier.

## Dependencies

-   **@react-navigation/native:** A library for handling navigation in React Native applications.
-   **@react-navigation/native-stack:** A library for creating a stack-based navigator.
-   **@google/genai:** A library for interacting with the Gemini API.
-   **expo:** A framework for building universal React applications.
-   **nativewind:** A library for using Tailwind CSS in React Native applications.
-   **react-native-reanimated:** A library for creating smooth animations in React Native applications.
-   **lucide-react-native:** A library of icons for React Native applications.
