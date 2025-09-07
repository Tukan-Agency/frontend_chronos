export interface AuthResponse {
    ok: boolean;
    user: UsuarioResponse,
    token?: string;
}

export interface UsuarioResponse {
    _id?: string;
    name?: string;
    surname?: string;
    email?: string;
    contactNumber?: number;
    address?: string;
    birthday?: Date;
    company?: string;
    country?: {
        name: string,
        code: string,
        flag: string
    };
    whatsapp?: number;
    currency?: string;
    msg?: string;
    role?: number;
    sequenceId?: number;
}

export interface Usuario {
    _id?: string | null;
    name: string;
    surname: string;
    email: string;
    contactNumber: number;
    address: string;
    birthday: Date;
    company: string;
    country: {
        name: string,
        code: string,
        flag: string
    };
    whatsapp?: number;
    currency: string;
    role: number;
    sequenceId: number;
}
