import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Avatar, Button, Container } from "@mui/material";
import "./styles/searchbar.scss";
import ProfileService from "../utilities/profile_service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupService from "../utilities/group_service";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Searchbar = () => {
  const profile_service = ProfileService();
  const group_service = GroupService();
  const allUsers = useSelector((state) => state.profile.allUsers);
  const allGroups = useSelector((state) => state.groups.allGroups);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [input, setInput] = useState("");
  const [option, setOption] = useState(0)
  let redirect = useNavigate();
  
  const HandleChange = (e) => {
    setInput(e.target.value);
    if (fetched === false) {
      profile_service.getAllUsers()
      group_service.getAllGroups()
      setFetched(true);
    }
  };

  useEffect(() => {
    if (input == "" || input == null || input == " ") {
      document.querySelector(".searched_users").classList.add("hide");
      setFetched(false)
    } else {
      document.querySelector(".searched_users").classList.remove("hide");
      // if(option == 0){
      //   setUsers(allUsers.filter(user => user.first_name.toLowerCase().includes(input.toLowerCase())))
      //   setGroups(allGroups.filter(group => group.title.toLowerCase().includes(input.toLowerCase())))
      // }

      switch(option){
        case 0 :
          setUsers(allUsers.filter(user => user.first_name.toLowerCase().includes(input.toLowerCase())))
          setGroups(allGroups.filter(group => group.title.toLowerCase().includes(input.toLowerCase())))
          break;
          case 1 : 
          setUsers(allUsers.filter(user => user.first_name.toLowerCase().includes(input.toLowerCase())))
          setGroups([])
          break;
          case 2 : 
          setUsers([])
          setGroups(allGroups.filter(group => group.title.toLowerCase().includes(input.toLowerCase())))
          break;
      }
    }
  }, [input,option]);

  
  return (
    <div>
      {option == 0 ? 
      <Button style={{background:"green"}}>all</Button>
      :
      <Button onClick={() => { setOption(0)}} >all</Button>
      }
      {option == 1 ? 
      <Button style={{background:"green"}}>users</Button>
      :
      <Button onClick={() => { setOption(1)}} >users</Button>
      }
      {option == 2 ? 
      <Button style={{background:"green"}}>groups</Button>
      :
      <Button onClick={() => { setOption(2)}} >groups</Button>
      }

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          id="search_input"
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => HandleChange(e)}
          value={input}
        />
      </Search>

      <Container className="searched_users hide">
        {users &&
          users.map((user) => (
            <div
              className="user flex"
              key={user.ID}
              id={user.ID}
              onClick={() => {
                setInput("");
                redirect(`/profile/${user.ID}`);
              }}
            >
              {
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt=""
                  src={user.user_img}
                />
              }
              <p>
                {user.first_name} {user.last_name}
              </p>
            </div>
          ))}
        {groups &&
          groups.map((group) => (
            <div
              className="user flex"
              key={group.id}
              id={group.id}
              onClick={() => {
                setInput("");
                redirect(`/group/${group.id}`);
              }}
            >
              <p>
                {group.title} <span className="mini">(group)</span>
              </p>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default Searchbar;
