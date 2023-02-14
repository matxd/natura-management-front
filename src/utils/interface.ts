// Interface Authentication
export interface ILogin {
  email: string,
  password: string
}

// Interface Products
export interface IProducts {
  totalItems: number,
  totalPages: number,
  size: number,
  page: number,
  items: IItemsAPI[]
}

export interface IItemsAPI {
  _id: string,
  name: string,
  genre: string,
  amountStorage: number,
  price: string,
  image: string,
  status: boolean
}

export interface IAddProduct {
  name: string,
  genre: string,
  amountStorage: number,
  price: string,
  image: FormData,
  expirationDate: string
}

export interface IPutProduct {
  id: string,
  body: IEditProductForm
}

export interface IEditProductForm {
  name: string,
  genre: string,
  amountStorage: number,
  price: string,
  image: FormData,
  expirationDate: string
}

export interface IParamsGet {
  size: number,
  page: number,
  filter?: string
}

export interface ICards {
  _id?: string,
  name?: string,
  genre?: string,
  amountStorage?: number,
  price?: string,
  image?: any,
  expirationDate?: string
}

// Interface Users
export interface IUsers {
  totalItems: number,
  totalPages: number,
  size: number,
  page: number,
  items: IUsersAPI[]
}

export interface IUsersAPI {
  _id: string,
  name: string,
  email: string,
  image: string
}

export interface IPostUser {
  name: string,
  email: string,
  password: number,
  image: FormData,
}

export interface IPutUser {
  id: string,
  body: IEditUserForm
}

export interface IEditUserForm {
  name: string,
  image: FormData
}

export interface ILoggedUser {
  name: string,
  email: string,
  image: string,
  id: string
}