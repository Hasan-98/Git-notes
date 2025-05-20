import { Link } from "react-router-dom";
import styles from "./Grist.module.css";
import JsonView from '@uiw/react-json-view'
import { lightTheme } from '@uiw/react-json-view/light'

export default function GristGrid({ gists }: { gists: any[] }) {
    const formatUpdatedTime = (date: Date) => "Last updated a few hours ago";

    return (
        <div className={styles["gist__grid"]}>
            {gists.map((gist) => (
                <div key={gist.id} className={styles["gist__card"]}>
                    <div className={styles["gist__card--header"]}>
                        <img src={gist.avatarUrl} alt={gist.username} />
                        <span>{gist.username}</span>
                    </div>
                    <div>
                        <JsonView value={gist} style={lightTheme} />
                        <Link to={`/gist/${gist.id}`} state={{ gist }} > {gist.notebookName}</Link>
                    </div>
                    <div className={styles["gist__card--meta"]}>
                        <span className={styles["gist__tag"]}>{gist.keyword}</span>
                        <div>{formatUpdatedTime(gist.updatedAt)}</div>
                    </div>
                    <div className={styles["gist__card--footer"]}>
                        <button className={styles["grist__header--button"]}>Fork</button>
                        <button className={styles["grist__header--button"]}>Star</button>
                    </div>
                </div>
            ))}
        </div>
    );
}