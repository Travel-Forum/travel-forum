
export const matchesSearch = (post, query) => {

    const search = (query ?? "").trim().toLowerCase();
    const title = post.title.toLowerCase();
    const content = post.content.toLowerCase();

    if (search === "") {
        return true;
    }

    return title.includes(search) || content.includes(search); 
}