import { gql } from '@apollo/client'

export const GQLM_ADD_ORGANIZARION = gql`
  mutation GqlMAddOrganization($addOrganizationReqDto: AddOrganizationReqDto!) {
    addOrganization(addOrganizationReqDto: $addOrganizationReqDto) {
      createdAt
      desc
      iName
      id
      location
      name
      ownerId
      phone
      totalAmount
      type
      updatedAt
      users {
        email
        firstName
        id
        lastName
        organizations {
          createdAt
          desc
          iName
          id
          location
          name
          ownerId
          phone
          totalAmount
          type
          updatedAt
          users {
            email
            firstName
            id
            lastName
            status
          }
        }
        status
      }
    }
  }
`
export const GQLM_ADD_TOTALAMOUNT = gql`
  mutation GqlMAddTotalAmount($orgId: Uuid!, $totalAmount: Float!) {
    addTotalAmount(orgId: $orgId, totalAmount: $totalAmount) {
      createdAt
      desc
      iName
      id
      location
      name
      ownerId
      phone
      totalAmount
      type
      updatedAt
      users {
        email
        firstName
        id
        lastName
        organizations {
          createdAt
          desc
          iName
          id
          location
          name
          ownerId
          phone
          totalAmount
          type
          updatedAt
          users {
            email
            firstName
            id
            lastName
            status
          }
        }
        status
      }
    }
  }
`
export const GQL_All_ORGANIZATION = gql`
  query allOrganization {
    allOrganization {
      createdAt
      desc
      iName
      id
      location
      name
      ownerId
      phone
      totalAmount
      type
      updatedAt
      users {
        email
        firstName
        id
        lastName
        organizations {
          createdAt
          desc
          iName
          id
          location
          name
          ownerId
          phone
          totalAmount
          type
          updatedAt
          users {
            email
            firstName
            id
            lastName
            status
          }
        }
        status
      }
    }
  }
`
export const GQL_DELETE_ORGANIZATION = gql`
  query GQLdeleteOrganization($orgId: Uuid!) {
    deleteOrganization(orgId: $orgId)
  }
`
