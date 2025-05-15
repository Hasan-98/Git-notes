import React, { useState, useEffect } from 'react';
import "./Grist.css"
const fetchGists = async (page = 1) => {
    try {
        const response = await fetch(`https://api.github.com/gists/public?page=${page}&per_page=8`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching gists:", error);
        return [];
    }
};

export default function Grist() {
    const [gists, setGists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(14);
    const [viewMode, setViewMode] = useState('list');
    const loadGists = async () => {
        setIsLoading(true);
        const data = await fetchGists(currentPage);

        const grist = data.map((gist: any) => ({
            id: gist.id,
            avatarUrl: gist.owner?.avatar_url,
            username: gist.owner?.login,
            notebookName: Object.keys(gist.files)[0],
            keyword: Object.keys(gist.files)[0]?.split('.').pop(),
            updatedAt: new Date(gist.updated_at),
        }));
        setGists(grist);
        setIsLoading(false);
    };
    useEffect(() => {
        loadGists();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const formatUpdatedTime = (date: any) => {
        return `Last updated a few hours ago`;
    };

    const displayGists = gists;

    return (
        <>
            <div className="grist">
                <div className="grist__header">
                    <h1>Public Gists</h1>
                    <div>
                        <button
                            className='grist__header--button'
                            onClick={() => setViewMode('grid')}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                        >
                            List
                        </button>
                    </div>
                </div>

                {viewMode === 'list' ? (
                    <div className="grist__list">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead className="grist__list--header">
                                <tr>
                                    <th className="grist__list--col">Name</th>
                                    <th className="grist__list--col">Notebook Name</th>
                                    <th className="grist__list--col">Keyword</th>
                                    <th className="grist__list--col">Updated</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayGists.map((gist: any) => (
                                    <tr key={gist.id} className="grist__list--row">
                                        <td className="gist__list--img">
                                            <img
                                                src={gist.avatarUrl}
                                                alt={gist.username}
                                            />
                                            <span>{gist.username}</span>
                                        </td>
                                        <td>{gist.notebookName}</td>
                                        <td>
                                            <span className="gist__tag">Keyword</span>
                                        </td>
                                        <td>{formatUpdatedTime(gist.updatedAt)}</td>
                                        <td>
                                            <button>Fork</button>
                                        </td>
                                        <td>
                                            <button>Star</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="gist__grid">
                        {displayGists.map((gist: any) => (
                            <div key={gist.id} className="gist__card">
                                <div className="gist__card--header">
                                    <img
                                        src={gist.avatarUrl}
                                        alt={gist.username}
                                    />
                                    <span>{gist.username}</span>
                                </div>
                                <div>{gist.notebookName}</div>
                                <div className="gist__card--meta">
                                    <span className="gist__tag">Keyword</span>
                                    <div>{formatUpdatedTime(gist.updatedAt)}</div>
                                </div>
                                <div className="gist__card--footer">
                                    <button>Fork</button>
                                    <button>Star</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="grist__pagination">
                    <button
                        className='grist__pagination--button'
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    <span>Page</span>
                    <input
                        className='grist__pagination--input'
                        type="number"
                        value={currentPage}
                        onChange={(e) => {
                            const page = parseInt(e.target.value);
                            if (!isNaN(page) && page > 0 && page <= totalPages) {
                                setCurrentPage(page);
                            }
                        }}
                    />
                    <span>of {totalPages}</span>
                    <button
                        className='grist__pagination--button'
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );
}