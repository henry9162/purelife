export const buildFilters = (filter) => {
    let query = {};
    for (let keys in filter) {
        if (filter[keys].constructor === Array && filter[keys].length > 0) {
            query[keys] = filter[keys];
        }
    }
    return query;
}