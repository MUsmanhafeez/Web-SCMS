const fs = require('fs');
const path = require('path');

module.exports.addOrganization = fs.readFileSync(path.join(__dirname, 'addOrganization.gql'), 'utf8');
module.exports.addTotalAmount = fs.readFileSync(path.join(__dirname, 'addTotalAmount.gql'), 'utf8');
module.exports.deleteTestUser = fs.readFileSync(path.join(__dirname, 'deleteTestUser.gql'), 'utf8');
module.exports.enrollUser = fs.readFileSync(path.join(__dirname, 'enrollUser.gql'), 'utf8');
module.exports.login = fs.readFileSync(path.join(__dirname, 'login.gql'), 'utf8');
module.exports.modifyOrganization = fs.readFileSync(path.join(__dirname, 'modifyOrganization.gql'), 'utf8');
module.exports.register = fs.readFileSync(path.join(__dirname, 'register.gql'), 'utf8');
module.exports.user = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');
