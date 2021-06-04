import { useFormik } from 'formik'
import * as Yup from 'yup'

import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { Button } from '@components/tail-kit/elements/buttons/Button'

interface IResetPasswordVerifyForm {
  EmailVerificationRequestID: string
  OTP?: string
  onSuccess: () => void
}

export const ResetPasswordVerifyForm: FC<IResetPasswordVerifyForm> = ({
  OTP,
  EmailVerificationRequestID,
  onSuccess,
}) => {
  const { t } = useTranslation(`auth`)

  const formik = useFormik({
    initialValues: {
      otp: OTP || ``,
      newPassword: ``,
      confirmPassword: ``,
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .min(7, t(`password-length-error`))
        .required(t(`password-required`)),
      newPassword: Yup.string()
        .min(7, t(`password-length-error`))
        .required(t(`password-required`)),
      confirmPassword: Yup.string()
        .min(7, t(`password-length-error`))
        .oneOf([Yup.ref(`newPassword`), null], t(`password-unmatch`))
        .required(t(`password-required`)),
    }),
    onSubmit: () => {
      onSuccess()
    },
  })

  return (
    <>
      <p className="text-3xl text-center">{t(`reset-password`)}</p>

      <form
        data-testid="resetPassword"
        className="flex flex-col pt-3 md:pt-8"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`otp`)}
            name="otp"
            type="number"
            placeholder={t(`otp`)}
            value={formik.values.otp}
            onChange={formik.handleChange}
            disabled={formik.values.otp && true}
            error={formik.touched.otp && formik.errors.otp && formik.errors.otp}
            required={formik.touched.otp && formik.errors.otp && true}
          />
        </div>
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`new-password`)}
            name="newPassword"
            type="password"
            placeholder={t(`new-password-placeholder`)}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword &&
              formik.errors.newPassword &&
              formik.errors.newPassword
            }
            required={
              formik.touched.newPassword && formik.errors.newPassword && true
            }
          />
        </div>
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`confirm-password`)}
            name="confirmPassword"
            type="password"
            placeholder={t(`confirm-password`)}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              formik.errors.confirmPassword
            }
            required={
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              true
            }
          />
        </div>
        <div className="text-center">
          <Button
            label={t(`verify`)}
            color="gray"
            submit={true}
            isFat={true}
            className="mt-5"
          />
        </div>
      </form>
    </>
  )
}
