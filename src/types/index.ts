// src/types/index.ts

export type User = {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
};

export type ProductCategory = 'surfboard' | 'accessory';

export type Product = {
    id: number;
    name: string;
    description: string;
    price_in_pence: number;
    image_url: string;
    category: ProductCategory;
    brand: string;
};

export type CartItem = {
    id: number;
    name: string;
    price_in_pence: number;
    image_url: string;
    quantity: number;
};

export type Cart = {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
};

export type CartResponse = {
    cart: Cart;
    items: CartItem[];
};
