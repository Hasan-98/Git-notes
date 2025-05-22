const fetchGists = async () => {
    try {
        const response = await fetch(`https://api.github.com/gists/public?per_page=50`, {});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching gists:", error);
        return [];
    }
};  
const fetchStarredGists = async () => {
    try {
        const response = await fetch(`https://api.github.com/gists/starred?per_page=50`, {
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching gists:", error);
        return [];
    }
};

const isGistStarred = async (gistId: string) => {
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}/star`, {
            method: "GET",
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
            });
            if (response.status === 204) {
                return true;
            } else {
                return false;
            }
    } catch (error) {
        console.error("Error starring gist:", error);
        return null;
    }
};

const starGist = async (gistId: string) => {
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}/star`, {
            method: "PUT",
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
        });
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error starring gist:", error);
        return null;
    }
};

const unStarGist = async (gistId: string) => {
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}/star`, {
            method: "DELETE",
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
        });
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error unstarring gist:", error);
        return null;
    }
};

export {fetchGists, fetchStarredGists, starGist, isGistStarred, unStarGist};