
import http from './http-common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { update,updatePrivacy } from '../store/profileSlice';
import * as helper from '../helpers/HelperFuncs';

const ProfileService = () => {
  const dispatch = useDispatch();
  const getMyInfo = async () => {
    try {
      console.log('GETTING USER INFO');
      const response = await http.get('/user/me');
      console.log(response.data);
      dispatch(update({ ...response.data, id: helper.getTokenId() }));
    } catch (err) {
      checkError(err);
    }
  };

  const updatePrivacy= async () =>{
      try{
          console.log("Changing Privacy");
          await http.put("/user/me")
          const response = await http.get('/user/me');
          dispatch(update({ ...response.data, id: helper.getTokenId() }));
      }catch(err){
         checkError(err)
      }
  }

  return {
    getMyInfo,
    updatePrivacy
  };
}

export default ProfileService


const checkError = err => {
     if (err.response) {
       console.log(err.message);
       console.log(err.status);
       console.log(err.header);
     } else {
       console.log('Different Error ', err.message);
     }
}

// export default {
//     async getMyInfo(){
//         try{
//             console.log("GETTING USER INFO");
//             const response = await http.get("/user/me")
//             return response.data
//         }catch(err){
//             if(err.response){
//                 console.log(err.message);
//                 console.log(err.status);
//                 console.log(err.header);
//             }else{
//                 console.log("Different Error ", err.message);
//             }
//         }
//     },

//     async updatePrivacy(){
//         try{
//             console.log("Changing Privacy");
//             const response = await http.put("/user/me",{})
//             console.log(response);
//             return response
//         }catch(err){
//             if(err.response){
//                 console.log(err.message);
//                 console.log(err.status);
//                 console.log(err.header);
//             }else{
//                 console.log("Different Error ", err.message);
//             }
//         }
//     }
// }
