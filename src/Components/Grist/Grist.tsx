import { useState, useEffect, useMemo } from 'react';
import GristGrid from './GristGrid';
import GristList from './GristList';
import Pagination from './Pagination';
import styles from "./Grist.module.css";
import { fetchGists, getGistForUser } from '../../services/gistService';
import useGistStore from '../../store/gistStore';

export default function Grist() {
    const [allGists, setAllGists] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('list');
    const [pageSize, setPageSize] = useState(8); // Make page size dynamic
    const [isLoading, setIsLoading] = useState(false);

    const loadGists = async () => {
        setIsLoading(true);
        try {
            const { setGists, setYourGist } = useGistStore.getState();
            const yourGist = await getGistForUser();
            setYourGist(yourGist);
            const data = await fetchGists();
            setGists(data);

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
        } catch (error) {
            console.error("Failed to load gists:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadGists();    
    }, []);

    const filteredGists = useMemo(() => {
        return allGists.filter((gist: any) => {
            return (
                gist.notebookName?.toLowerCase()?.includes(search.toLowerCase()) ||
                gist.description?.toLowerCase()?.includes(search.toLowerCase()) ||
                gist.username?.toLowerCase()?.includes(search.toLowerCase())
            );
        });
    }, [search, allGists]);

    const totalPages = Math.ceil(filteredGists.length / pageSize);
    const paginatedGists = useMemo(() => {
        return filteredGists.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        );
    }, [filteredGists, currentPage, pageSize]);

    // Reset to first page when search or page size changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search, pageSize]);

    return (
        <div className={styles.grist}>
            <div className={styles["grist__header"]}>
                <h1>Public Gists</h1>
                <div className={styles["grist__header--controls"]}>
                    <input
                        type="text"
                        placeholder="Search Gists"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles["search__input"]}
                    />
                    <button
                        className={viewMode === 'grid' ? styles.active : ''}
                        onClick={() => setViewMode('grid')}
                    >
                        Grid
                    </button>
                    <button
                        className={viewMode === 'list' ? styles.active : ''}
                        onClick={() => setViewMode('list')}
                    >
                        List
                    </button>
                </div>
            </div>
            
            {isLoading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <>
                    {viewMode === 'list' ? (
                        <GristList gists={paginatedGists} />
                    ) : (
                        <GristGrid gists={paginatedGists} />
                    )}
                </>
            )}

            {filteredGists.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    totalItems={filteredGists.length}
                />
            )}
        </div>
    );
}