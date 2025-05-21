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

export default fetchGists;