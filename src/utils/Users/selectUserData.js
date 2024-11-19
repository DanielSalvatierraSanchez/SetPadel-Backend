const selectUserData = (user) => {
    const selectUserData = user.role === "admin" ? "" : "-password -role -email";
    return selectUserData;
};

module.exports = { selectUserData };
