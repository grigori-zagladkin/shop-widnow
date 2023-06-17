import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import BannerEdit from '@/components/screens/Admin/Banner/BannerEdit'

const BannerEditPage: NextPageAuth = () => <BannerEdit />

BannerEditPage.isOnlyAdmin = true

export default BannerEditPage
