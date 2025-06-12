const fetchGists = async () => {
    try {
        const response = await fetch(`https://api.github.com/gists/public?per_page=150`, {});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching gists:", error);
        return [];
    }
};  
const fetchStarredGists = async () => {
    try {
        const response = await fetch(`https://api.github.com/gists/starred?per_page=150`, {
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
            console.log('response.status.......', response)
            if (response.status === 404) {
                return false;
            } else if (response.status === 204) {
                return true;
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

const forkGist = async (gistId: string) => {
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}/forks`, {
            method: "POST",
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
        });
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error forking gist:", error);
        return null;
    }
};


const listGistForks = async (gistId: string) => {
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}/forks`, {
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error listing gist forks:", error);
        return [];
    }
};

// need similar api for listGistStars 
const listGistStars = async () => {
    try {
        const response = await fetch(`https://api.github.com/gists/starred`, {
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error listing gist stars:", error);
        return [];
    }
}

const createGist = async (gist: any) => {   
    try {
        const response = await fetch(`https://api.github.com/gists`, {
            method: "POST",
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(gist),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating gist:", error);
        return null;
    }
};
    
const getGistForUser = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${localStorage.getItem('user_name')}/gists`, {
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`,
            },
        });
        console.log('response', response)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting gist for user:", error);
        return [];
    }
}

export {fetchGists, fetchStarredGists, starGist, isGistStarred, unStarGist, forkGist, listGistForks, createGist, getGistForUser, listGistStars};