export interface DashboardStats {
    orders: number;
    products: number;
    users: number;
}

export interface Product {
    name: string;
    price: string;
    category: string;
}

export interface Order {
    id: number,
    customerName: string,
    totalAmount: number,
    status: string,
    date: string
}
