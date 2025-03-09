export interface Product{
    id:number;
    name:string;
    price:number;
    quantity:number;
    image_url:string;
    description:string;
    createdAt:string;
    updatedAt:string;
    shop:{
        id:number;
        name:string;
    }
}

export interface Response<T>{
    total: number;
    data?: T[];
    pageSize: number;
}