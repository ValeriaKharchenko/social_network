import {useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GroupService from "../../utilities/group_service"


const GroupPost = () => {
   const [post,setPosts ] = useState({})
    const group_service = GroupService()
    let {id} = useParams()
    useEffect(()=>{
        id= id.slice(1)
    },[id])

  return (
    <>
    <div>GroupPost</div>
    </>
  )
}

export default GroupPost