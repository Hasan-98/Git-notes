import "./Grist.css";

export default function GristGrid({ gists }: { gists: any[] }) {
    const formatUpdatedTime = (date: Date) => "Last updated a few hours ago";

    return (
        <div className="gist__grid">
            {gists.map((gist) => (
                <div key={gist.id} className="gist__card">
                    <div className="gist__card--header">
                        <img src={gist.avatarUrl} alt={gist.username} />
                        <span>{gist.username}</span>
                    </div>
                    <div>{gist.notebookName}</div>
                    <div className="gist__card--meta">
                        <span className="gist__tag">{gist.keyword}</span>
                        <div>{formatUpdatedTime(gist.updatedAt)}</div>
                    </div>
                    <div className="gist__card--footer">
                        <button className="grist__header--button">Fork</button>
                        <button className="grist__header--button">Star</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
