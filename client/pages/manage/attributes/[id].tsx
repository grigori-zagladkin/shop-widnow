import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import AttributeEdit from '@/components/screens/Admin/Attribute/AttributeEdit'

const AttributeEditPage: NextPageAuth = () => <AttributeEdit />

AttributeEditPage.isOnlyAdmin = true

export default AttributeEditPage
