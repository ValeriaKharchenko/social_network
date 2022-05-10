
import http from './http-common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { update,addAllUsers } from '../store/profileSlice';
import * as helper from '../helpers/HelperFuncs';


const ProfileService = () => {
  const dispatch = useDispatch();
  const getMyInfo = async () => {
    try {
      console.log('GETTING MY INFO');
      const response = await http.get('/user/me');
      // console.log(response.data);
      dispatch(update({ ...response.data, id: helper.getTokenId() }));
    } catch (err) {
      helper.checkError(err);
    }
  };

  const updatePrivacy= async () =>{
      try{
          console.log("Changing Privacy");
          await http.put("/user/me")
          const response = await http.get('/user/me');
          dispatch(update({ ...response.data, id: helper.getTokenId() }));
      }catch(err){
         helper.checkError(err)
      }
  }

  const getAllUsers = async () => { 
    try{
      console.log("Fetching All users");
      const response = await http.get('user/all');
      // console.log(response.data);
      dispatch(addAllUsers(response.data));
    }catch(err){
      helper.checkError(err)
    }
  }

  // I need to send id(My info should be empty id) to get one user info = http://localhost:8080/user/oneuser?id=380c54e8-7560-4055-aea4-f6d7b2282d4d
  const getUserInfo = async (id) => { 
    try{
      // console.log("Fetching user profile data -->", id);
      const response = await http.get(`user/oneuser?id=${id}`);
      return response.data
    }catch(err){
      helper.checkError(err)
    }
  }

  return {
    getMyInfo,
    updatePrivacy,
    getAllUsers,
    getUserInfo,
  };
}

export default ProfileService
