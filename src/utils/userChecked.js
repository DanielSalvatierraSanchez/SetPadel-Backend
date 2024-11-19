const { idAndRoleChecked } = require("./checkId&Role");

const userChecked = (id, user) => {
    const userChecked = idAndRoleChecked(id, user);
    if (userChecked) {
        return userChecked;
    }
};

module.exports = { userChecked };
