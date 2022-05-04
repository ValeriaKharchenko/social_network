import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {theme} from "../theme"
import { Avatar } from "@mui/material";

import ProfileService from '../utilities/profile_service';
import { useSelector } from 'react-redux';

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



const Searchbar = ({data = []}) => {
 const profile_service = ProfileService()
  const selector = useSelector(state => state)
  return (
    <div>
    <Search>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onClick={() => profile_service.getAllUsers()}
            />
    </Search>

    {selector.profile.allUsers && selector.profile.allUsers.map(user => (
      <div className="user flex" id={user.id} >
        {<Avatar  sx={{width: 30, height: 30,}} alt="" src={user.user_img} />}
        <p>{user.first_name} {user.last_name}</p>
      </div>
    ))}
    {/* {data && data.map(user => (
      <div className="user flex" id={user.id} >
        {<Avatar  sx={{width: 30, height: 30,}} alt="" src={require("../assets/Images/User/cat.png")} />}
        <p>{user.first_name} {user.last_name}</p>
      </div>
    ))} */}
    </div>

  )
}

export default Searchbar