// https://github.com/ValeriaKharchenko/social_network


### BACKLOG [Questions&Suggestions]:
    [ OPTIONAL ] 1. Some  quick popUp notification (when post is created or if wasn't successful)
    [ OPTIONAL ] 2. USER PROFILE - profile update tab, privacy button changeing back to public after leaving tab (needs to update to right state) 
    [ OPTIONAL ] 3. SEARCHBAR - Fetching on every keystroke (put status there or into store )


### Completed Updates:

    <!-- Profile -->

    1.  [x] - need to show user posts && create Button ( Need to remove create button if not your own page)
        [x] - Registration needs checks (DOB)

    2.  [x] - Clear every store  - 2 stalkers in another user
              Added function to filter out double user cards 

    <!-- Login -->

    3.  [x] - LoginPage Error handling (when user puts password or email wrong)

    <!-- Registration -->
    4.  [ OPTIONAL ]
        [x] - DOB needs minimum age

    <!-- Groups -->

    5.  (SOLUTION : storeInfo.groups.updateStatus in every component{fetches all page data again   ??? is This OKEI ???  })
        [x] - needs to update automatically when: 
                [x] -  creating new group
                [x] -  creating new post
                [x] -  creating new event
                
    6.  [x] - need to fix groupInfo panel (Members(count) stuff)

    7.  [ SOMEWHAT OPTIONAL ]
        [x] - It will now update join requests button and show (even after leaving the page) [ Works per session only ]

    <!-- Followers -->

    8.  [ SOMEWHAT OPTIONAL ]
        [x] - have to know if already send follow request to private user (same thing as with group) [ Works per session only ]


### On Works: 
    <!-- Profile -->
        [ ] - When user clicks to any new profilepage, it should open up profile infotab 
                ** (currently shows last tab state from last visited profilepage)

    <!-- Followers -->
        [ SOMEWHAT OPTIONAL ]
        [ ] - have to know if already send follow request to private user (same thing as with group)

        [ CAN BE BUG (Further Checking Needed) ]
        [ ] - After following and unfollowing, it doesn't let to follow again

    <!-- Groups -->

            //Posts
        [ ] - Group Posts and single Post/Comments page
        
        [ OPTIONAL ]
        [ ] - Visual update

            //Events
        [ ] WORKIN ON-- need to add buttons for going/notgoing + requests
            ** Need to update store to remove event from list if not going **
        [ FIX IT]
        [ ] - Need to fix event responses (I think it dosen't read different event statuses right. With 2 
              different event , they change each other to status != status (reverse each other))
       

    <!-- Notifications -->
        [ ] - Notification tabs (bell Icon) [ OPTIONAL ] -->  with number ( how many notification user has)
        [ ] - Notification List (get all notification) feed it into singleNotification
        [ ] - SingleNotification ( what type it is, Is it reply notification or just informational) - should show dynamically(reading notification itself and show based on that)
        [ ] - Update after seeing or replying to backend with specific notification (Maybe eye icon on corner)

    <!-- Messenger -->
        [ ] - List of all writeable users(user is following) and groups(user is in, different style)
        [ ] - messages boxes for user, other users
        [ ] - messenging component (needs emoticons)
        [ ] - message popup(notification) (realtime notification of writing ??????????? .....)

    <!-- HELPERS -->
        --- RIGHT NOW CLEARING WORKS ON PAGE REFRESH ---
        [ ] - Function to clear all store (connect with logout [does the same store will be present in another browser/window/session])
















<!-- 
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

To learn React, check out the [React documentation](https://reactjs.org/). -->
