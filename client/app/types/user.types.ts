export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export interface IUser {
	id: number
	email: string
	role: UserRole
}
