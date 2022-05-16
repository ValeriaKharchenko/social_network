import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Avatar, Container } from "@mui/material";
import "./styles/searchbar.scss"
import ProfileService from '../utilities/profile_service';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import GroupService from '../utilities/group_service';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const Searchbar = () => {
  const profile_service = ProfileService()
  const group_service = GroupService()
  const storeInfo = useSelector(state => state)
  const [groups,setGroups] = useState([])
  const [fetched,setFetched] = useState(false)
  const [input,setInput] = useState("")
  let redirect = useNavigate()
  const HandleChange = (e) => { 
    setInput(e.target.value)
    if(fetched === false){
      profile_service.getAllUsers()
      setFetched(true)
    }
  }

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

  useEffect(() => {
      group_service.getAllGroups().then(res => setGroups(res))
      console.log(groups);
      if(input == "" || input == null){
       document.querySelector(".searched_users").classList.add('hide')
      }else{
        document.querySelector(".searched_users").classList.remove('hide')
      }
  },[input])
  
  return (
    <div>
    <Search>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
              id='search_input'
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=> HandleChange(e)} 
              value={input}
            />
    </Search>
      
      <Container className='searched_users hide'>
        {storeInfo.profile.allUsers && storeInfo.profile.allUsers.map(user => (
          <div className="user flex" key={user.ID} id={user.ID} onClick={()=> {
            setInput("")
            redirect(`/profile/:${user.ID}`)
            }}>
            {<Avatar  sx={{width: 30, height: 30,}} alt="" src={user.user_img} />}
            <p>{user.first_name} {user.last_name}</p>
          </div>
        ))}
        {groups && groups.map(group => (
          <div className="user flex" key={group.id} id={group.id} onClick={()=> {
            setInput("")
            redirect(`/group/:${group.id}`)
            }}>
            <p>{group.title} <span className='mini'>(group)</span></p>
          </div>
        ))}
       </Container>
    </div>

  )
}

export default Searchbar