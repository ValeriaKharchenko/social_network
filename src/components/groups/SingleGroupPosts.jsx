
export const SingleGroupPosts = ({data}) => {
  return (
    <div className="group_post">
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

export default SingleGroupPosts;