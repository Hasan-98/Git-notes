import { Link } from "react-router-dom";
import styles from "./Grist.module.css";

export default function GristList({ gists }: { gists: any[] }) {
    const formatUpdatedTime = (date: Date) => "Last updated a few hours ago";

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
                            <td><button>Fork</button></td>
                            <td><button>Star</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}