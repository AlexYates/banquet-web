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
    //
    price_in_pence: number;
    image_url: string;
    category: ProductCategory;
    brand: string;
    //
    rating: number | null;
    deal_type: 'percentage' | 'fixed_amount' | null;
    deal_discount: number | null;
    // surfboard
    model: string | null;
    dimensions?: string | null;
    volume?: string | null;
    ability?: string | null;
    conditions?: string | null;
    construction?: string | null;
    fin_system?: string | null;
    //
    created_at: string | Date;
    updated_at: string | Date;
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

export type UserProfile = {
    user_id: number;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
};

export type Address = {
    id: number;
    user_id: number;
    address_type: 'shipping' | 'billing';
    street_address: string;
    city: string;
    post_code: string;
    country: string;
    is_default: boolean;
};

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export type OrderItem = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price_in_pence_at_purchase: number;
    product_name_at_purchase: string;
};

export type Order = {
    id: number;
    user_id: number;
    status: OrderStatus;
    subtotal_in_pence: number;
    shipping_in_pence: number;
    tax_in_pence: number;
    total_in_pence: number;
    shipping_address: string; // Stored as JSON string
    payment_intent_id: string | null;
    created_at: string;
    updated_at: string;
    items?: OrderItem[]; // Optional items for detailed view
};
