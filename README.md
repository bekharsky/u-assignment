# Unity test assignment

By Sergey Bekharsky

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Application features

1. Displays a list of all conversations in the left-side panel. Each conversation contains an avatar, username and an indicator informing whether there are any unread messages within that conversation.
2. Whenever a conversation is selected, its contents are be displayed in the right-side panel. Conversation messages are shown in chronological order (newest at the bottom). Timestamp is displayed next to each message.
3. The data is retrieved from the following [REST API](http://ui-developer-backend.herokuapp.com/api). There is no authentication and the API has the following endpoints:
   - GET `/conversations` - get all conversations
   - GET `/conversations/:conversationId/messages` - get all messages in a given conversation
   - GET `/users` - get all users
   - GET `/users/:userId` - get a single user

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
