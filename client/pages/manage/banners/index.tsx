import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import BannerListManage from '@/components/screens/Admin/Banners/BannerListManage'

const BannerListPage: NextPageAuth = () => <BannerListManage />

BannerListPage.isOnlyAdmin = true

export default BannerListPage
