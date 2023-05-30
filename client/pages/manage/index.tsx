import { NextPageAuth } from 'provider/authProvider/auth-page.types'

import ProductListManage from '@/components/screens/Admin/Products/ProductListManage'

const ProductsListPage: NextPageAuth = () => <ProductListManage />

ProductsListPage.isOnlyAdmin = true

export default ProductsListPage
