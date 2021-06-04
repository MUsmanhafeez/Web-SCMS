import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import useTranslation from 'next-translate/useTranslation'
import { GQLM_REGISTER } from '@entities'
import { FC } from 'react'
import React from 'react'
import { GqlMRegister, GqlMRegisterVariables } from '@gqlTypes/asp'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { BandeauLineAlert } from '@components/tail-kit/elements/alert/BandeauLineAlert'

interface IRegisterFormProps {
  oidcInteractionUid: string
}

export const RegisterForm: FC<IRegisterFormProps> = ({
  oidcInteractionUid,
}) => {
  const { t } = useTranslation(`auth`)
  const [register, { error, loading }] = useMutation<
    GqlMRegister,
    GqlMRegisterVariables
  >(GQLM_REGISTER, {
    onCompleted: ({ register: { auth } }) => {
      window.location = (auth.returnTo as unknown) as Location
    },
  })

  const formik = useFormik({
    initialValues: {
      firstName: ``,
      lastName: ``,
      email: ``,
      password: ``,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, t(`firstname-length-error`))
        .required(t(`firstname-required`)),
      lastName: Yup.string()
        .max(30, t(`lastname-length-error`))
        .required(t(`lastname-required`)),
      email: Yup.string()
        .email(t(`invalid-email-error`))
        .required(t(`email-required`)),
      password: Yup.string()
        .min(7, t(`password-length-error`))
        .required(t(`password-required`)),
    }),
    onSubmit: (values) =>
      register({
        variables: {
          ...values,
          oidcInteractionUid,
        },
      }).catch(console.info),
  })

  return (
    <>
      <div className="text-2xl text-center">
        <h3 className="font-weight-bolder text-dark display5">
          {t(`create-account`)}
        </h3>
        <div className="text-muted font-weight-bold font-size-h4">
          {t(`have-account`)}
          <Link href={`/login?Iuid=${oidcInteractionUid}`}>
            <span className="text-primary font-weight-bolder underline pl-2 cursor-pointer">
              {t(`sign-in`)}
            </span>
          </Link>
        </div>
      </div>
      <form
        data-testid="loginUser"
        className="flex flex-col pt-3 md:pt-8"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-nowrap space-x-4">
          <div className="flex flex-col pt-4 mb-5 ">
            <InputText
              label={t(`first-name`)}
              name="firstName"
              type="text"
              placeholder={t(`first-name`)}
              value={formik.values.firstName}
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

          <div className="flex flex-col pt-4 mb-5">
            <InputText
              label={t(`last-name`)}
              name="lastName"
              type="text"
              placeholder={t(`last-name`)}
              value={formik.values.lastName}
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
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`email`)}
            name="email"
            type="email"
            placeholder={t(`email`)}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && formik.errors.email && formik.errors.email
            }
            required={formik.touched.email && formik.errors.email && true}
          />
        </div>
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`password`)}
            name="password"
            type="password"
            placeholder={t(`password`)}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.password &&
              formik.errors.password &&
              formik.errors.password
            }
            required={formik.touched.password && formik.errors.password && true}
          />
        </div>
        <div className="text-center">
          <Button
            label={t(`sign-up`)}
            color="gray"
            isloading={loading}
            submit={true}
            isFat={true}
            className="mt-5"
          />
        </div>
      </form>
      {error && error.graphQLErrors[0] && (
        <BandeauLineAlert
          title={error.graphQLErrors[0].message}
          borderColor="border-red-600"
          color="text-red-500"
        />
      )}
    </>
  )
}
