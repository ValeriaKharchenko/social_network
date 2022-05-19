import {useEffect, useState } from "react"
import GroupService from "../../utilities/group_service"
import SingleGroupPosts from "./SingleGroupPosts"


const GroupPosts = ({id}) => {
  const [posts,setPosts ] = useState([])
  const group_service = GroupService()

  useEffect(()=>{
    group_service.getGroupPosts(id).then(res => {
      setPosts(res)
    })
  },[id])

  return (
    <div>
    {posts && posts.map((post) => (
        <SingleGroupPosts key={post.post_id} data={post} />
      ))}
    </div>
  )
}

export default GroupPosts