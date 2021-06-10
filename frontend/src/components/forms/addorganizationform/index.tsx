import React, { FC, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { setUser } from '@redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@redux/reducers'
import { GQLM_UPDATE_USER } from '@entities'
import { FormLayout } from '@components/tail-kit/form/layout/FormLayout'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { BandeauLineAlert } from '@components/tail-kit/elements/alert/BandeauLineAlert'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { DOCUMENT } from '@config'

export const AddorgFrom = () => {
  const userState = useSelector((state: RootState) => state.user.user)

  const [email] = useState(userState.email)
  const [name, setName] = useState(``)
  const [iName, setIName] = useState(``)
  const [location, setLocation] = useState(``)
  const [desc, setDesc] = useState(``)
  const [phone, setPhone] = useState(``)
  const [totalAmount, setTotalAmount] = useState(0)
  // const [isMasjid, setIsMasjid] = useState(
  //   checkboxes.filter((cb) => cb.title === `Masjid`)[0].checked,
  // )

  const initialFormData = {
    email,
    name,
    iName,
    desc,
    location,
    phone,
    totalAmount,
  }
  const [formData, setFormData] = useState(initialFormData)

  // const [updateUser, { data, error, loading }] = useMutation<
  //   GqlMOrg,
  //   GqlMorgVariables
  // >(GQLM_UPDATE_USER, {
  //   onCompleted: (data) => {
  //     dispatch(setUser(data.user))
  //   },
  // })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, `Max Length less than 100`)
        .required(`Required!`),
      iname: Yup.string().max(100, `Max Length less than 100`),
      desc: Yup.string().max(1000, `Max Length less than 1000`),
      location: Yup.string()
        .max(200, `Max Length less than 200`)
        .required(`Required!`),
      phone: Yup.number()
        .max(20, `Max Length less than 20`)
        .required(`Required!`),
      totalAmount: Yup.number(),
    }),

    onSubmit: (values) => {
      console.log(values)
      //   values.oldPassword === ``
      //     ? updateUser({
      //         variables: {
      //           firstName: values.FieldName,
      //         },
      //       }).catch(console.info)
      //     : updateUser({
      //         variables: values,
      //       }).catch(console.info)
    },
  })
  return (
    <FormLayout title={`Add Organization`} imgSrc={DOCUMENT.logo}>
      <form>
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
              name="Name"
              type="Name"
              placeholder={`Enter Organization Name`}
              value={formik.values.name || ``}
              onChange={formik.handleChange}
              error={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
              required={formik.touched.name && formik.errors.name && true}
            />
          </div>
        </div>
        <div className="items-center w-full px-6 text-gray-500 md:inline-flex md:space-y-0 ">
          <h2 className="max-w-sm mx-auto  md:w-4/12">Phone</h2>

          <div className="w-full max-w-sm pl-2 mx-auto  md:w-5/12 md:pl-9 md:inline-flex p-2">
            <InputText
              name="Phone"
              type="Phone"
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
              name="Description"
              type="desc"
              placeholder={`Description`}
              value={formik.values.desc || ``}
              onChange={formik.handleChange}
              error={
                formik.touched.desc && formik.errors.desc && formik.errors.desc
              }
              required={formik.touched.desc && formik.errors.desc && true}
            />
          </div>
        </div>
        <div className="items-center w-full px-6  text-gray-500 md:inline-flex md:space-y-0 ">
          <h2 className="max-w-sm mx-auto  md:w-4/12">{`Location`}</h2>

          <div className="w-full max-w-sm pl-2 mx-auto md:w-5/12 md:pl-9 md:inline-flex p-2">
            <InputText
              name="Location"
              type="Location"
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

        <hr />
        {/* <div className="m-3">
          {data ? (
            <BandeauLineAlert
              title="User Updated Sucessfully !"
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
        </div> */}

        <div className="w-full px-4 ml-auto text-gray-500 md:w-1/3">
          <Button
            label={`Create`}
            color="gray"
            submit={true}
            className="mt-5 h-10 text-center"
            // isloading={loading}
          />
        </div>
      </form>
    </FormLayout>
  )
}
