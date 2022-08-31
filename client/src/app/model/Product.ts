

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    type?: string;
    brand: string;
    quantity: number;
    pictureUrl: string;
    quantityInStock?: number;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    types?: string[];
    brands?: string[];
    pageNumber: number;
    pageSize: number
}


