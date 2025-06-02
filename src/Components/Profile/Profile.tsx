import { useLocation } from "react-router-dom";
import styles from './Profile.module.css';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { fetchStarredGists } from "../../services/gistService";
import { useEffect, useState } from "react";
import useGistStore from "../../store/gistStore";
export default function Profile() {
  const { user, isStarred } = useLocation().state;
  console.log('isStarred in profile', isStarred)
  const { gists, yourGist } = useGistStore();
  const [starredGists, setStarredGists] = useState([]);
  useEffect(() => {
    if (isStarred) {
      fetchStarredGists().then((data) => {
        setStarredGists(data);
      });
    }
  }, [isStarred]);

  console.log('===========')
  console.log(yourGist)
  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-sidebar"]}>
        <img className={styles["profile-avatar"]} src={user?.avatar_url} alt={user?.name} />
        <p className={styles["profile-name"]}>{user?.name}</p>
        <a href={`https://github.com/${user?.user_name}`} target="_blank">  
        <button className={styles["view-github-profile"]}>
          View GitHub Profile
        </button></a>
      </div>

      <div className={styles["gists-container"]}>
        <h2 className={styles["gists-heading"]}>{isStarred ? "Starred Gists" : "Your Gists"} <span className={styles["gist-count"]}>{isStarred ? starredGists.length : yourGist.length}</span></h2>

        {isStarred ? starredGists.map((gist: any, index: number) => (
          <div className={styles["gist-card"]} key={index}>
            <JsonView value={gist} style={lightTheme} />
            <div className={styles["gist-meta"]}>
              <p className={styles["gist-title"]}>
                <img src={user?.avatar_url} className={styles["small-avatar"]} alt="avatar" />
                <span>{user?.name} / </span>
                <span className={styles["gist-name"]}>{gist.description || "Untitled Gist"}</span>
              </p>
              <p className={styles["gist-description"]}>{gist.description || "No description provided."}</p>
            </div>
          </div>
        )) : yourGist.map((gist: any, index: number) => (
          <div className={styles["gist-card"]} key={index}>
            <JsonView value={gist} style={lightTheme} />
            <div className={styles["gist-meta"]}>
              <p className={styles["gist-title"]}>
                <img src={user?.avatar_url} className={styles["small-avatar"]} alt="avatar" />
                <span>{user?.name} / </span>
                <span className={styles["gist-name"]}>{gist.description || "Untitled Gist"}</span>
              </p>
              <p className={styles["gist-description"]}>{gist.description || "No description provided."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
