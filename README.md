// https://github.com/ValeriaKharchenko/social_network

### Questions&Suggestions:
    1. Registration needs checks (DOB) , Errors with login
    2. LoginPage Error handling (when user puts password or email wrong)
    3. Some  quick popUp notification (when post is created or if wasn't successful)

### Update:
    1. Removed assets folder

### Working on: 
    <!-- Profile -->
        [x] - Shows groups I created 
            - (have to filter which I'm  joined and what is main)
        [x] - Settings 
        [ ] - need to show user posts && create Button

    <!-- Groups -->
        [x] - Making of create Group Button with follower invitations
        [x] - Group info Panel   ??? back gives back string object and with it error 500 if not admin ???
        [x] - Group link, page & components(files)
        [x] - Search for groups - Searchbar

            //Posts
        [x] - Making of create group post 
        [x] - showing group posts
        [ ] - Group Posts and single Post/Comments page

            //Events
        [x] - Making of create  group event form 
        [x] - showing group events
            [ ]-- need to add buttons for going/notgoing + requests

            //Todo
        [x] - join group component
            ON HOLD??? --- Need to know that request was sent somehow from back and change button
        [x] - made Invite_group_list component ( can use it in group page) 
            --- Need to update if no one else to invite after submiting
        [x] - invite follower component (Invite_group_btn)
        WORKING ON -  [ ] - GroupPage AdminPanel show requesting users (accept/denie buttons + requests)
        [ ] - needs to update when creating, posting in group automatically


    <!-- HELPERS -->
        [ ] - Function to clear all store (connect with logout [does the same store will be present in another browser/window/session])


### CHECKING LIST: 
    1. GET FREIND LIST FILTERED - not in particular group 
    2. CHECK GROUPS POST created_at
    3. Clear every store  - 2 stalkers in another user


///////////////////////////////////////////////////////////////////////////////////////////////////

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
