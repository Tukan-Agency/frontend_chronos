export interface RequestResponse{
    ok: boolean;
    request: Request;
}

export interface RequestResponseUid{
  ok: boolean;
  uid: string;
}

export interface Request {
    _id: string,
    clientId: string,
    clientName: string,
    ibanAccount: string,
    bankName: string,
    numberAccount: number | string,
    requestedValue: number,
    requestStatus: string,
    requestDate: Date,
    requestType: string
}

export interface RequestList{
    solicitud: Request,
    colorStatus: string
}
