import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { FormLayout } from '@components/tail-kit/form/layout/FormLayout'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { DOCUMENT } from '@config'
import { Checkbox as CheckboxGroup } from '@components/tail-kit/form/toggle/Checkbox'

import { useMutation } from '@apollo/client'
import { GQLM_ADD_ORGANIZARION } from '@entities/asp/organization'
import {
  OrganizationPostType,
  GqlMAddOrganization,
  GqlMAddOrganizationVariables,
} from '@gqlTypes/asp'
import { BandeauLineAlert } from '@components/tail-kit/elements/alert/BandeauLineAlert'
import { setOrganization } from '@redux/actions'
import { addMember, addOrganization } from '@redux/slices/organization'
import _ from 'lodash'

export interface ICheckboxState {
  id: number
  title: OrganizationPostType
  checked: boolean
}
export const AddorgFrom = () => {
  const [checkboxes, setCheckboxes] = useState<ICheckboxState[]>([
    {
      id: 1,
      title: OrganizationPostType.MASJID,
      checked: false,
    },
    {
      id: 2,
      title: OrganizationPostType.OTHER,
      checked: true,
    },
  ])

  const userState = useSelector((state: RootState) => state.user.user)

  // const [isMasjid, setIsMasjid] = useState(
  //   checkboxes.filter((cb) => cb.title === `Masjid`)[0].checked,
  // )
  const [isMasjid, setIsMasjid] = useState(
    checkboxes.filter((cb) => cb.title === OrganizationPostType.MASJID)[0]
      .checked,
  )
  const check = checkboxes[0].checked
  useEffect(() => {
    const checkMajisd = checkboxes.filter(
      (cb) => cb.title === OrganizationPostType.MASJID,
    )[0].checked
    setIsMasjid(checkMajisd)
  }, [check, checkboxes])

  const initialFormData = {
    email: ``,
    name: ``,
    iName: ``,
    desc: ``,
    location: ``,
    phone: ``,
    postType: ``,
    totalAmount: 0,
  }
  const [formData, setFormData] = useState(initialFormData)
  useEffect(() => {
    setFormData({
      email: userState.email,
      name: ``,
      iName: ``,
      desc: ``,
      location: ``,
      phone: ``,
      postType: ``,
      totalAmount: 0,
    })
  }, [userState])
  const dispatch = useDispatch()
  const [addOrg, { data, error, loading }] = useMutation<
    GqlMAddOrganization,
    GqlMAddOrganizationVariables
  >(GQLM_ADD_ORGANIZARION, {
    onCompleted: (data) => {
      console.log(data)
      dispatch(addOrganization(data.addOrganization))
    },
    onError: (err) => console.log(err),
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
    }),

    onSubmit: ({ name, desc, iName, location, phone, totalAmount }) => {
      const type = isMasjid
        ? OrganizationPostType.MASJID
        : OrganizationPostType.OTHER

      addOrg({
        variables: {
          addOrganizationReqDto: {
            location,
            name,
            phone: `${phone}`,
            type,
            desc,
            iName,
            totalAmount,
          },
        },
      })
    },
  })
  if (!userState) {
    return <div>Not ready</div>
  } else {
    return (
      <FormLayout title={`Add Organization`} imgSrc={DOCUMENT.logo}>
        <form onSubmit={formik.handleSubmit}>
          <CheckboxGroup
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
          />

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
            <h2 className="max-w-sm mx-auto  md:w-4/12">
              {!isMasjid ? `Field Name` : `Masjid Name`}
            </h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="name"
                type="text"
                placeholder={
                  !isMasjid ? `Enter Organization Name` : `Enter Masjid Name`
                }
                value={formik.values.name}
                onChange={formik.handleChange}
                error={
                  formik.touched.name &&
                  formik.errors.name &&
                  formik.errors.name
                }
                required={formik.touched.name && formik.errors.name && true}
              />
            </div>
          </div>
          {isMasjid && (
            <div className="items-center w-full px-6 py-2 text-gray-500 md:inline-flex md:space-y-0 ">
              <h2 className="max-w-sm mx-auto  md:w-4/12">{`Imam Name`}</h2>

              <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
                <InputText
                  name="iName"
                  type="text"
                  placeholder={`Enter Imam Name`}
                  value={formik.values.iName || ``}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.iName &&
                    formik.errors.iName &&
                    formik.errors.iName
                  }
                  required={formik.touched.iName && formik.errors.iName && true}
                />
              </div>
            </div>
          )}
          <div className="items-center w-full px-6 text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">Phone</h2>

            <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="phone"
                type="text"
                placeholder={`Enter Your Contact Number`}
                value={formik.values.phone || ``}
                onChange={formik.handleChange}
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
                placeholder={`Description`}
                value={formik.values.desc || ``}
                onChange={formik.handleChange}
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
                placeholder={`Location`}
                value={formik.values.location || ``}
                onChange={formik.handleChange}
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
          {isMasjid && (
            <div className="items-center w-full px-6 py-2 text-gray-500 md:inline-flex md:space-y-0 ">
              <h2 className="max-w-sm mx-auto  md:w-4/12">{`Add Ammount`}</h2>

              <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
                <InputText
                  name="totalAmount"
                  type="number"
                  placeholder={`Enter Ammount`}
                  value={formik.values.totalAmount || ``}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.totalAmount &&
                    formik.errors.totalAmount &&
                    formik.errors.totalAmount
                  }
                  required={
                    formik.touched.totalAmount &&
                    formik.errors.totalAmount &&
                    true
                  }
                />
              </div>
            </div>
          )}

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
          </div>

          <div className="w-full px-4 pb-5 ml-auto text-gray-500 md:w-1/3">
            <Button
              label={`Create`}
              color="gray"
              submit={true}
              className="mt-5 h-10 text-center"
              isloading={loading}
            />
          </div>
        </form>
      </FormLayout>
    )
  }
}
