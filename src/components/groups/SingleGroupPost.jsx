import { useNavigate, useParams } from "react-router-dom";

export const SingleGroupPost = ({data}) => {
  let redirect = useNavigate();
  let onGroupPage = window.location.href.split("/").indexOf("post") < 0;
  let {id} = useParams();
  // let onGroupPage = window.location.href.split
  console.log(onGroupPage);

  return (
    <div className="group_post">
       {onGroupPage && <button  onClick={() => {redirect(`/group/${id}/post/${data.post_id}`);}}> to page</button>}
        <div className="header flex" >
            <div className="subject">{data.subject}  </div>
            <div className="author"> {data.user_firstname} {data.User_lastname}</div>
            <div> created at: {data.created_at == "" ? "???" : data.created_at} </div>
        </div>
        <div className="content flex">
            {data.image && <img className="image" src={`${data.image}`} alt="picture" />}
            Content: {data.content}
        </div>
    </div>
  )
}

export default SingleGroupPost;