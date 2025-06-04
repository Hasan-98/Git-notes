import { Link } from "react-router-dom";
import styles from "./Grist.module.css";
import JsonView from '@uiw/react-json-view'
import { lightTheme } from '@uiw/react-json-view/light'
import { LucideGitFork, LucideStar } from "lucide-react";
import { starGist, isGistStarred, unStarGist, forkGist, listGistForks } from "../../services/gistService";
import useAuthStore from "../../store/authStore";

export default function GristGrid({ gists }: { gists: any[] }) {
    const formatUpdatedTime = (date: Date) => "Last updated a few hours ago";
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
            alert("Gist unstared");
        } else {
            console.log('staring gist')
            await starGist(gistId);
            alert("Gist starred");
        }
    };
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
        alert("Gist forked");
    };

    return (
        <div className={styles["gist__grid"]}>
            {gists.map((gist) => (
                <div key={gist.id} className={styles["gist__card"]}>
                    <div>
                        <JsonView value={gist} style={lightTheme} />
                        <Link to={`/gist/${gist.id}`} state={{ gist }} > {gist.notebookName}</Link>
                    </div>
                    <div className={styles["gist__card--meta"]}>
                        <div>{formatUpdatedTime(gist.updatedAt)}</div>
                    </div>
                   <div className={styles["gist__card--actions"]}>
                   <div className={styles["gist__card--header"]}>
                        <img src={gist.avatarUrl} alt={gist.username} />
                        <span>{gist.username}</span>
                    </div>
                    <div className={styles["gist__card--footer"]}>
                        <button className={styles["grist__header--button"]} onClick={() => handleForkGist(gist.id)}><LucideGitFork /></button>
                        <button className={styles["grist__header--button"]} onClick={() => handleStarGist(gist.id)}><LucideStar /></button>
                    </div>
                   </div>
                </div>
            ))}
        </div>
    );
}