const PadelMatch = require("../../api/models/padelMatches");

const getPagination = async (query) => {
    const totalPages = await PadelMatch.countDocuments(query);
    const lastPage = Math.floor(total / 6) + 1;
    return {
        totalPages,
        lastPage
    };
};

module.exports = {
    getPagination
};
