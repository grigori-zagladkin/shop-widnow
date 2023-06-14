import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import CategoriesListManage from '@/components/screens/Admin/Categories/CategoriesListManage'

const CategoriesListPage: NextPageAuth = () => <CategoriesListManage />

CategoriesListPage.isOnlyAdmin = true

export default CategoriesListPage
