export interface ILogin {
  email: string,
  password: string
}

export interface IParamsGetProducts {
  size: number,
  page: number,
  filter: string
}

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

export interface IInitialState {
  data: null | IProducts[] | string,
  isError: null | string,
  isLoading: boolean
}