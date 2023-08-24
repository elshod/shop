export interface Category {
    id?: number,
    title: string,
    status: boolean
}

export interface Param {
    id?: number,
    title: string,
    category: number | '',
    status: boolean
}

export interface ProductParam {
    id: number, // param.id
    title: string,
    value: string 
}

export interface Product {
    id?: number,
    title: string,
    price: number,
    quantity: number,
    category: number | null,
    params: ProductParam[],
    description?: string,
    createdAt: Date,
    img: String,
    status: boolean
}

export interface Sale {
    id?: number,
    product: string,
    date: Date,
    quantity: number,
}