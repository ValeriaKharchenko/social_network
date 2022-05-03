import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Follower } from "./posts/newPost";

function not(a: readonly Follower[], b: readonly Follower[]) {
  return a.filter((value) => b.map((c) => c.id).indexOf(value.id) === -1);
}

function intersection(a: readonly Follower[], b: readonly Follower[]) {
  return a.filter((value) => b.map((c) => c.id).indexOf(value.id) !== -1);
}

interface Inpt {
  followers: Follower[];
  sendBack: (f: readonly Follower[]) => void;
}

export default function TransferList(
  props: Inpt
  // sendBack: (arg0: readonly Follower[]) => void
) {
  console.log("1", props);
  console.log("2", props.followers);
  const [checked, setChecked] = React.useState<readonly Follower[]>([]);
  const [left, setLeft] = React.useState<readonly Follower[]>([]);
  const [right, setRight] = React.useState<readonly Follower[]>(
    props.followers
  );

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Follower) => () => {
    const currentIndex = checked.map((c) => c.id).indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    props.sendBack([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    const followers = not(left, leftChecked);
    setLeft(followers);
    setChecked(not(checked, leftChecked));
    props.sendBack(followers);
  };

  const handleCheckedLeft = () => {
    const followers = left.concat(rightChecked);
    setLeft(followers);
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    props.sendBack(followers);
  };

  const handleAllLeft = () => {
    const followers = left.concat(right);
    setLeft(followers);
    setRight([]);
    props.sendBack(followers);
  };

  const customList = (items: readonly Follower[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: Follower) => {
          const labelId = `user-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.map((c) => c.id).indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${value.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
