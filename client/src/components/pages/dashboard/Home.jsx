import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import PulseLoader from "react-spinners/PulseLoader";
import HeartIcon from "../../utilities/icons/HeartIcon";
import SavedPostsIcon from "../../utilities/icons/SavedPostsIcon";
import DeleteIcon from "../../utilities/icons/DeleteIcon";
import Footer from "../../utilities/dashboard/Footer";
import { AppContext } from "../../../App";

const HomeWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding: 2rem;

  overflow-x: hidden;
  overflow-y: scroll;

  .home--posts-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .home--post {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding-bottom: 3rem;
    border-bottom: 1px solid var(--color-dark-gray);
  }

  .home--post:last-child {
    border: none;
  }

  .home--post > header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .home--post > header > button {
    margin-left: auto;
  }

  .home--post-pp {
    width: 4.2rem;
    height: 4.2rem;

    border-radius: 50%;
  }

  .home--post a {
    color: var(--color-white);

    font-size: var(--font-sm-1);
  }

  .home--post-content {
    width: 46.8rem;
    height: auto;

    border-radius: 1%;
  }

  .home--post-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8rem;
  }

  .home--post-btns > div {
    color: var(--color-white);

    display: flex;
    align-items: center;
    gap: 1rem;

    width: 4.6rem;

    font-size: var(--font-sm-1);
  }

  .home--post-btn {
    display: grid;
    place-items: center;
  }

  .home--post-btn svg {
    transition: fill 0.3s;
  }

  .home--post-text {
    font-size: var(--font-sm-1);
  }

  .home--post-text a {
    font-weight: 600;

    margin-right: 1rem;
  }

  .home--posts-empty {
    font-size: var(--font-sm-2);
    font-weight: 600;
  }

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const Home = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AppContext);

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const {
        data: {
          data: { posts },
        },
      } = await axiosFetch.get("/posts");
      return posts;
    },
  });

  const updateLikes = useMutation({
    mutationFn: (data) => {
      return axiosFetch.patch(`/posts/${data.id}/like`, { statFlag: data.statFlag });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateSaves = useMutation({
    mutationFn: (data) => {
      return axiosFetch.patch(`/posts/${data.id}/save`, { statFlag: data.statFlag });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <HomeWrapper>
      {isError && (
        <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
          <Error />
        </div>
      )}
      {isPending && (
        <PulseLoader
          color="var(--color-blue)"
          cssOverride={{ position: "relative", top: "50%" }}
        />
      )}
      {!isError && !isPending && (
        <div className="home--posts-container">
          {data.length === 0 && (
            <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
              <p className="home--posts-empty">No posts yet!</p>
            </div>
          )}
          {data.length !== 0 && (
            <>
              <div className="home--post">
                <header>
                  <img
                    className="home--post-pp"
                    src={data[3]?.contentInfo?.imageUrl}
                  />
                  <Link to={`/dashboard/profile/${data[3].userInfo.userId}`}>{data[3].userInfo.username}</Link>
                  {userId === data[3].userInfo.userId && (
                    <button className="home--post-btn">
                      <DeleteIcon
                        fill="var(--color-white)"
                        stroke="none"
                        width="3rem"
                        height="3rem"
                      />
                    </button>
                  )}
                </header>
                <img
                  className="home--post-content"
                  src={data[3]?.contentInfo?.imageUrl}
                />
                <div className="home--post-btns">
                  <div>
                    <button
                      className="home--post-btn"
                      onClick={() =>
                        updateLikes.mutate({ statFlag: !data[3].likesInfo.users[userId], id: data[3]._id })
                      }>
                      <HeartIcon
                        fill={data[3].likesInfo.users[userId] ? "var(--color-red)" : ""}
                        stroke="var(--color-red)"
                        width="2.7rem"
                        height="2.7rem"
                      />
                    </button>
                    <div>{data[3].likesInfo.num}</div>
                  </div>
                  <div>
                    <button
                      className="home--post-btn"
                      onClick={() =>
                        updateSaves.mutate({ statFlag: !data[3].savesInfo.users[userId], id: data[3]._id })
                      }>
                      <SavedPostsIcon
                        fill={data[3].savesInfo.users[userId] ? "var(--color-yellow)" : ""}
                        stroke="var(--color-yellow)"
                        width="2.5rem"
                        height="2.5rem"
                      />
                    </button>
                    <div>{data[3].savesInfo.num}</div>
                  </div>
                </div>
                <p className="home--post-text">
                  <Link to={`/dashboard/profile/${data[3].userInfo.userId}`}>{data[3].userInfo.username}</Link>
                  {data[3].caption}
                </p>
              </div>

              <div className="home--post">
                <header>
                  <img
                    className="home--post-pp"
                    src={data[3]?.contentInfo?.imageUrl}
                  />
                  <Link to={`/dashboard/profile/${data[3].userInfo.userId}`}>{data[3].userInfo.username}</Link>
                  {userId === data[3].userInfo.userId && (
                    <button className="home--post-btn">
                      <DeleteIcon
                        fill="var(--color-white)"
                        stroke="none"
                        width="3rem"
                        height="3rem"
                      />
                    </button>
                  )}
                </header>
                <img
                  className="home--post-content"
                  src={data[3]?.contentInfo?.imageUrl}
                />
                <div className="home--post-btns">
                  <div>
                    <button
                      className="home--post-btn"
                      onClick={() =>
                        updateLikes.mutate({ statFlag: !data[3].likesInfo.users[userId], id: data[3]._id })
                      }>
                      <HeartIcon
                        fill={data[3].likesInfo.users[userId] ? "var(--color-red)" : ""}
                        stroke="var(--color-red)"
                        width="2.7rem"
                        height="2.7rem"
                      />
                    </button>
                    <div>{data[3].likesInfo.num}</div>
                  </div>
                  <div>
                    <button
                      className="home--post-btn"
                      onClick={() =>
                        updateSaves.mutate({ statFlag: !data[3].savesInfo.users[userId], id: data[3]._id })
                      }>
                      <SavedPostsIcon
                        fill={data[3].savesInfo.users[userId] ? "var(--color-yellow)" : ""}
                        stroke="var(--color-yellow)"
                        width="2.5rem"
                        height="2.5rem"
                      />
                    </button>
                    <div>{data[3].savesInfo.num}</div>
                  </div>
                </div>
                <p className="home--post-text">
                  <Link to={`/dashboard/profile/${data[3].userInfo.userId}`}>{data[3].userInfo.username}</Link>
                  {data[3].caption}
                </p>
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
    </HomeWrapper>
  );
};

export default Home;
