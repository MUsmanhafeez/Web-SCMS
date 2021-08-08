import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { FormLayout } from '@components/tail-kit/form/layout/FormLayout'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { DOCUMENT } from '@config'
import { Checkbox as CheckboxGroup } from '@components/tail-kit/form/toggle/Checkbox'

import { useLazyQuery, useMutation } from '@apollo/client'
import {
  GQLM_ADD_ORGANIZARION,
  GQLM_ENROLL_ORGANIZATION,
  GQLM_UPDATE_ORG,
  GQL_DELETE_ORGANIZATION,
} from '@entities/asp/organization'
import {
  OrganizationPostType,
  GqlMAddOrganization,
  GqlMAddOrganizationVariables,
  GqlMAddOrganization_addOrganization,
  GQLdeleteOrganization,
  GQLdeleteOrganizationVariables,
  GqlMModifyOrganization,
  GqlMModifyOrganizationVariables,
  GqlMEnrollUser,
  GqlMEnrollUserVariables,
  GqlMAddOrganization_addOrganization_users,
} from '@gqlTypes/asp'
import { BandeauLineAlert } from '@components/tail-kit/elements/alert/BandeauLineAlert'
import router from 'next/router'
import { AddAlert } from '@material-ui/icons'

export interface ICheckboxState {
  id: number
  title: OrganizationPostType
  checked: boolean
}
export const OthersForm = () => {
  const initialFormData = {
    orgId: ``,
    email: ``,
    name: ``,
    desc: ``,
    location: ``,
    phone: ``,
    postType: ``,
  }
  const userState = useSelector((state: RootState) => state.user.user)
  const [item, setItem] = useState<GqlMAddOrganization_addOrganization>()
  const orgState = useSelector((state: RootState) => state.organization)
  const [isOwner, setIsOwner] = useState(true)
  const [formData, setFormData] = useState(initialFormData)
  const [isMember, setIsMember] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  useEffect(() => {
    const activeOrg = orgState.organizations.find(
      (item) => item.id === orgState.activeOrgId,
    )

    setItem(activeOrg)
  }, [orgState])

  useEffect(() => {
    setIsMember(
      item?.users?.includes(
        userState as GqlMAddOrganization_addOrganization_users,
      ),
    )
    console.log(isMember)
    setIsOwner(item?.ownerId === userState?.id)
  }, [userState, item])

  useEffect(() => {
    setFormData({
      orgId: item?.id || ``,
      email: item?.users.find((user) => user.id === item.ownerId).email || ``,
      name: item?.name || ``,
      desc: item?.desc || ``,
      location: item?.location || ``,
      phone: item?.phone || ``,
      postType: OrganizationPostType.OTHER || ``,
    })
  }, [item])

  const [delOrganization] = useLazyQuery<
    GQLdeleteOrganization,
    GQLdeleteOrganizationVariables
  >(GQL_DELETE_ORGANIZATION, {
    onCompleted: (data) => {
      router.push(`/dashboard/organizations`)
    },
  })
  const [updateOrg, { data, error, loading }] = useMutation<
    GqlMModifyOrganization,
    GqlMModifyOrganizationVariables
  >(GQLM_UPDATE_ORG, {
    onCompleted: ({ modifyOrganization }) => {
      setFormData({
        ...formData,
        desc: modifyOrganization.desc,
        name: modifyOrganization.name,
        orgId: modifyOrganization.id,
        phone: modifyOrganization.phone,
      })
    },
    onError: (err) => console.log(err),
  })
  const [enrollUser] = useMutation<GqlMEnrollUser, GqlMEnrollUserVariables>(
    GQLM_ENROLL_ORGANIZATION,
    {
      onCompleted: (data) => {
        setFormData({
          ...formData,
        })
        setIsUpdated(true)
        router.push(`/dashboard/organizations`)
      },
      onError: (err) => console.log(err),
    },
  )
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...formData },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, `Max Length less than 100`)
        .required(`Required!`),
      desc: Yup.string().max(1000, `Max Length less than 1000`),
      location: Yup.string()
        .max(200, `Max Length less than 200`)
        .required(`Required!`),
      phone: Yup.number().required(`Required!`),
      totalAmount: Yup.number(),
    }),

    onSubmit: (e) => {
      console.log(`in submit`)
    },
  })
  const handleDelete = () => {
    delOrganization({
      variables: {
        orgId: item.id,
      },
    })
  }
  // const showConfirmDialog = () => {
  //   return AddAlert.alert(
  //     `Are your sure?`,
  //     `Are you sure you want to remove your Ad?`,
  //     [
  //       // The "Yes" button
  //       {
  //         text: `Yes`,
  //         onPress: () => {
  //           handleDelete()
  //         },
  //       },
  //       // The "No" button
  //       // Does nothing but dismiss the dialog when tapped
  //       {
  //         text: `No`,
  //       },
  //     ],
  //   )
  // }
  const handleUpdate = () => {
    console.log(formData)
    updateOrg({
      variables: {
        modifyOrgReqDto: {
          desc: formData.desc,
          name: formData.name,
          orgId: formData.orgId,
          phone: formData.phone,
          type: OrganizationPostType.OTHER,
        },
      },
    })
  }
  const handleEnrollUser = () => {
    enrollUser({
      variables: {
        orgId: item.id,
      },
    })
  }
  if (!userState) {
    return <div>Not ready</div>
  } else {
    return (
      <FormLayout title={`Add Organization`} imgSrc={DOCUMENT.logo}>
        <form onSubmit={formik.handleSubmit}>
          <div className="items-center w-full  py-2  text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Account</h2>
            <div className="max-w-sm mx-auto md:w-2/3 ">
              <InputText
                name="email"
                type="email"
                value={formik.values.email || ``}
                disabled={true}
                icon={<i className="far fa-envelope-square" />}
              />
            </div>
          </div>

          <hr />
          <div className="items-center w-full px-6 py-2 text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">{`Field Name`}</h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="name"
                type="text"
                disabled={!isOwner}
                placeholder={`Enter Organization Name`}
                value={formData.name || ``}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                }}
                error={
                  formik.touched.name &&
                  formik.errors.name &&
                  formik.errors.name
                }
                required={formik.touched.name && formik.errors.name && true}
              />
            </div>
          </div>
          <div className="items-center w-full px-6 text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">Phone</h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="phone"
                type="text"
                disabled={!isOwner}
                placeholder={`Enter Your Contact Number`}
                value={formData.phone || ``}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                }}
                error={
                  formik.touched.phone &&
                  formik.errors.phone &&
                  formik.errors.phone
                }
                required={formik.touched.phone && formik.errors.phone && true}
              />
            </div>
          </div>

          <div className="items-center w-full p-6  text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">{`Description`}</h2>

            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="desc"
                type="text"
                disabled={!isOwner}
                placeholder={`Description`}
                value={formData.desc || ``}
                onChange={(e) => {
                  setFormData({ ...formData, desc: e.target.value })
                }}
                error={
                  formik.touched.desc &&
                  formik.errors.desc &&
                  formik.errors.desc
                }
                required={formik.touched.desc && formik.errors.desc && true}
              />
            </div>
          </div>
          <div className="items-center w-full px-6  text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">{`Location`}</h2>

            <div className="w-full max-w-sm pl-2 mx-auto md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="location"
                type="text"
                disabled
                placeholder={`Location`}
                value={formik.values.location || ``}
                onChange={(e) => {
                  formik.handleChange(e)
                  setFormData({ ...formData, location: e.target.value })
                }}
                error={
                  formik.touched.location &&
                  formik.errors.location &&
                  formik.errors.location
                }
                required={
                  formik.touched.location && formik.errors.location && true
                }
              />
            </div>
          </div>

          <hr />
          <div className="m-3">
            {data ? (
              <BandeauLineAlert
                title="Organization Created Sucessfully !"
                borderColor="border-gray-600"
                color="text-gray-500"
              />
            ) : (
              error &&
              error.graphQLErrors[0] && (
                <BandeauLineAlert
                  title={error.graphQLErrors[0].message}
                  borderColor="border-red-600"
                  color="text-red-500"
                />
              )
            )}

            {isUpdated && (
              <BandeauLineAlert
                title="Organization joined Sucessfully !"
                borderColor="border-gray-600"
                color="text-gray-500"
              />
            )}
          </div>
          <div className="flex flex-wrap ">
            <div className="  pb-4 text-gray-500 md:w-2/3 ">
              {isOwner && (
                <>
                  <Button
                    label={`Update`}
                    color="gray"
                    submit={true}
                    className="  py-2 px-4 mx-5 ml-8 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg    py-2  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  mt-5 h-10 md:w-1/3 text-center"
                    onClick={handleUpdate}
                    isloading={loading}
                  />
                  <Button
                    label={`Delete`}
                    color="gray"
                    submit={true}
                    className=" py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg    py-2  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  mt-5 h-10 md:w-1/3 text-center"
                    onClick={handleDelete}
                    isloading={loading}
                  />
                </>
              )}
            </div>

            <div className="  pb-4  text-gray-500 md:w-1/3">
              {!isOwner && (
                <Button
                  label={`Join Organization`}
                  color="gray"
                  disabled={isMember}
                  onClick={handleEnrollUser}
                  className=" py-2 px-4 pr-5 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg md:w-4/5 mt-5 h-10 text-center"
                  isloading={loading}
                />
              )}
            </div>
          </div>
        </form>
      </FormLayout>
    )
  }
}
