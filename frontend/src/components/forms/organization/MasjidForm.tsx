import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { FormLayout } from '@components/tail-kit/form/layout/FormLayout'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { DOCUMENT } from '@config'

import { useLazyQuery, useMutation } from '@apollo/client'
import {
  GQLM_ADD_TOTALAMOUNT,
  GQL_DELETE_ORGANIZATION,
} from '@entities/asp/organization'
import {
  OrganizationPostType,
  GqlMAddOrganization_addOrganization,
  GqlMAddTotalAmount,
  GqlMAddTotalAmountVariables,
} from '@gqlTypes/asp'
import { BandeauLineAlert } from '@components/tail-kit/elements/alert/BandeauLineAlert'
import { useRouter } from 'next/router'
import {
  GQLdeleteOrganization,
  GQLdeleteOrganizationVariables,
} from '@gqlTypes/asp/__generated__/GQLdeleteOrganization'
export interface ICheckboxState {
  id: number
  title: OrganizationPostType
  checked: boolean
}
export const MasjidForm = () => {
  const initialFormData = {
    email: ``,
    name: ``,
    iName: ``,
    desc: ``,
    location: ``,
    phone: ``,
    postType: ``,
    totalAmount: 0,
    addedAmount: 0,
  }
  const router = useRouter()
  const [item, setItem] = useState<GqlMAddOrganization_addOrganization>()
  const orgState = useSelector((state: RootState) => state.organization)
  const userState = useSelector((state: RootState) => state.user.user)
  const [isOwner, setIsOwner] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const activeOrg = orgState.organizations.find(
      (item) => item.id === orgState.activeOrgId,
    )
    setItem(activeOrg)
  }, [orgState])

  useEffect(() => {
    setIsOwner(item?.ownerId === userState?.id)
  }, [userState, item])
  // const [isMasjid, setIsMasjid] = useState(
  //   checkboxes.filter((cb) => cb.title === `Masjid`)[0].checked,
  // )

  useEffect(() => {
    setFormData({
      email: item?.users.find((user) => user.id === item.ownerId).email || ``,
      name: item?.name || ``,
      iName: item?.iName || ``,
      desc: item?.desc || ``,
      location: item?.location || ``,
      phone: item?.phone || ``,
      postType: OrganizationPostType.MASJID || ``,
      totalAmount: item?.totalAmount || 0,
      addedAmount: 0,
    })
  }, [item])
  const [addTotalAmount, { data, error, loading }] = useMutation<
    GqlMAddTotalAmount,
    GqlMAddTotalAmountVariables
  >(GQLM_ADD_TOTALAMOUNT, {
    onCompleted: (data) => {
      setFormData({
        ...formData,
        totalAmount: data.addTotalAmount.totalAmount,
        addedAmount: 0,
      })
    },
    onError: (err) => console.log(err),
  })
  const [delOrganization] = useLazyQuery<
    GQLdeleteOrganization,
    GQLdeleteOrganizationVariables
  >(GQL_DELETE_ORGANIZATION, {
    onCompleted: (data) => {
      router.push(`/dashboard/organizations`)
    },
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...formData },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, `Max Length less than 100`)
        .required(`Required!`),
      iname: Yup.string().max(100, `Max Length less than 100`),
      desc: Yup.string().max(1000, `Max Length less than 1000`),
      location: Yup.string()
        .max(200, `Max Length less than 200`)
        .required(`Required!`),
      phone: Yup.number().required(`Required!`),
      totalAmount: Yup.number(),
      addedAmount: Yup.number(),
    }),

    onSubmit: () => {
      console.log(`in submit`)

      // addOrg({
      //   variables: {
      //     addOrganizationReqDto: {
      //       location,
      //       name,
      //       phone: `${phone}`,
      //       type,
      //       desc,
      //       iName,
      //     },
      //   },
      // })
    },
  })
  const handleAddAmount = () => {
    addTotalAmount({
      variables: {
        orgId: item.id,
        totalAmount: formData.totalAmount + formData.addedAmount,
      },
    })
  }
  const handleDelete = () => {
    delOrganization({
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
            <h2 className="max-w-sm mx-auto  md:w-4/12">{`Masjid Name`}</h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="name"
                type="text"
                disabled={!isOwner}
                placeholder={`Enter Masjid Name`}
                value={formik.values.name}
                onChange={(e) => {
                  formik.handleChange(e)
                  setFormData({ ...formData, name: formik.values.name })
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

          <div className="items-center w-full px-6 py-2 text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">{`Imam Name`}</h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="iName"
                type="text"
                disabled={!isOwner}
                placeholder={`Enter Imam Name`}
                value={formik.values.iName || ``}
                onChange={(e) => {
                  formik.handleChange(e)
                  setFormData({ ...formData, iName: formik.values.iName })
                }}
                error={
                  formik.touched.iName &&
                  formik.errors.iName &&
                  formik.errors.iName
                }
                required={formik.touched.iName && formik.errors.iName && true}
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
                value={formik.values.phone || ``}
                onChange={(e) => {
                  formik.handleChange(e)
                  setFormData({ ...formData, phone: formik.values.phone })
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
                value={formik.values.desc || ``}
                onChange={(e) => {
                  formik.handleChange(e)
                  setFormData({ ...formData, desc: formik.values.desc })
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
                  setFormData({ ...formData, location: formik.values.location })
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

          <div className="items-center w-full px-6 py-2 text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">{`Total Ammount`}</h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="totalAmount"
                type="number"
                placeholder={`0`}
                value={formik.values.totalAmount || 0}
                disabled
              />
            </div>
          </div>

          <div className="items-center w-full px-6 py-2 text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">{`Add Ammount`}</h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="addedAmount"
                type="number"
                placeholder={`Enter Ammount`}
                value={formik.values.addedAmount || ``}
                onChange={(e) => {
                  formik.handleChange(e)
                  setFormData({
                    ...formData,
                    addedAmount: formik.values.addedAmount,
                  })
                }}
                error={
                  formik.touched.addedAmount &&
                  formik.errors.addedAmount &&
                  formik.errors.addedAmount
                }
                required={
                  formik.touched.addedAmount &&
                  formik.errors.addedAmount &&
                  true
                }
              />
            </div>
          </div>

          <hr />

          <div className="m-3">
            {data ? (
              <BandeauLineAlert
                title="Organization Updated Sucessfully !"
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
          </div>
          <div className="flex flex-wrap ">
            <div className="  pb-4 text-gray-500 md:w-2/3 ">
              {isOwner && (
                <>
                  <Button
                    label={`Update`}
                    color="gray"
                    className="  py-2 px-4 mx-5 ml-8 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg    py-2  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  mt-5 h-10 md:w-1/3 text-center"
                    isloading={loading}
                  />
                  <Button
                    label={`Delete`}
                    color="gray"
                    className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg    py-2  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  mt-5 h-10 md:w-1/3 text-center"
                    onClick={handleDelete}
                    isloading={loading}
                  />
                </>
              )}
            </div>
            <div className="  pb-4  text-gray-500 md:w-1/3">
              {!isOwner && (
                <Button
                  label={`Add Ammount`}
                  color="gray"
                  onClick={handleAddAmount}
                  className=" py-2 px-4 pr-5 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg md:w-3/4 mt-5 h-10 text-center"
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
