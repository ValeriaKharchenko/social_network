// https://github.com/ValeriaKharchenko/social_network

### BACKLOG [Questions&Suggestions]:
    [ TO DO ]   1. Function to Intialize all loged in user data to store on login (posts,followers,groups,notifications,profile data, etc..)  +  Websocket.connect functionality 
    [ TO DO ]   2. Function to Revert all initialized user data data from store on logout  (posts,followers,groups,notifications,profile data, etc..)  +  Websocket.close functionality 
    [ TO DO ]   3. Check if old user from store is still needed, delete if not (new branch + testing)
    [?TO DO?]   4. Follow/UnFollow button bug (need to click 2 times, before button is changing)



    [ OPTIONAL ] 1. Some  quick popUp notification (when post is created or if wasn't successful)
    [ OPTIONAL ] 2. USER PROFILE - profile update tab, privacy button changeing back to public after leaving tab (needs to update to right state) 
    [ OPTIONAL ] 3. SEARCHBAR - Fetching on every keystroke (put status there or into store )
    [ OPTIONAL ] 4. GROUP EVENT (time) - fix the time lagging (status need to change faster for time)
    [ OPTIONAL ] 5. GROUP PAGE  - Visual update (post,events, more..?)
    [ OPTIONAL ] 6. Possibility to add new post on landing page (/homepage) Or it will be redone ???

    [ERRORS] - Some error handling ? 

    [[[ BEFORE AUDIT ]]]
    1. Functional Testing
    2. Clean up code:
        [ ] - Code Optimizations (some minimazing, DRY)
        [ ] - Console.logs remove
        [ ] - Consistent styling
        [ ] - Clean up packages (if build dosen't do it for us)


### Completed Updates ( FROM: 12/07 ):
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


### On Works: 
    ------------>  src/components/notifications/NotificationList.jsx
        1. check notification filtering 
        2. change on click (eye) and POST
    ------------> 

    <!-- Groups -->

        //Posts
    [ ] - Group Posts and single Post/Comments page

        //Events
    [ ] - overtime events (needs to NOT show response buttons, and time should show (All ready in past))
    [ ] WORKIN ON-- need to add buttons for going/notgoing + requests
        ** Need to update store to remove event from list if not going **
    [ FIX IT]
    [ ] - Need to fix event responses (I think it dosen't read different event statuses right. With 2 
          different event , they change each other to status != status (reverse each other))
       

    
    <!-- Notifications -->
    [ ] - GET ALL NOTIFICATIONS      -> Seperate them to 3 Categories (NEW (takes importants, includes response), response required and old informational notifications)
    [ ] - Clicking on notifications TAB -> will send websocket message to server that all notifications has been seen, then websocket list will be updated and separated 
    [ ] - Receiving new notification -> The bell icon and number will be updated (count change and color change on bell),
                                        * if user clicks on notifications then : 1. bell and count will go to default (black & 0)

    [ ] - Notfication repsonse - on response , the server will delete notfication and it wont show again on front (FOR NOW ????)
           1. Should notify user that response has been made
           2. Maybe update notfication after click


    [ IMPROVEMENTS ]
    [ ] - newest notification first
    [ ] - new notifying system   (/user/notification/reply?id=${id}&status=${nr})
        0 = not seen and not clicked [default]
        1 = seen and not clicked
        2 = seen and clicked

                                            
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
