import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import AttributesListManage from '@/components/screens/Admin/Attributes/AttributesListManage'

const AttributesListPage: NextPageAuth = () => <AttributesListManage />

AttributesListPage.isOnlyAdmin = true

export default AttributesListPage
