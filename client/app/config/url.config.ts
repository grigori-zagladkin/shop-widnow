export const getAdminUrl = (url: string) => `/manage/${url}`
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1)
export const getCategoriesUrl = () => `/categories`
export const getProductUrl = (category: string, productSlug: string) => `/${category}/${productSlug}`
export const getDeliveryUrl = () => `/delivery`
export const getContactsUrl = () => `/contacts`
