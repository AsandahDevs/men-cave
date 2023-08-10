import { Rating } from "./rating"
export interface Product {
    id:number,
    title:string,
    price:number,
    category:string,
    description: string,
    image:string,
    rating?:Rating
}
