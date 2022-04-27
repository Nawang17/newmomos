import { Button, Tabs } from "@mantine/core";
import React from "react";
import { CalendarEvent, Photo, Heart, Inbox } from "tabler-icons-react";
import { useParams } from "react-router-dom";
const ProfileHeader = () => {
  const { username } = useParams();
  return (
    <>
      <div className="ProfileHeader">
        <div className="ProfileHeadertop">
          <div
            className="profileTop
    "
          >
            <img
              className="profileImage"
              src="https://picsum.photos/300/300"
              alt=""
            />
            <div>
              <Button>Follow</Button>
            </div>
          </div>
          <div className="username">
            <p>{username}</p>
          </div>
          <div className="description">
            <p>hello bruh this is description</p>
          </div>
          <div className="joinedDate">
            <CalendarEvent size={19} />
            <p>Joined April 2021</p>
          </div>
          <div className="followData">
            <div className="followers">
              <strong>1000</strong> Following
            </div>
            <div className="followers">
              <strong>1000</strong> Followers
            </div>
          </div>
        </div>
      </div>
      <Tabs>
        <Tabs.Tab label="Posts" icon={<Inbox size={14} />}>
          posts
        </Tabs.Tab>
        <Tabs.Tab label="Likes" icon={<Heart size={14} />}>
          likedposts
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default ProfileHeader;
