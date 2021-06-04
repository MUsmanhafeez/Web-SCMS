import React, { FC, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { setUser } from '@redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@redux/reducers'
import { GqlMUser, GqlMUserVariables } from '@gqlTypes/asp'
import { GQLM_UPDATE_USER } from '@entities'
import { FormLayout } from '@components/tail-kit/form/layout/FormLayout'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { BandeauLineAlert } from '@components/tail-kit/elements/alert/BandeauLineAlert'
import { Button } from '@components/tail-kit/elements/buttons/Button'

export const UserProfileForm: FC = () => {
  const { t } = useTranslation(`user-profile`)

  const dispatch = useDispatch()
  const initialFormData = {
    firstName: ``,
    lastName: ``,
    email: ``,
  }
  const [formData, setFormData] = useState(initialFormData)

  const userState = useSelector((state: RootState) => state.user.user)
  useEffect(() => {
    setFormData({
      firstName: userState.firstName,
      lastName: userState.lastName,
      email: userState.email,
    })
  }, [userState])

  const [updateUser, { data, error, loading }] = useMutation<
    GqlMUser,
    GqlMUserVariables
  >(GQLM_UPDATE_USER, {
    onCompleted: (data) => {
      dispatch(setUser(data.user))
    },
  })
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...formData,
      oldPassword: ``,
      newPassword: ``,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, t(`firstname-length-error`))
        .required(t(`firstname-required`)),
      lastName: Yup.string()
        .max(15, t(`lastname-length-error`))
        .required(t(`lastname-required`)),
      oldPassword: Yup.string().min(8, t(`password-length-error`)),
      newPassword: Yup.string().when(`oldPassword`, (oldPassword, field) =>
        oldPassword
          ? field
              .min(8, t(`password-length-error`))
              .required(t(`password-required`))
          : field,
      ),
    }),
    onSubmit: (values) => {
      values.oldPassword === ``
        ? updateUser({
            variables: {
              firstName: values.firstName,
              lastName: values.lastName,
            },
          }).catch(console.info)
        : updateUser({
            variables: values,
          }).catch(console.info)
    },
  })

  if (formData === initialFormData) {
    return <div>Not ready</div>
  } else {
    return (
      <FormLayout imgSrc="images/logo/logo.png" title={t(`form-title`)}>
        <form onSubmit={formik.handleSubmit}>
          <div className="items-center w-full  p-2 space-y-2 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">{t(`account`)}</h2>
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
          <div className="items-center w-full p-6 mb-7 space-y-4 text-gray-500 md:inline-flex md:space-y-0 ">
            <h2 className="max-w-sm mx-auto  md:w-4/12">
              {t(`personal-info`)}
            </h2>

            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="firstName"
                type="firstName"
                placeholder={t(`first-name`)}
                value={formik.values.firstName || ``}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName &&
                  formik.errors.firstName &&
                  formik.errors.firstName
                }
                required={
                  formik.touched.firstName && formik.errors.firstName && true
                }
              />
            </div>

            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="lastName"
                type="lastName"
                placeholder={t(`last-name`)}
                value={formik.values.lastName || ``}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName &&
                  formik.errors.lastName &&
                  formik.errors.lastName
                }
                required={
                  formik.touched.lastName && formik.errors.lastName && true
                }
              />
            </div>
          </div>

          <hr />
          <div className="items-center w-full p-6 mb-7 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto mt-5 md:w-4/12">
              {t(`update-password`)}
            </h2>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="oldPassword"
                type="password"
                placeholder={t(`old-password`)}
                value={formik.values.oldPassword || ``}
                onChange={formik.handleChange}
                error={
                  formik.touched.oldPassword &&
                  formik.errors.oldPassword &&
                  formik.errors.oldPassword
                }
                required={
                  formik.touched.oldPassword &&
                  formik.errors.oldPassword &&
                  true
                }
                icon={<i className="fal fa-key" />}
              />
            </div>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex p-2">
              <InputText
                name="newPassword"
                type="password"
                placeholder={t(`new-password`)}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  formik.errors.newPassword &&
                  formik.errors.newPassword
                }
                required={
                  formik.touched.newPassword &&
                  formik.errors.newPassword &&
                  true
                }
                icon={<i className="fal fa-key" />}
              />
            </div>
          </div>

          <hr />
          <div className="m-3">
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
          </div>

          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <Button
              label={t(`update`)}
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
