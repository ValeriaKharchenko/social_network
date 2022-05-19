import http from './http-common';
import { useDispatch, useSelector } from 'react-redux';
// import { update, addAllUsers, updateAuth } from '../store/profileSlice';
import * as helper from '../helpers/HelperFuncs';
import { useNavigate } from 'react-router-dom';
import {
  updateCreatedGroups,
  updateJoinedGroups,
  updateCurrentGroup,
} from '../store/groupSlice';

//  make new group  // UPDATE - What if group name is taken 
//  make new group event                             //http://localhost:8080/group/event/new
//  make new group post                             // http://localhost:8080/group/post

// get all group and show in search bar (group sign)  //http://localhost:8080/group/all GET method
// get all groups I created                           //http://localhost:8080/group/mycreated GET method 
// get all groups im in (group sign)                  //http://localhost:8080/group/joined GET method
// get group information                              //http://localhost:8080/group/[SomeNumberHere] GETmethod 
// get all group POSTS                                //http://localhost:8080//group/post/all?groupId=${id}` GETmethod 
// get all group EVENTS                               //http://localhost:8080//group/event/all?groupId=${id}` 
// get specific group posts                           //http://localhost:8080/group/post/all?groupId=[some number here]
// get specific group post and comments               //http://localhost:8080/group/post?groupId=[number]&postId=[number]
//  get  group fiends who i haven't send yet        //http://localhost:8080/group/invite/available?groupId=[someGroupNumberHere]

/* 
type GroupOnePostAndComments struct{
  Post        GroupPostReply
  Comments    []GroupPostReply
}
type GroupPostReply struct{
  PostId          int         `json:"post_id"`
  UserId          string      `json:"user_id"`
  UserFirstName   string      `json:"user_firstname"`
  UserLastName    string      `json:"User_lastname"`
  Subject         string      `json:"subject"`
  Content         string      `json:"content"`
  Image           string      `json:"image"`
  ParentId        int         `json:"parent_id"`
  */

 // send group invitation to user                    //http://localhost:8080/group/invite
 // send group join request by user                  //http://localhost:8080/group/join


 
 const GroupService = () => {
   const dispatch = useDispatch();
   const redirect = useNavigate();
   const storeInfo = useSelector(state => state);
   
   const makeNewGroupRequest = async (data) => {
     console.log("%c Posting new group --> ","color:orange", data );
     const response = await http.post("/group/new", data)
      console.log(response);
      return response
  }
  
  const makeGroupPost = (data) => { 
      console.log('%c Posting new post to group --> ', 'color:orange', data);
      const response = http.post("/group/post", data)
      console.log(response);
  }

  const makeEvent = (data) => { 
      console.log('%c Posting new event to group --> ', 'color:orange', data);
      const response = http.post('/group/event/new', data);
  }

  const getAllGroups = async() =>{
    try{
      console.log("%c Fetching my created groups --> ","color:orange");
      const response = await http.get('/group/all');

      return response.data
    }catch(err){
      helper.checkError(err)
    }
  }

  const getCreatedGroups= async() =>{
    try{
      console.log("%c Fetching my created groups --> ","color:orange");
      const response = await http.get('/group/mycreated');
      if (response.data) dispatch(updateCreatedGroups(response.data));
    }catch(err){
      helper.checkError(err)
    }
  }
  
  const getJoinedGroups = async () =>{
    try{
      console.log("%c Fetching my joined groups --> ","color:orange");
      const response = await  http.get('/group/joined')
      if(response.data) dispatch(updateJoinedGroups(response.data))
    }catch(err){
      helper.checkError(err)
    }
  }

  const getGroupInfo= async (id) =>{
    try{
      console.log("%c Fetching specific group info --> ","color:orange");
      const response = await http.get(`/group/${id}`);
      // dispatch(updateCurrentGroup(response.data));
      return response.data
    }catch(err){
      helper.checkError(err)
    }
  }

  const getGroupPosts = async(id) => { 
    try {
      console.log('%c Fetching specific group posts --> ', 'color:orange');
      const response = await http.get(`/group/post/all?groupId=${id}`);
      return response.data;
    } catch (err) {
      helper.checkError(err);
    }
  }

  const getGroupEvents = async(id) => { 
    try {
      console.log('%c Fetching specific group events --> ', 'color:orange');
      const response = await http.get(`/group/event/all?groupId=${id}`)
      return response.data;
    } catch (err) {
      helper.checkError(err);
    }
  }

  const getAvailableFriends = async(id) => { 
    try {
      console.log('%c Fetching available friends to send invites--> ', 'color:orange');
      const response = await http.get( `/group/invite/available?groupId=${id}`);
      return response.data;
    } catch (err) {
      helper.checkError(err);
    }
  }


  const sendGroupInvitation = async (groupId,userId) => {
     try {
      console.log('%c Sending group invitation to user --> ', 'color:orange');
      const response = await http.post(`/group/invite`,{
        group_id : groupId,
        target_id : userId
      })
      console.log("GROUP INVTATION RESPONSE:", response);
    } catch (err) {
      helper.checkError(err);
    }
  }

  const sendGroupJoinRequest = (id) => {
    try {
      console.log('%c Sending join request to group --> ', 'color:orange');
      const response = http.post(`/group/join`,{
        group_id : id
      })
    } catch (err) {
       helper.checkError(err);
    }
  }

  const isAdmin = (id) => { 
    return !!storeInfo.groups.createdGroups.find(group => group.id == id)
  }

  const isMember = (id) => { 
    return !!storeInfo.groups.joinedGroups.find(group => group.id == id)
  }

  return {
    makeNewGroupRequest,
    makeGroupPost,
    makeEvent,
    getAllGroups,
    getCreatedGroups,
    getJoinedGroups,
    getGroupInfo,
    getGroupPosts,
    getGroupEvents,
    getAvailableFriends,
    sendGroupInvitation,
    sendGroupJoinRequest,
    isAdmin,
    isMember,
  };
};

export default GroupService;
