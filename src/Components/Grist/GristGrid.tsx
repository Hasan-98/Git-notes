import { Link } from "react-router-dom";
import styles from "./Grist.module.css";
import JsonView from '@uiw/react-json-view'
import { lightTheme } from '@uiw/react-json-view/light'
import { LucideGitFork, LucideStar } from "lucide-react";

export default function GristGrid({ gists }: { gists: any[] }) {
    const formatUpdatedTime = (date: Date) => "Last updated a few hours ago";

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
                        <button className={styles["grist__header--button"]}><LucideGitFork /></button>
                        <button className={styles["grist__header--button"]}><LucideStar /></button>
                    </div>
                   </div>
                </div>
            ))}
        </div>
    );
}