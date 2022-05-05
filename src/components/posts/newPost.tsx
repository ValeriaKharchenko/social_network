import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/postSlice";
import "./newPost.scss";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import { RootState } from "../../store/store";
import { useForm } from "react-hook-form";
import { checkImage, getBase64 } from "../../helpers/checkImage";
import { useEffect, useState } from "react";
import postService from "../../utilities/post-service";
import TransferList from "../transferList";
import { useParams } from "react-router-dom";

const ariaLabel = { "aria-label": "description" };

export interface NewPostForm {
  title: string;
  content: string;
  image: FileList;
  imgString: string;
  privacy: Privacy;
  parent_id: number;
  userList: Follower[] | null;
}

export interface Follower {
  // firstName: string,
  // lastName: string,
  name: string;
  id: string;
}

enum Privacy {
  Public = 1,
  Private,
  StrictlyPrivate,
}

export function NewPost(props: { fullView: boolean }) {
  const { handleSubmit, register } = useForm<NewPostForm>();
  const [errors, setErrors] = useState<string[]>([]);
  const open = useSelector((state: RootState) => state.post.isOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(openModal());
  };
  const [value, setValue] = React.useState(Privacy.Public);
  const [followers, setFollowers] = React.useState<boolean>(false);
  const [listOfFollowers, setListFollowers] = React.useState<Follower[]>([]);

  let { id } = useParams();
  const param: number = id ? +id : 0;
  useEffect(() => {
    if (listOfFollowers.length !== 0) {
      return;
    }
    //fake list of users
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        let l: Follower[] = [];
        users.forEach((u: Follower) => {
          const follower = {
            name: u.name,
            id: u.id,
          };
          l.push(follower);
        });
        setListFollowers(l);
      });
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setValue((event.target as HTMLInputElement).value);
  };

  const imgCheck = (image: FileList): boolean => {
    return checkImage(image, setErrors);
  };

  let chosenUsers: Follower[] = [];
  const chosen = (users: readonly Follower[]) => {
    console.log("i'm chosen!", users);
    chosenUsers = users as Follower[];
  };
  console.log(chosenUsers);

  const newPost = async (data: NewPostForm) => {
    if (props.fullView) {
      data.privacy = value as Privacy;
      data.parent_id = 0;
    } else {
      data.privacy = 0;
      data.parent_id = param;
    }
    let check = true;
    if (chosenUsers.length !== 0) {
      data.userList = chosenUsers;
    }
    console.log(data.userList);

    if (data.image.length !== 0) {
      console.log(data.image);
      check = imgCheck(data.image);
      data.imgString = (await getBase64(data.image[0])
        .then((str) => {
          return str;
        })
        .catch((e) => alert(e))) as string;
    } else {
      data.imgString = "";
    }

    if (check) {
      try {
        console.log("New post", data);
        const response = await postService.addNewPost(data); //probably we'll have to renew list of posts/store after that
        handleClose();
      } catch (e) {
        console.log(e);
        alert(e);
      }
    } else {
      alert(["ERROR WITH IMAGE UPLOAD"]);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit(newPost)}
        className={"new_post"}
        sx={{
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <div className={"title"}>
          {props.fullView && (
            <Input
              placeholder="Title"
              inputProps={ariaLabel}
              // variant="filled"
              fullWidth
              {...register("title")}
              required
            />
          )}
          <Button className={"close"} onClick={handleClose}>
            <CloseIcon />
          </Button>
        </div>
        <div className={"content"}>
          <TextField
            fullWidth
            placeholder="Content"
            multiline
            minRows={5}
            maxRows={10}
            {...register("content")}
            required
          />
        </div>
        <Input sx={{ mb: 3 }} type={"file"} {...register("image")}></Input>
        {props.fullView && (
          <div>
            <FormControl id={""} sx={{ ml: 1, mb: 3 }}>
              Who can see this post?
              <RadioGroup
                row
                // aria-labelledby="demo-controlled-radio-buttons-group"
                name="post-privacy"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={Privacy.Public}
                  control={<Radio />}
                  label="All users"
                  onChange={(e) => {
                    e.preventDefault();
                    setFollowers(false);
                    chosenUsers = [];
                  }}
                />
                <FormControlLabel
                  value={Privacy.Private}
                  control={<Radio />}
                  label="Followers" //Friends?
                  onChange={(e) => {
                    e.preventDefault();
                    setFollowers(false);
                    chosenUsers = [];
                  }}
                />
                <FormControlLabel
                  value={Privacy.StrictlyPrivate}
                  control={<Radio />}
                  label="Chosen ones"
                  onChange={(e) => {
                    e.preventDefault();
                    setFollowers(true);
                  }}
                />
              </RadioGroup>
              {followers && (
                <TransferList followers={listOfFollowers} sendBack={chosen} />
              )}
            </FormControl>
          </div>
        )}
        <div>
          <Button sx={{ width: 125 }} type={"submit"} variant="contained">
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
