import { useFormik } from 'formik'
import * as Yup from 'yup'

import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { useState } from 'react'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { BandeauLineAlert } from '@components/tail-kit/elements/alert/BandeauLineAlert'

export const ResetPasswordForm: FC = () => {
  const { t } = useTranslation(`auth`)

  const [confirmEmail, setConfirmEmail] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: ``,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t(`invalid-email-error`))
        .required(t(`email-required`)),
    }),
    onSubmit: () => setConfirmEmail(true),
  })

  return (
    <>
      <p className="text-3xl text-center">{t(`reset-your-password`)}</p>

      <form
        data-testid="resetPassword"
        className="flex flex-col pt-3 md:pt-8"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`enter-email-address`)}
            name="email"
            type="email"
            placeholder={t(`email-placeholder`)}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && formik.errors.email && formik.errors.email
            }
            required={formik.touched.email && formik.errors.email && true}
          />
        </div>
        <div className="text-center">
          <Button
            label={t(`reset-password`)}
            color="gray"
            submit={true}
            isFat={true}
            className="mt-5"
          />
        </div>
      </form>
      {confirmEmail && (
        <BandeauLineAlert
          title={`Check your email, We have sent verification link to your Email`}
          borderColor="border-green-600"
          color="text-green-500"
        />
      )}
    </>
  )
}
