import * as React from "react";
import "./styles/drawer.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function ChatDrawer() {
  const list = useSelector((state: RootState) => state.followers.followers);
  console.log("Follow", list);
  return (
    <div>
      <div className="users-box">
        <ul>
          {list.length === 0 ? (
            <li>You have to follow somebody first</li>
          ) : (
            list.map((user) => {
              // @ts-ignore
              return <li>{user.first_name}</li>;
            })
          )}
        </ul>
      </div>
    </div>
  );
}
