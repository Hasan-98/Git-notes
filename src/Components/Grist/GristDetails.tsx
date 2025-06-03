
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { useLocation } from 'react-router-dom'
import styles from './GristDetails.module.css';
import { LucideGitFork, LucideStar } from 'lucide-react';
import { starGist, isGistStarred, unStarGist, forkGist, listGistForks, listGistStars } from '../../services/gistService';
import useAuthStore from '../../store/authStore';
import { useEffect, useState } from 'react';
export default function GistDetail() {
  const location = useLocation()
  const [forkCount, setForkCount] = useState(0);
  const [starCount, setStarCount] = useState(0);
    useEffect(() => {
    listGistForks(location.state.gist.id).then((res) => {
      console.log('forks------------------', res.length)
      setForkCount(res.length) ;
    });
    listGistStars().then((res) => {
      console.log('stars------------------', res.length)
      setStarCount(res.length);
    });
  }, []);

  const { isLoggedIn } = useAuthStore();
  const handleStarGist = async (gistId: string) => {
    console.log('================')
    console.log('in handleStarGist')
    console.log('isLoggedIn', isLoggedIn)
    if (!isLoggedIn) {
        alert("Please login to star a gist");
        return;
    }
    const isStarred = await isGistStarred(gistId);
    console.log('isStarred', isStarred)
    if (isStarred) {
        console.log('unstaring gist')
        await unStarGist(gistId);
        setStarCount((prev) => prev - 1)
        alert("Gist unstared");
    } else {
        console.log('staring gist')
        await starGist(gistId);
        setStarCount((prev) => prev + 1)
        alert("Gist starred");
    }
}

const handleForkGist = async (gistId: string) => {
    console.log('================')
    console.log('in handleForkGist')
    console.log('isLoggedIn', isLoggedIn)
    if (!isLoggedIn) {
        alert("Please login to fork a gist");
        return;
    }
    const forks = await listGistForks(gistId);
    console.log('forks', forks)
    if (forks.some((fork: any) => fork.owner.login === localStorage.getItem('user_name'))) {
        alert("You have already forked this gist");
        return;
    }
    console.log('forking gist')
    await forkGist(gistId);
    setForkCount((prev) => prev + 1)
    alert("Gist forked");
}
  
  console.log(location.state.gist)
// need to show the count in the star and fork button
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
          <button className={styles["btn"]} onClick={() => handleStarGist(location.state.gist.id)}><LucideStar />Star {starCount}</button>
          <button className={styles["btn"]} onClick={() => handleForkGist(location.state.gist.id)}><LucideGitFork />Fork {forkCount}</button>
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