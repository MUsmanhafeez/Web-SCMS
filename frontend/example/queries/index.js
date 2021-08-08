const fs = require(`fs`)
const path = require(`path`)

module.exports.allOrganization = fs.readFileSync(
  path.join(__dirname, `allOrganization.gql`),
  `utf8`,
)
module.exports.deleteOrganization = fs.readFileSync(
  path.join(__dirname, `deleteOrganization.gql`),
  `utf8`,
)
module.exports.myOrganizationList = fs.readFileSync(
  path.join(__dirname, `myOrganizationList.gql`),
  `utf8`,
)
module.exports.user = fs.readFileSync(path.join(__dirname, `user.gql`), `utf8`)
