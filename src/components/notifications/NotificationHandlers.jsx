import FollowerService from "../../utilities/follower_service";
import GroupService from "../../utilities/group_service";

const NotificationHandler = () => {
    const group_service = GroupService()
    const follower_service = FollowerService();

    const handleGroupJoinRequest = (data,resp) => {

        group_service.sendGroupJoinReply({
            group_id: data.group_id,
            target_id: data.actor_id,
            status: resp,
        });
    }
    const handleGroupInvite = (data,resp) => {

        console.log("Under Doing");;
    }

    const handleFollowerRequest = (data,resp) => {

        follower_service.changeFollowerStatus({
            target_id: data.actor_id,
            status: resp,
        });
    }

  
  
    return{
        handleGroupJoinRequest,
        handleGroupInvite,
        handleFollowerRequest
    }
}

export default NotificationHandler
