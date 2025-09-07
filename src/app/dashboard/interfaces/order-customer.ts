export interface OrderResponse {
    ok: boolean,
    ordenes: Order
}

export interface Order {
    _id?: string,
    clientId: string,
    operationActions: Actions[],
    operationStatus: string,
    operationNumber: number,
    operationDate: Date,
    operationValue: number,
    isCapital?: boolean,
    isWithdrawl?: boolean
}

export interface Actions {
    name: string,
    quantity: number;
    benefit: number
}

export interface OrderList {
    orders: Order,
    total: number;
    colorStatus: string,
    valorFinal: string
}
