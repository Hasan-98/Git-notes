import "./Grist.css";
export default function GristList({ gists }: { gists: any[] }) {
    const formatUpdatedTime = (date: Date) => "Last updated a few hours ago";

    return (
        <div className="grist__list">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead className="grist__list--header">
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
                        <tr key={gist.id} className="grist__list--row">
                            <td className="gist__list--img">
                                <img src={gist.avatarUrl} alt={gist.username} />
                                <span>{gist.username}</span>
                            </td>
                            <td>{gist.notebookName}</td>
                            <td><span className="gist__tag">{gist.keyword}</span></td>
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
