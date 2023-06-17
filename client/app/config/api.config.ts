export const API_URL = `${process.env.API_URL}`

export const getAuthUrl = (url: string) => `/auth/${url}`
export const getCategoriesApiUrl = (url: string) => `/categories${url}`
export const getProductsApiUrl = (url: string) => `/products${url}`
export const getAttributeApiUrl = (url: string) => `/attributes${url}`
export const getBannersApiUrl = (url: string) => `/banner${url}`
