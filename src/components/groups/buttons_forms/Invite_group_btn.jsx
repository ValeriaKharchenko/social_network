import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GroupService from '../../../utilities/group_service'
import Invite_group_list from './Invite_group_list'

const Invite_group_btn = () => {
    const [isOpen, setIsOpen] = useState(false)
    const group_service = GroupService()
    let {id} = useParams()

    useEffect(()=>{
        group_service.getAvailableFriends(Number(id.slice(1))).then(res =>{
            console.log(res);
        })
        console.log("looping ? ");
    },[id])

    return (
        <>
        {!isOpen && <Button onClick={() => { setIsOpen(!isOpen)}}>Invite Users</Button>}
        {/* {isOpen && <Invite_group_list />} */}


        </>
    )
}

export default Invite_group_btn