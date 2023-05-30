import { IBase } from './base.types'

export interface IUpdateCategory {
	title: string
	slug: string
	description: string
	image: string
}

export type ICategory = IBase & IUpdateCategory
