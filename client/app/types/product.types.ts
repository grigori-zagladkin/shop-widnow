import { IBase } from './base.types'
import { ICategory } from './category.types'

export enum EnumSortProduct {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest',
}

export interface ISearchDto {
	searchTerm?: string
	minPrice?: number
	maxPrice?: number
	categoryId?: number
	sort?: EnumSortProduct
	page?: number
	perPage?: number
}

export interface ProductAttributes {
	id: number
	attribute: string
	value: string
}

export interface IUpdateProduct {
	title: string
	slug: string
	description: string
	price: number
	count: number
	images: string[]
	attributes: ProductAttributes[]
	category?: ICategory | null
	categoryId?: number
}

export interface IProductPagination {
	products: IProduct[]
	length: number
}

export type IProduct = IBase & IUpdateProduct
