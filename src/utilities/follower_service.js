import http from './http-common';
import { useDispatch, useSelector} from 'react-redux';
import {
  updateFollowers,
  updateStalkers,
  updateCurrentUserId,
  updateStatus,
} from '../store/followerSlice';
import * as helper from '../helpers/HelperFuncs';


const FollowerService = () => {
  const dispatch = useDispatch();
  const storeInfo = useSelector((state) => state);
  const getMyFollowers = async () => {
    console.log("%cFetching my followers", "color:orange");
    try {
      const gotFollowers = await http.get('/follower/');
      const gotStalkers = await http.get('/follower/back');
      // console.log('Fetching users I k--> Spy on', gotFollowers.data);
      // console.log('Fetching users Stalkers -->', gotStalkers.data);
      if(!gotFollowers.data) gotFollowers.data = []
      if (!gotStalkers.data) gotStalkers.data = [];
      dispatch(updateFollowers(gotFollowers.data));
      dispatch(updateStalkers(gotStalkers.data));
    } catch (err) {
      helper.checkError(err);
    }
  }

  
  const getUserFollowers = async (id) => {
    // console.log("GOt from Profile page id : ", id);
      try {
        const gotFollowers = await http.get(`/follower/?id=${id}`);
        // console.log('Fetching users followers', gotFollowers.data);
        // console.log('%c Back responsed with =>','color:orange',gotFollowers.data,);
        return gotFollowers.data;
      } catch (err) {
        helper.checkError(err);
      }
  };
  const getUserStalkers = async (id)=> {
      try {
        const gotStalkers = await http.get(`/follower/back?id=${id}`);
        // console.log('%c Back responsed with =>', 'color:orange',gotStalkers.data);
        return gotStalkers.data;
      } catch (err) {
        helper.checkError(err);
      }
  };

  const sendFollowerRequest = async (id) => {
        try {
          const response = await http.post('/follower/', {
            "target_id": `${id}`,
          });
          console.log('%c sendFollowerRequest =>','color:orange',response.data);
        } catch (err) {
          helper.checkError(err);
        }
  }

  const changeFollowerStatus = async (id) => {
       try {
            const response = await http.put('/follower/', {
              target_id: `${id}`,
              status: 2,
            });
         console.log( '%c changeFollowerStatus =>', 'color:orange',  response.data);
       } catch (err) {
         helper.checkError(err);
       }
  }

  // const isFollowing =(id) => { 
  //   //  if there is object returned (!!), same as Boolean(storeInfo.followers.followers)
  //   return !!storeInfo.followers.followers.find(
  //     user => user.user_id == id.slice(1) 
  //   );
  // }

  const isFollowing =() => { 
    //  if there is object returned (!!), same as Boolean(storeInfo.followers.followers)
    return !!storeInfo.followers.followers.find(
      user => user.user_id == storeInfo.followers.currentUserId
    );
  }

  const setCurrentUserId = async id => {
    dispatch(updateCurrentUserId(id))
  }
  
  const handleFollowerBtn =  (isFollowing) => {
    dispatch(updateStatus(!storeInfo.followers.updateStatus))
      if (isFollowing) {
        sendFollowerRequest(storeInfo.followers.currentUserId)
      }else{
        changeFollowerStatus(storeInfo.followers.currentUserId);
    }
    getMyFollowers();
  }


  return {
    getMyFollowers,
    getUserFollowers,
    getUserStalkers,
    sendFollowerRequest,
    changeFollowerStatus,
    setCurrentUserId,
    handleFollowerBtn,
    isFollowing,
  };
};

export default FollowerService;
