import { Link } from "react-router-dom";
import styles from "./Grist.module.css";
import { LucideGitFork, LucideStar } from "lucide-react";
import { starGist, isGistStarred, unStarGist, forkGist, listGistForks } from "../../services/gistService";
import useAuthStore from "../../store/authStore";

export default function GristList({ gists }: { gists: any[] }) {
    const { isLoggedIn } = useAuthStore();
     
    const formatUpdatedTime = (date: Date) => "Last updated a few hours ago";
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
        <div className={styles["grist__list"]}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead className={styles["grist__list--header"]}>
                    <tr>
                        <th>Name</th>
                        <th>Notebook Name</th>
                        <th>Keyword</th>
                        <th>Updated</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {gists.map((gist) => (
                        <tr key={gist.id} className={styles["grist__list--row"]}>
                            <td className={styles["gist__list--img"]}>
                                <img src={gist.avatarUrl} alt={gist.username} />
                                <span>{gist.username}</span>
                            </td>
                            <td>
                                <Link to={`/gist/${gist.id}`} state={{ gist }} > {gist.notebookName}</Link>
                            </td>
                            <td><span className={styles["gist__tag"]}>{gist.keyword}</span></td>
                            <td>{formatUpdatedTime(gist.updatedAt)}</td>
                            <td><button onClick={() => handleForkGist(gist.id)} ><LucideGitFork /></button></td>
                            <td><button onClick={() => handleStarGist(gist.id)}><LucideStar /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}