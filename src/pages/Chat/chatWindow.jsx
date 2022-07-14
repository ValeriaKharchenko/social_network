import React, { useEffect, useRef, useState } from "react";
import "./chat.scss";
import chatService from "../../utilities/chat";
import { setAlert } from "../../store/alertSlice";
import { loadMsgs } from "../../store/chatSlice";

// import Picker from "emoji-picker-react";
import InputEmoji from "react-input-emoji";

//mui material
import { Button, Divider, Grid, ListItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import FaceIcon from "@mui/icons-material/Face";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import * as helper from "../../helpers/HelperFuncs";
import WsApi from "../../utilities/ws";

export const Chat = () => {
  let followerList = useSelector((state) => state.followers.followers);
  let dispatch = useDispatch();
  const [receiver, setReceiver] = useState("");
  console.log("2", receiver);

  const msgs = useSelector((state) => state.chat.msgHistory);
  let sender = helper.getTokenId();

  let createdGroups = useSelector((state) => state.groups.createdGroups);
  let joinedGroups = useSelector((state) => state.groups.joinedGroups);
  let groups = createdGroups.concat(joinedGroups);
  console.log("Groups:", groups);
  console.log("Followers:", followerList);

  let members = [];
  followerList.forEach((f) => {
    let chatMember = {
      name: f.first_name + " " + f.last_name,
      id: f.user_id,
      type: "person",
    };
    members.push(chatMember);
  });

  groups.forEach((g) => {
    let group = {
      name: g.title,
      id: g.id,
      type: "group",
    };
    members.push(group);
  });
  console.log("Members", members);

  // const { handleSubmit, register } = useForm();
  // const form = useRef(null);
  const bottomRef = useRef(null);

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const [text, setText] = useState("");

  const loadHistory = async () => {
    let msgHistory = [];
    try {
      msgHistory = await chatService.getMsgs(receiver, 0, 50);
    } catch (e) {
      console.log(e.message);
      const errorState = {
        text: "Can't load messages",
        severity: "warning",
      };
      dispatch(setAlert(errorState));
    }
    msgHistory === null
      ? dispatch(loadMsgs([]))
      : dispatch(loadMsgs(msgHistory));
  };

  //send chat message
  const sendMsg = (text) => {
    console.log(text);
    if (text.trim().length > 0) {
      let jsonData = {};
      jsonData["action"] = "message";
      jsonData["user"] = sender;
      jsonData["message_to"] = receiver;
      jsonData["message_content"] = text;
      console.log(JSON.stringify(jsonData));
      WsApi.sendChatMessage(JSON.stringify(jsonData));
      setText("");
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // load chat history
  useEffect(() => {
    if (receiver !== "") {
      loadHistory();
    }
  }, [receiver]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <div className={"fullWidth"}>
      <Grid container component={Paper} className="chatSection">
        <Grid item xs={3} className={"borderRight500"}>
          <List>
            {members.length === 0 ? (
              <ListItem>
                <ListItemText>
                  Follow somebody or enter a group to start chat
                </ListItemText>
              </ListItem>
            ) : (
              members.map((member) => {
                return (
                  <ListItem>
                    {/*<FaceIcon />*/}
                    {member.type === "person" ? <FaceIcon /> : <GroupsIcon />}
                    <ListItemText>
                      <Button
                        className={member.id === receiver ? "active" : ""}
                        onClick={() => {
                          setReceiver(member.id);
                          loadHistory();
                        }}
                        fullWidth
                      >
                        {member.name}
                      </Button>
                    </ListItemText>
                  </ListItem>
                );
              })
            )}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={"messageArea"}>
            {receiver === "" ? (
              <ListItem>
                <ListItemText>Select chat</ListItemText>
              </ListItem>
            ) : msgs.length === 0 ? (
              <ListItem>
                <ListItemText>No messages yet</ListItemText>
              </ListItem>
            ) : (
              msgs.map((m) => {
                return (
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          className={m.from === sender ? "right" : "left"}
                        >
                          {m.content}
                        </ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })
            )}
            <div ref={bottomRef} />
          </List>
          <Divider />
          {/*<form ref={form} onSubmit={handleSubmit(sendMsg)}>*/}
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={10}>
              <InputEmoji
                id="msg-input"
                label="Type a message"
                // multiline
                maxRows={2}
                height={600}
                // fullWidth
                cleanOnEnter
                maxLength={400}
                value={text}
                onChange={setText}
                onEnter={sendMsg}
              />
            </Grid>
            {/*<Grid item xs={1} marginLeft={1} align="right">*/}
            {/*  /!*<Picker onEmojiClick={onEmojiClick} />*!/*/}
            {/*  <Fab color="primary" aria-label="add" type={"submit"}>*/}
            {/*    <SendIcon />*/}
            {/*  </Fab>*/}
            {/*</Grid>*/}
          </Grid>
          {/*</form>*/}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
