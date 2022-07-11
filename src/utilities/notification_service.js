import http from './http-common';
import * as helper from '../helpers/HelperFuncs';
import FollowerService from './follower_service';
import GroupService from './group_service';

const NotificationService = () => {
  const group_service = GroupService();
  const follower_service = FollowerService();



  const handleGroupJoinRequest = (data, resp) => {
    group_service.sendGroupJoinReply({
      group_id: data.group_id,
      target_id: data.actor_id,
      status: resp,
    });
  };


  const handleGroupInvite = (data, resp) => {
    group_service.sendGroupInvitationReply({
      actor_id : data.actor_id,
      group_id: data.group_id,
      status: resp,
    });
  };

  const handleFollowerRequest = (data, resp) => {
    follower_service.changeFollowerStatusInNotification({
      target_id: data.actor_id,
      status: resp,
    });
  };

  // send[POST] id to notify seeing of notification  /notification/reply?id=[some id] (common)
  // await http.post(`/notification/reply?id=${id}`);
  const handleNotificationSeen = id => {
    try{
      // /user/notification/reply?id=1
      console.log("%c notifying server for notifications --> ","color:orange");
      http.post(`/user/notification/reply?id=${id}`)
    }catch(err){
      helper.checkError(err)
    }
  };

  return {
    handleGroupJoinRequest,
    handleGroupInvite,
    handleFollowerRequest,
    handleNotificationSeen,
  };
};

export default NotificationService;
