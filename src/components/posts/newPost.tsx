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
import { update } from "../../store/postSlice";
import "./newPost.scss";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Followers from "../transferList";
import { RootState } from "../../store/store";
import { useForm } from "react-hook-form";
import { RegisterForm } from "../../pages/Register/register";

const ariaLabel = { "aria-label": "description" };

// function ChildModal(status) {
//   const [op, setOp] = React.useState(status);
//   const handleOpen = () => {
//     setOp(true);
//   };
//   const handleClose = () => {
//     setOp(false);
//   };
//   return (
//     <React.Fragment>
//       <Modal
//         hideBackdrop
//         open={op}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Followers />
//       </Modal>
//     </React.Fragment>
//   );
// }
export interface NewPostForm {
  title: string;
  content: string;
  image: string;
  privacy: Privacy;
  users: [] | null;
}
enum Privacy {
  Public,
  Private,
  StrictlyPrivate,
}

export function NewPost() {
  const { handleSubmit, register } = useForm<NewPostForm>();
  const open = useSelector((state: RootState) => state.post.isOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(update());
  };
  const [value, setValue] = React.useState(Privacy.Public);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setValue((event.target as HTMLInputElement).value);
  };
  // let toShow = false;

  // const showFollowers = () => {
  //   console.log(toShow);
  //   toShow = true;
  //   console.log("Your followers");
  //   console.log(toShow);
  // };
  //
  // const hideFollowers = () => {
  //   console.log(toShow);
  //   toShow = false;
  //   console.log(toShow);
  // };

  const newPost = async (data: NewPostForm) => {
    data.privacy = value as Privacy;
    console.log("New post", data);
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
          <Input
            placeholder="Title"
            inputProps={ariaLabel}
            // variant="filled"
            fullWidth
            {...register("title")}
            required
          />
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
        <Input type={"file"} {...register("image")}></Input>
        <FormControl id={""} sx={{ ml: 10 }}>
          Who can see this post?
          <RadioGroup
            // aria-labelledby="demo-controlled-radio-buttons-group"
            name="post-privacy"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value={Privacy.Public}
              control={<Radio />}
              label="All users"
            />
            <FormControlLabel
              value={Privacy.Private}
              control={<Radio />}
              label="Followers" //Friends?
            />
            <FormControlLabel
              // onClick={ChildModal(true)}
              value={Privacy.StrictlyPrivate}
              control={<Radio />}
              label="Chosen ones"
            />
          </RadioGroup>
        </FormControl>
        <div>
          <Button type={"submit"} variant="contained">
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
