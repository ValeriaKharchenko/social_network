import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import GroupService from '../../../utilities/group_service'
import Invite_group_list from './Invite_group_list'

const Invite_group_btn = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState([]) // userlist
    const [list, setList] = useState([]) //invitation list
    const group_service = GroupService()
    const update  = useSelector(state =>  state.groups.updateStatus)
    let {id} = useParams()
    
    const handleSubmit = (list) => { 
        if(list.length != 0 ) list.forEach(userId => {
            group_service.sendGroupInvitation(Number(id),userId)
        })
    }
 
    useEffect(()=>{
        group_service.getAvailableFriends(Number(id)).then(res =>{
            // console.log(`%c${res}`, "color:cyan" );
            setData(res)
        })
        if(data == null) setIsOpen(false)
    },[id,update])

    return (
    <>
        {data != null  ? <Button onClick={() => { setIsOpen(!isOpen)}}>Invite Users</Button>
        :
        <div>Nobody to send invites</div>
        }

        {
        isOpen  &&
            <div>
                <Invite_group_list list={data} setList={setList} />
                <Button onClick={() => { 
                    handleSubmit(list)
                    setIsOpen(!isOpen)}
                    }>OK!</Button>
                </div> 
        }
    </>
    )
}

export default Invite_group_btn