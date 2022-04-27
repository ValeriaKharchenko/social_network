import "./post.scss"

const Post = ({post}) => {
    
    return (
        <div className="post" >
            <div className="post_header">
            <img src={require("../../assets/Images/ano.jpg")} alt="ano_pic" />
            {post.group_name ? 
                <>
                    <div className="information">
                        <div className="name">{post.group_name}<span>(group)</span></div>
                        <div>{post.author}</div>
                    </div>
                    <div className="date">Today at {post.date}</div>
                </>
                :
                <>
                    <div className="information">
                        <div className="name"> {post.author}</div>
                        <div className="date">Today at {post.date}</div>
                    </div>
                </>
            }
            
            </div>
            <div className="post_content">{post.content}</div>
        </div>
  )
}

export default Post