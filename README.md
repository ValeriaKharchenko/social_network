// https://github.com/ValeriaKharchenko/social_network

### BACKLOG [Questions&Suggestions]:
    [ OPTIONAL ] 1. Some  quick popUp notification (when post is created or if wasn't successful)
    [ OPTIONAL ] 2. USER PROFILE - profile update tab, privacy button changeing back to public after leaving tab (needs to update to right state) 
    [ OPTIONAL ] 3. SEARCHBAR - Fetching on every keystroke (put status there or into store )
    [ OPTIONAL ] 4. GROUP EVENT (time) - fix the time lagging (status need to change faster for time)

    [ERRORS] - Some error handling ? 

    [[[ BEFORE AUDIT ]]]
    1. Functional Testing
    2. Clean up code:
        [ ] - Code Optimizations (some minimazing, DRY)
        [ ] - Console.logs remove
        [ ] - Consistent styling
        [ ] - Clean up packages (if build dosen't do it for us)


### Completed Updates:

    <!-- Profile -->

        [x] - need to show user posts && create Button ( Need to remove create button if not your own page)
        [x] - Registration needs checks (DOB)

        [x] - Clear every store  - 2 stalkers in another user
              Added function to filter out double user cards 

        [x] - landing on new profilepage will now open Profile tab first 

    <!-- Login -->

        [x] - LoginPage Error handling (when user puts password or email wrong)

    <!-- Registration -->
        [ OPTIONAL ]
        [x] - DOB needs minimum age

    <!-- Groups -->

        (SOLUTION : storeInfo.groups.updateStatus in every component{fetches all page data again   ??? is This OKEI ???  })
        [x] - needs to update automatically when: 
                [x] -  creating new group
                [x] -  creating new post
                [x] -  creating new event
                
        [x] - need to fix groupInfo panel (Members(count) stuff)

        [ SOMEWHAT OPTIONAL ]
        [x] - It will now update join requests button and show (even after leaving the page) [ Works per session only ]

        //events
       
    
        TIME SELECTION - is now working and can select different times if in future (status dosen't change immidiately if selected time is in past, needs 2-3 clicks to update)


    <!-- Followers -->

        [ SOMEWHAT OPTIONAL ]
        [x] - have to know if already send follow request to private user (same thing as with group) [ Works per session only ]

    <!-- Notifications -->

        [x] - Notifications now show count and notification cards based on type [Works through store]


### On Works: 
    <!-- Followers -->
        [ ] - Notification on Follower is not working (database don't update)

        [ CAN BE BUG (Further Checking Needed) ]
        [ ] - After following and unfollowing, it doesn't let to follow again

    <!-- Groups -->

            //Posts
        [ ] - Group Posts and single Post/Comments page
        
        [ OPTIONAL ]
        [ ] - Visual update

            //Events
        [ ] - overtime events (needs to not show response buttons, and time should show (All ready in past))
        [ ] WORKIN ON-- need to add buttons for going/notgoing + requests
            ** Need to update store to remove event from list if not going **
        [ FIX IT]
        [ ] - Need to fix event responses (I think it dosen't read different event statuses right. With 2 
              different event , they change each other to status != status (reverse each other))
       

    <!-- Notifications -->
        [ ] - GET ALL NOTIFICATIONS      -> Seperate them to 3 Categories (NEW (takes importants, includes response), response required and old informational notifications)
        [ ] - Clicking on notifications  -> will send websocket message to server that clicked notification has been seen, then websocket list will be updated and separated again
        [ ] - Receiving new notification -> The bell icon and number will be updated (count change and color change on bell),
                                            * if user clicks on notifications then : 1. bell and count will go to default (black & 0)
                                            
        ---------------------------------------------------------------------------------------------------------------------------------------------------------------
        GROOMING:
            ??????? 
            Leave bell icon only with notifies new stuff (otherwise how to we update count and how don't we show them next time if we have already clicked on them)
                OR   
            Notification tabel get new column (clicked  -> to bell icon), means user has notified, but column-seen is not yet true
                OR
            Column seen will be numeric, with 0 ,1 ,2 [0 - not seen || clicked, 1 - clicked, 2 - clicked && seen]
            ??????????
        ---------------------------------------------------------------------------------------------------------------------------------------------------------------

    <!-- Messenger -->
        [ ] - List of all writeable users(user is following) and groups(user is in, different style)
        [ ] - messages boxes for user, other users
        [ ] - messenging component (needs emoticons)
        [ ] - message popup(notification) (realtime notification of writing ??????????? .....)

    <!-- DOCKER -->
        [ ] - implement docker

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
