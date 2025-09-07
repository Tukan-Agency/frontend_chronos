export interface Clientes {
	ok: boolean;
	clientes: Cliente[];
}

export interface Cliente {
	currency: Currency;
	_id: string;
	name: string;
	surname: string;
	birthday: Date;
	email: string;
	address: string;
	company: string;
	contactNumber: number;
	whatsapp: number;
	password: string;
	__v: number;
	country?: Country;
	sequenceId?: number;
}

export interface Country {
	name: string;
	code: string;
	flag: string;
}

export interface Currency {
	name: string;
	code?: string;
}
