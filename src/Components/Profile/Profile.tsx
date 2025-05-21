import { useLocation } from "react-router-dom";
import styles from './Profile.module.css';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
export default function Profile() {
  const { user, gists } = useLocation().state;
  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-sidebar"]}>
        <img className={styles["profile-avatar"]} src={user?.avatar_url} alt={user?.name} />
        <p className={styles["profile-name"]}>{user?.name}</p>
        <button className={styles["view-github-profile"]} onClick={() => window.open(`https://github.com/${user?.user_name}`)}>
          View GitHub Profile
        </button>
      </div>

      <div className={styles["gists-container"]}>
        <h2 className={styles["gists-heading"]}>All Gists <span className={styles["gist-count"]}>{gists.length}</span></h2>
        {gists.map((gist: any, index: number) => (
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
