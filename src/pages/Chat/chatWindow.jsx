import React, { useEffect, useRef, useState } from "react";
import "./chat.scss";
import chatService from "../../utilities/chat";

//mui material
import { Button, Divider, Grid, ListItem, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import SendIcon from "@mui/icons-material/Send";
import ListItemText from "@mui/material/ListItemText";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as helper from "../../helpers/HelperFuncs";
import WsApi from "../../utilities/ws";
import Fab from "@mui/material/Fab";
import { setAlert } from "../../store/alertSlice";
import { loadMsgs } from "../../store/chatSlice";

export const Chat = () => {
  let followerList = useSelector((state) => state.followers.followers);
  let dispatch = useDispatch();
  const [receiver, setReceiver] = useState("");
  console.log("2", receiver);
  const msgs = useSelector((state) => state.chat.msgHistory);
  let sender = helper.getTokenId();

  const { handleSubmit, register } = useForm();
  const form = useRef(null);
  const loadHistory = async () => {
    let msgHistory = [];
    try {
      msgHistory = await chatService.getMsgs(receiver, 0, 50);
      console.log("Here", msgHistory);
      // console.log("Length", msgHistory.length);
    } catch (e) {
      console.log(e.message);
      const errorState = {
        text: "Can't load messages",
        severity: "warning",
      };
      dispatch(setAlert(errorState));
    }
    // if (msgHistory != null) {
    //   dispatch(loadMsgs(msgHistory));
    // }
    msgHistory === null
      ? dispatch(loadMsgs([]))
      : dispatch(loadMsgs(msgHistory));
  };

  const sendMsg = (data) => {
    console.log("Me", sender);
    let jsonData = {};
    jsonData["action"] = "message";
    jsonData["user"] = sender;
    jsonData["message_to"] = receiver;
    jsonData["message_content"] = data.content;
    console.log(JSON.stringify(jsonData));
    WsApi.sendChatMessage(JSON.stringify(jsonData));
    form.current.reset();
  };

  // console.log(followerList);
  useEffect(() => {
    if (receiver !== "") {
      loadHistory();
    }
    console.log("1", msgs);
  }, [receiver]);

  // useEffect(() => {
  //   console.log("2", msgs);
  // }, [msgs]);

  return (
    <div className={"fullWidth"}>
      <Grid container component={Paper} className="chatSection">
        <Grid item xs={3} className={"borderRight500"}>
          <List>
            {followerList.length === 0 ? (
              <ListItem>
                <ListItemText>Follow somebody to start chat</ListItemText>
              </ListItem>
            ) : (
              followerList.map((follower) => {
                return (
                  <ListItem>
                    <FaceIcon />
                    <ListItemText>
                      <Button
                        className={
                          follower.user_id === receiver ? "active" : ""
                        }
                        onClick={() => {
                          // console.log(follower.user_id);
                          setReceiver(follower.user_id);
                          loadHistory();
                        }}
                        fullWidth
                      >
                        {follower.first_name} {follower.last_name}
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
          </List>
          <Divider />
          <form ref={form} onSubmit={handleSubmit(sendMsg)}>
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={10}>
                <TextField
                  id="msg-input"
                  label="Type Something"
                  multiline
                  maxRows={4}
                  fullWidth
                  {...register("content")}
                  required
                />
              </Grid>
              <Grid item xs={1} marginLeft={1} align="right">
                <Fab color="primary" aria-label="add" type={"submit"}>
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
