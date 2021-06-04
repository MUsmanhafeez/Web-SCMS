import React from 'react'
import { DashBoardLayout } from '@components/dashboard/layout'
import { Header } from '@components/layout/Header'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { InputText } from '@components/tail-kit/form/input-text/InputText'
import { useRouter } from 'next/router'
import { BoxGridList } from '@components/layout/BoxGridList'
import { MediaFileCard } from '@components/dashboard/media/MediaFileCard'
import { IMediaFileCard, MEDIA_FOLDER_CARDS } from '.'
import useTranslation from 'next-translate/useTranslation'
import { Dropzone } from '@components/dashboard/dropzone'

const MEDIA_FILE_CARDS: IMediaFileCard[] = [
  {
    title: `Template 1`,
    image: `https://images.pexels.com/photos/6248036/pexels-photo-6248036.jpeg?cs=srgb&dl=pexels-alazik-maulana-koentjoro-6248036.jpg&fm=jpg`,
    tag: `image`,
    lastUsed: `6 hours ago`,
    user: {
      image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
      name: `Adeel`,
      lastUpdatedTime: `6 mins ago`,
    },
  },
  {
    title: `Template 2`,
    image: `https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?cs=srgb&dl=pexels-amina-filkins-5559986.jpg&fm=jpg`,
    tag: `image`,
    lastUsed: `6 hours ago`,
    user: {
      image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
      name: `Adeel`,
      lastUpdatedTime: `6 mins ago`,
    },
  },
  {
    title: `Template 3`,
    image: `https://images.pexels.com/photos/5560027/pexels-photo-5560027.jpeg?cs=srgb&dl=pexels-amina-filkins-5560027.jpg&fm=jpg`,
    tag: `image`,
    lastUsed: `6 hours ago`,
    user: {
      image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
      name: `Adeel`,
      lastUpdatedTime: `6 mins ago`,
    },
  },
  {
    title: `Template 4`,
    image: `https://images.pexels.com/photos/4740501/pexels-photo-4740501.jpeg?cs=srgb&dl=pexels-ksenia-chernaya-4740501.jpg&fm=jpg`,
    tag: `image`,
    lastUsed: `6 hours ago`,
    user: {
      image: `https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105241/126078927-vector-illustration-of-avatar-and-dummy-icon-collection-of-avatar-and-image-vector-icon-for-stock-.jpg`,
      name: `Adeel`,
      lastUpdatedTime: `6 mins ago`,
    },
  },
]

const header = (t, folderTitle) => {
  return (
    <Header
      title={folderTitle}
      parentTitle={t(`media-library`)}
      icon="fas fa-photo-video fa-2x"
    >
      <div className="flex grid gap-2 sm:gap-4 grid-cols-5 sm:grid-cols-4">
        <div className="col-span-3 sm:col-span-3">
          <InputText
            className="rounded-none"
            name="search"
            type="text"
            placeholder={t(`search`)}
            icon={<i className="fas fa-search" />}
          />
        </div>
        <Button
          label={t(`add-file`)}
          isFat={false}
          color="primary"
          className="max-w-xs self-center col-span-2 sm:col-span-1"
        />
      </div>
    </Header>
  )
}

const Media: React.FC = () => {
  const { t } = useTranslation(`media`)
  const router = useRouter()
  const folderId = router.query
  const folderTitle = MEDIA_FOLDER_CARDS.find((x) => x.id === folderId.id).title

  return (
    <DashBoardLayout>
      <div className="overflow-auto max-h-full">
        <Dropzone>
          <BoxGridList<IMediaFileCard>
            header={header(t, folderTitle)}
            Card={MediaFileCard}
            list={MEDIA_FILE_CARDS}
          />
        </Dropzone>
      </div>
    </DashBoardLayout>
  )
}
export default Media
