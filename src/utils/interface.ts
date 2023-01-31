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
  image: FormData
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
  image: FormData
}

export interface IParamsGetProducts {
  size: number,
  page: number,
  filter?: string
}

export interface ICards {
  _id?: string,
  name?: string,
  genre?: string,
  amountStorage?: number,
  price?: string
  image?: any
}