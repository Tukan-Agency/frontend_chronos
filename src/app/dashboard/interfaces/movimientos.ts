export interface MovimientosResponse {
    ok: boolean,
    movimientos: Movimientos[]
}

export interface Movimientos {
    _id?: string,
    clientId: string,
    clientName: string,
    type: string,
    requestDate: Date,
    status: string,
    value: string
}

export interface MovimientosList{
    movimiento: Movimientos,
    colorStatus: string,
    valor?: string
}