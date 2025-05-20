
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { useLocation } from 'react-router-dom'
import styles from './GristDetails.module.css';
export default function GistDetail() {
  const location = useLocation()
  
  console.log(location.state.gist)

  return (
    <div className={styles["gist-content"]}>
      <div className={styles["gist-header"]}>
        <div className={styles["user-info"]}>
          <img
            src={location.state.gist.avatarUrl}
            alt="User avatar"
            className={styles["avatar"]}
          />
          <div className={styles["user-details"]}>
            <div className={styles["username-repo"]}>
              <span className={styles["username"]}>{location.state.gist.username}</span>
              <span className={styles["separator"]}>/</span>
              <span className={styles["repo-name"]}>{location.state.gist.notebookName}</span>
            </div>
            <div className={styles["creation-info"]}>Created 7 hours ago</div>
            <div className={styles["description"]}>{location.state.gist.description}</div>
          </div>
        </div>
        <div className={styles["actions"]}>
          <button className={styles["btn"]}>Star</button>
          <button className={styles["btn"]}>Fork</button>
        </div>
      </div>
    <div className={styles["file-header"]}>
      <span className={styles["file-name"]}>{location.state.gist.notebookName}</span>
    </div>
  
    <div className={styles["json-view-container"]}>
    <JsonView value={location.state.gist} style={lightTheme} />
    </div>
  </div>
  
  );
}