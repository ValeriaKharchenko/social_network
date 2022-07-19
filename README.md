// https://github.com/ValeriaKharchenko/social_network

### BACKLOG [Questions&Suggestions]:
    [?TODO?]   1. Follow/UnFollow button bug (need to click 2 times, before button is changing)
    [ TODO ]   2. GroupService getAllgroups -> no need to fetch twice ( change old functions that uses fetch)


    [ OPTIONAL ] 1. Some  quick popUp notification (when post is created or if wasn't successful)
    [ OPTIONAL ] 2. USER PROFILE - profile update tab, privacy button changeing back to public after leaving tab (needs to update to right state) 
    [ OPTIONAL ] 3. GROUP EVENT (time) - fix the time lagging (status need to change faster for time)
    [ OPTIONAL ] 4. GROUP PAGE  - Visual update (post,events, more..?)
    [ OPTIONAL ] 5. Possibility to add new post on landing page (/homepage) Or it will be redone ???
    [ OPTIONAL ] 6. NOTIFICATION - one button to convert  all to  seen&clicked status

    [ERRORS] - Some error handling ? 

    [[[ BEFORE AUDIT ]]]
    1. Functional Testing
    2. Clean up code:
        [ ] - Code Optimizations (some minimazing, DRY)
        [ ] - Console.logs remove
        [ ] - Consistent styling
        [ ] - Clean up packages (if build dosen't do it for us)


### Completed Updates:
    ( FROM: 12/07 )
    <!-- Followers -->
    NOW:    
        UNFOLLOW is always          - Delete   (REST)
        Request answer is  always   - PUT      (REST)
    
    FIXED : 
        [ BUGS ]
        [ ] - user gets notfied from follower request even if profile user tries to follow is public
        [ ] - on a second unfollow or request it dosent update anymore (database stays zero)

    REMOVED : 
        Some user related old code (userSlice, user from store, cleanup user_service + imports)
    
    ( FROM: 13/07 )
    New url for group post ( works same as OnePost page).
    Notification improvements 


    ( FROM: 14/07 )
    *Every post in group posts, will now redirect to single groupPost page where user can comment (works like regualar post page)
    *Clicking on notifications TAB -> will send websocket message to server that all notifications has been seen, count and icon will be changed
    *Clicking on notification , it send its id and status 2 to server to notify its seen and clicked.

    ( FROM: 17/07 )
    It will now show newest notifications first, will update store and put seen status nr 2 if clicked (constant visual)

    FIXED :
         Private user follow request, after accepting, the requested user still showed -> Request has been send top of STOP FOLLOWING-  button

    ( FROM: 18/07 )
    NEW: 
        Group Events now show when event is past (hides buttons)

    FIXED : 
        Fixed event responses (had to remove event from store array)

    ( FROM: 19/07 )
       * Function to Revert all initialized user data from store on logout  (posts,followers,groups,notifications,profile data, etc..)
       * Search bar has now filtering and buttons to choose from ( Needs testing, visual lift)


### On Works: 
    [?TODO?]   2. makeGroup btn should update and add made group after creating (NOW : updates with refresh or new fetch)


    <!-- Notifications -->
        [BUG]
        [ ] - user follow request -> after clicking it wont dissapear and show there all the time 


    <!-- Messenger -->

        [ ] - List of all writeable users(user is following) and groups(user is in, different style)
        [ ] - messages boxes for user, other users
        [ ] - messenging component (needs emoticons)
        [ ] - message popup(notification) (realtime notification of writing ??????????? .....)

    <!-- DOCKER -->

        [ ] - implement docker

















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
