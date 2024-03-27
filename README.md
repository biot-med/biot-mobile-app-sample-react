# BioT React Native Sample Application

This project aims to be a strong foundation for react-native sample applications. It provides a clear and organized structure, core dependencies, and boilerplate to jumpstart development the app within BioT platform.

# About the app

The sample mobile app is designed to simulate a Bluetooth Low Energy (BLE) device integration within a healthcare context. The app allows users to either log in or perform a self-sign-up, creating a patient entity. In the simulated environment, users can search for fake BLE devices, create a symbolic entity representing the found device, and associate it with the patient.

The app features a Simulation Dashboard enabling users to initiate sessions, transmit integer, decimal, and waveform measurements, and conclude sessions with summary information. 

## Prerequisites

- [Node.js > 16](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode) - IDE need for IOS development part of the project
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) - used by Android studio
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

For your information the BioT Sample Mobile App relies on the following core dependencies:

- [react](https://react.dev/)The ReactJS library, providing the foundation for building interactive user interfaces in the app.
- [react-native](https://reactnative.dev/) The React Native Framework, enabling the development of cross-platform mobile applications with a single codebase.
- [axios](https://github.com/axios/axios) Used for networking, Axios is a popular JavaScript library that facilitates making HTTP requests from the app.
- [redux-toolkit](https://redux-toolkit.js.org/) This library simplifies and optimizes the usage of Redux, a state management tool, making the app's state management more efficient.
- [redux-saga](https://redux-saga.js.org/) Redux Saga is employed to dispatch asynchronous actions within the app, handling complex side effects seamlessly.
- [aws-iot-device-sdk-v2](https://github.com/aws/aws-iot-device-sdk-js-v2) The AWS IoT Device SDK v2 is utilized to connect the app to the AWS IoT service, enabling secure communication with Internet of Things devices.

These dependencies form the core infrastructure of the BioT Sample Mobile App, providing essential functionalities for networking, state management, asynchronous actions, and secure communication with AWS IoT.

## Usage

### Using biot-mobile-app-sample-react

The BioT Mobile App Sample React is a mobile application built using React Native and TypeScript.

The App requires a properly configured environment to function seamlessly. This configuration is achieved by running a Python script. 

Follow the steps presented in [scripts/README.md](scripts/README.md)

1. #### Clone the Repository:
Start by cloning the repository containing the BioT Mobile App Sample React.
```bash
git clone https://bitbucket.org/softimize/biot-mobile-app-sample-react.git
cd biot-mobile-app-sample-react
```
2. #### Prepare the React Native Environment:
```bash
cd biot-mobile-app-sample-react
npm install
```

3. #### iOS Specific Steps:
If you are using Xcode 12.5 or higher, navigate to the /ios directory and execute the following command:
```bash
cd ios
pod install --repo-update
```

3. #### Run the Application:
Start the application using either npm or yarn:
```bash
npm run ios
# or 
npm run android
```
If you prefer using yarn:
```bash
yarn ios
# or
yarn android
```

#### Troubleshooting

If you encounter issues while installing the aws-iot-device-sdk-v2, refer to the following manual for guidance: [AWS IoT Core and React Native Integration.](https://pedromarta.medium.com/pub-sub-implementation-using-aws-iot-core-and-react-native-2228e77e8699)

Keep in mind that renaming a project utilizing Pods on the iOS side may cause complications. Ensure that you follow the provided steps carefully and refer to the troubleshooting section for any encountered errors.

### Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `@biotmed`: This folder contains all api calls to BioT services.
  - `app`: This folder contains all app main files.
  - `assets`: Asset folder to store all images, vectors, translations etc.
  - `components`: Folder to store any common component that you use through your app (such as a styled button etc)
  - `config`: This folder contains all app environment configurations.
  - `navigation`: This folder contains navigation structure, definitions, styles of the app.
  - `screens`: This folder contains all the screens of the app with all related elements to it, like styles and stores.
	- `loading`: This folder contains loading screen.
	- `login`: This folder contains login screen.
	- `monitoring`: This folder contains device monitoring screen.
	- `profile`: This folder contains profile screen.
	- `search-devices`: This folder contains simulated device search screen.
	- `signup`: This folder contains signup screen.
	- `stop-session`:  This folder contains stop session screen.
  - `store`: This folder should have all your common reducers (like auth or settings), and expose the combined result using its `store/index.ts`
  - `theme`: Folder that contains all theme style definitions of the app.
  - `utils`: Folder that contains all utils used in app.

## Splash screen customization

To customize the splash screen (logo and background color) following manual [react-native-splash-screen](https://blog.logrocket.com/building-splash-screens-react-native/).

## Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store

# How to use it

The idea of this section is to explain how the template composition is the best and easiest to use when you try to use well-formed, architectures, especially using redux flow.

The template follows a simple and convenient exporting pattern. The folder index exposes the resources, allowing to import all from the same path.

With that in mind, we are going to look at each folder to explain how to use it.

## Components

Within this project, the Components directory serves as the repository for the fundamental building blocks of our React Native application. To streamline the development process and encourage reusability, all components within this directory are uniformly organized at the same nesting level.

### Common Components list
- `base-container`
- `styled-button`
- `styled-modal`
- `styled-textinput`

## Static resources (assets):

Static resources in software development are unchanging assets like images, fonts, and translations that remain constant and play a key role in enhancing user interfaces, defining styles, and configuring applications.

## Redux-Toolkit and Redux-Saga

- `Redux Toolkit`: Redux Toolkit is a library that simplifies the process of working with Redux, making it more efficient and developer-friendly. It provides a set of utilities and conventions to streamline common Redux patterns, reducing boilerplate code. Key features of Redux Toolkit include:

	- `Reducers`: It offers a createSlice function for generating Redux reducers, reducing the need for repetitive code.
	- `Immutable State Updates`: Redux Toolkit encourages immutability and handles updates to the state in a more intuitive way.
	- `Structured State Management`: It promotes well-structured state management with fewer surprises and cleaner code.
	- `DevTools Configuration`: Redux Toolkit simplifies the setup of Redux DevTools for debugging.

In your project, you can use Redux Toolkit to efficiently manage the application's state, handle actions, and simplify the overall Redux configuration, enhancing code maintainability and reducing development time.

- `Redux Saga`: Redux Saga is a middleware library for Redux that specializes in handling side effects and asynchronous operations. It helps manage complex tasks, such as making API requests or dealing with asynchronous actions, in a more organized and predictable way. Key features of Redux Saga include:

	- `Declarative and Readable`: Redux Saga allows you to write side effect logic in a declarative and readable manner using generator functions.
	- `Async Action Handling`: It excels in handling complex asynchronous actions like making API calls or handling delays.
	
In your project, Redux Saga can be employed to manage asynchronous operations like network requests, authentication, and more, ensuring a smooth and reliable user experience without blocking the main thread.

Both Redux Toolkit and Redux Saga can be used together in a project, with Redux Toolkit simplifying the state management and Redux Saga handling the asynchronous aspects, creating a robust and maintainable architecture for your React Native app.

## @biotmed API

To keep the networking layer simple, the template uses a single Axios instance in the `@biotmed/common/Axios.ts`. 

When you need communication with a service you have to create a sub directory under `@biotmed/api` with name of your are of interest (like you can see `device`) and `index.ts` file inside it with all relavent api calls. Please see one of the apis there for example.

In addition to REST API we are using AWS MQTT client for sending measurements of simulated device.

## Screens

In this folder, you have the main objects to apply the composition architecture. Just create a folder for each screen you have in your application, call all the components and static resources you need to render the scene and finally use the corresponding hooks to interact with redux and create behaviors depending on the store.

To keep the structure, extract the styles from the component file and place it in a `components/styles.ts`.
All the data types are defined under `interfaces` directory as `*.d.ts` files.

## Store folders

Each store folder divide contains two main files: `slice.ts` and `saga.ts`.

- `slice.ts`: Responsible for managing all the components of the redux-toolkit
- `saga.ts`: Implements all the side actions of the redux.
