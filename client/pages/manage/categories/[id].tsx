import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import CategoryEdit from '@/components/screens/Admin/Category/CategoryEdit'

const CategoryEditPage: NextPageAuth = () => <CategoryEdit />

CategoryEditPage.isOnlyAdmin = true

export default CategoryEditPage
