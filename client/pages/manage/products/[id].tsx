import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import ProductEdit from '@/components/screens/Admin/Product/ProductEdit'

const ProductEditPage: NextPageAuth = () => <ProductEdit />

ProductEditPage.isOnlyAdmin = true

export default ProductEditPage
