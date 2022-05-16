import http from './http-common';
import { useDispatch, useSelector } from 'react-redux';
// import { update, addAllUsers, updateAuth } from '../store/profileSlice';
import * as helper from '../helpers/HelperFuncs';
import { useNavigate } from 'react-router-dom';
import { updateCreatedGroups, updateJoinedGroups } from '../store/groupSlice';

//  make new group  // UPDATE - What if group name is taken 
//  make new group event                             //http://localhost:8080/group/event/new
//  make new group post                             // http://localhost:8080/group/post

// send join request to friend
// ask to join to group

// get all group and show in search bar (group sign)  //http://localhost:8080/group/all GET method
// get all groups I created                           //http://localhost:8080/group/mycreated GET method 
// get all groups im in (group sign)                  //http://localhost:8080/group/joined GET method
// get group information                              //http://localhost:8080/group/[SomeNumberHere] GETmethod 
// get all group POSTS                                //http://localhost:8080//group/post/all?groupId=${id}` GETmethod 
// get all group EVENTS                               //http://localhost:8080//group/event/all?groupId=${id}` 





// REsponse
/*
type GroupReply struct{
  Id                  int     `json:"id"`
  Title               string  `json:"title"`
  Description         string  `json:"description"`
  CreatorId           string  `json:"creator_id"`
  CreatorFirstName    string  `json:"creator_first_name"`
  CreatorLastName     string  `json:"creator_last_name"`
  Members             int     `json:"members"`
}
*/

// get specific group posts                           //http://localhost:8080/group/post/all?groupId=[some number here]
// get specific group post and comments               //http://localhost:8080/group/post?groupId=[number]&postId=[number]

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
      dispatch(updateCreatedGroups(response.data))
    }catch(err){
      helper.checkError(err)
    }
  }
  
  const getJoinedGroups = async () =>{
    try{
      console.log("%c Fetching my joined groups --> ","color:orange");
      const response = await  http.get('/group/joined')
      dispatch(updateJoinedGroups(response.data))
    }catch(err){
      helper.checkError(err)
    }
  }

  const getGroupInfo= async (id) =>{
    try{
      console.log("%c Fetching specific group info --> ","color:orange");
      const response = await http.get(`/group/${id}`);
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


  const sendGroupInvitation = async (groupId,userId) => {
     try {
      console.log('%c Sending group invitation to user --> ', 'color:orange');
      const response = await http.post(`/group/invite`,{
        group_id : groupId,
        target_id : userId
      })
      console.log("GROUP INVITATION RESPONSE:", response);
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
    sendGroupInvitation,
    isAdmin,
    isMember,
  };
};

export default GroupService;
