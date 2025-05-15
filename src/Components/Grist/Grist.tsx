import { useState, useEffect, useMemo } from 'react';
import GristGrid from './GristGrid';
import GristList from './GristList';
import Pagination from './Pagination';
import "./Grist.css";

const fetchGists = async () => {
    try {
        const response = await fetch(`https://api.github.com/gists/public?per_page=50`, {
            headers: {
                'Authorization': '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'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching gists:", error);
        return [];
    }
};

export default function Grist() {
    const [allGists, setAllGists] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('list');

    const pageSize = 8;
    const loadGists = async () => {
        const data = await fetchGists();

        const formatted = data.map((gist: any) => ({
            id: gist.id,
            avatarUrl: gist.owner?.avatar_url,
            username: gist.owner?.login,
            notebookName: Object.keys(gist.files)[0],
            keyword: Object.keys(gist.files)[0]?.split('.').pop(),
            updatedAt: new Date(gist.updated_at),
            description: gist.description
        }));
        setAllGists(formatted);
    };


    useEffect(() => {
        loadGists();    
    }, []);

    const filteredGists = useMemo(() => {
        return allGists.filter((gist: any) => {
            return (
                gist.notebookName.toLowerCase().includes(search.toLowerCase()) ||
                gist.description?.toLowerCase().includes(search.toLowerCase()) ||
                gist.username?.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search, allGists]);

    const totalPages = Math.ceil(filteredGists.length / pageSize);
    const paginatedGists = filteredGists.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="grist">
            <div className="grist__header">
                <h1>Public Gists</h1>
                <div className="grist__header--controls">
                    <input
                        type="text"
                        placeholder="Search Gists"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="search__input"
                    />
                    <button
                        className='grist__header--button'
                        onClick={() => setViewMode('grid')}
                    >
                        Grid
                    </button>
                    <button onClick={() => setViewMode('list')}>List</button>
                </div>
            </div>
            {viewMode === 'list' ? (
                <GristList gists={paginatedGists} />
            ) : (
                <GristGrid gists={paginatedGists} />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}
