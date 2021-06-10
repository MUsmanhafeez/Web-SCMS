import React from 'react'
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
// import { InputText } from '@components/tail-kit/form/input-text/InputText'

export interface IMediaFolderCard {
  id: string
  // icon: string
  title: string
  desc: string
  phone: string
}
export interface IMediaFileCard {
  title: string
  image: string
  tag?: string
  lastUsed?: string
  user: ITemplateUser
}

export const MEDIA_FOLDER_CARDS: IMediaFolderCard[] = [
  {
    id: `1`,
    title: `Template 1`,
    // icon: `fas fa-folder fa-lg mr-3 text-primary`,
    desc: `abc`,
    phone: `123456`,
  },
  // {
  //   id: `2`,
  //   title: `Template 2`,
  //   icon: `fas fa-folder fa-lg mr-3 text-primary`,
  // },
  // {
  //   id: `3`,
  //   title: `Template 3`,
  //   icon: `fas fa-folder fa-lg mr-3 text-primary`,
  // },
  // {
  //   id: `4`,
  //   title: `Template 4`,
  //   icon: `fas fa-folder fa-lg mr-3 text-primary`,
  // },
  // {
  //   id: `2`,
  //   title: `Template 2`,
  //   icon: `fas fa-folder fa-lg mr-3 text-primary`,
  // },
  // {
  //   id: `3`,
  //   title: `Template 3`,
  //   icon: `fas fa-folder fa-lg mr-3 text-primary`,
  // },
  // {
  //   id: `4`,
  //   title: `Template 4`,
  //   icon: `fas fa-folder fa-lg mr-3 text-primary`,
  // },
]

const MEDIA_FILE_CARDS: IMediaFileCard[] = [
  {
    title: `Template 1`,
    image: `https://images.pexels.com/photos/6437836/pexels-photo-6437836.jpeg?cs=srgb&dl=pexels-marta-wave-6437836.jpg&fm=jpg`,
    tag: `image`,
    lastUsed: `6 hours ago`,
    user: {
      image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
      name: `Adeel`,
      lastUpdatedTime: `6 mins ago`,
      desc: `aqws`,
      phone: `123456789`,
    },
  },
  // {
  //   title: `Template 2`,
  //   image: `https://images.pexels.com/photos/3663037/pexels-photo-3663037.jpeg?cs=srgb&dl=pexels-katie-e-3663037.jpg&fm=jpg`,
  //   tag: `image`,
  //   lastUsed: `6 hours ago`,
  //   user: {
  //     image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
  //     name: `Adeel`,
  //     lastUpdatedTime: `6 mins ago`,
  //   },
  // },
  // {
  //   title: `Template 3`,
  //   image: `https://images.pexels.com/photos/4544904/pexels-photo-4544904.jpeg?cs=srgb&dl=pexels-ketut-subiyanto-4544904.jpg&fm=jpg`,
  //   tag: `image`,
  //   lastUsed: `6 hours ago`,
  //   user: {
  //     image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
  //     name: `Adeel`,
  //     lastUpdatedTime: `6 mins ago`,
  //   },
  // },
  // {
  //   title: `Template 4`,
  //   image: `https://images.pexels.com/photos/4715334/pexels-photo-4715334.jpeg?cs=srgb&dl=pexels-cottonbro-4715334.jpg&fm=jpg`,
  //   tag: `image`,
  //   lastUsed: `6 hours ago`,
  //   user: {
  //     image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
  //     name: `Adeel`,
  //     lastUpdatedTime: `6 mins ago`,
  //   },
  // },
]
const header = (t) => {
  return (
    <Header title={t(`media-library`)} icon="fas fa-photo-video fa-2x">
      <div className="flex grid gap-2 sm:gap-4 grid-cols-5 sm:grid-cols-4">
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
  const { t } = useTranslation(`media`)

  return (
    <DashBoardLayout>
      <div className="overflow-auto max-h-full ">
        <Dropzone>
          <BoxGridList<IMediaFolderCard>
            header={header(t)}
            Card={MediaFolderCard}
            list={MEDIA_FOLDER_CARDS}
          />
          <BoxGridList<IMediaFileCard>
            Card={MediaFileCard}
            list={MEDIA_FILE_CARDS}
          />
        </Dropzone>
      </div>
    </DashBoardLayout>
  )
}
export default Organizations
