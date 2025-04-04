
type CreateProductDto ={

  name: string;


  image: string | null;


  shopId: number;


  price: number;


  quantity: number;


  description: string;


  categories: number[];
}

export default CreateProductDto;
