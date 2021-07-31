import React, { useEffect, useState } from 'react'
import { DashBoardLayout } from '@components/dashboard/layout'
import { Header } from '@components/layout/Header'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import {
  MediaFileCard,
  ITemplateUser,
} from '@components/dashboard/media/MediaFileCard'
import { BoxGridList } from '@components/layout/BoxGridList'
import { MediaFolderCard } from '@components/dashboard/media/MediaFolderCard'
import useTranslation from 'next-translate/useTranslation'
import { Dropzone } from '@components/dashboard/dropzone'
import Link from 'next/link'
import {
  allOrganization,
  allOrganization_allOrganization,
  GqlMAddOrganization_addOrganization,
} from '@gqlTypes/asp'
import { useQuery } from '@apollo/client'
import { GQL_All_ORGANIZATION } from '@entities/asp/organization'
// import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { useDispatch } from 'react-redux'
import { setOrganization } from '@redux/actions'
export interface IMediaFolderCard {
  name: string
  desc: string
  createdAt: string
  phone: string
  type: string
}
export interface IMediaFileCard {
  title: string
  image: string
  tag?: string
  lastUsed?: string
  user: ITemplateUser
}

const header = (t) => {
  return (
    <Header title={`Dashboard`} icon={`fas fa-folder fa-2x`}>
      <div className="flex grid gap-2 sm:gap-4 grid-cols-5 sm:grid-cols-4 ">
        <div className="col-span-3 sm:col-span-3"></div>
        <Link href="/dashboard/organizations/addOrganization">
          <Button
            label="Add Organization"
            isFat={false}
            color="primary"
            className="max-w-xs self-center col-span-2 sm:col-span-1"
          />
        </Link>
      </div>
    </Header>
  )
}
const Organizations: React.FC = () => {
  const dispatch = useDispatch()
  const [organizations, setOrganizations] = useState<
    allOrganization_allOrganization[]
  >([])
  const { t } = useTranslation(`media`)
  const { data, loading, error } = useQuery<allOrganization>(
    GQL_All_ORGANIZATION,
    {
      onCompleted: (data) => {
        setOrganizations(data.allOrganization)
        console.log(data.allOrganization)
        dispatch(
          setOrganization(
            data.allOrganization as GqlMAddOrganization_addOrganization[],
          ),
        )
      },
    },
  )
  // useEffect(() => {
  //
  // }, [organizations])

  if (loading) {
    return (
      <h2>
        <a href="#loading" aria-hidden="true" id="loading">
          <svg
            aria-hidden="true"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    )
  } else
    return (
      <DashBoardLayout>
        <div className="overflow-auto max-h-full ">
          <Dropzone>
            <BoxGridList<allOrganization_allOrganization>
              header={header(t)}
              Card={MediaFolderCard}
              list={organizations}
            />
          </Dropzone>
        </div>
      </DashBoardLayout>
    )
}
export default Organizations
