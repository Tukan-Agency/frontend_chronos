export interface CountryApi {
    flags:        Flags;
    cca2:         string;
    currencies:   { [key: string]: Currency };
    idd:          Idd;
    translations: { [key: string]: Translation };
}

export interface Currency {
    name:   string;
    symbol: string;
}

export interface Flags {
    png: string;
    svg: string;
}

export interface Idd {
    root:     Root;
    suffixes: string[];
}

export enum Root {
    Empty = "",
    The1 = "+1",
    The2 = "+2",
    The3 = "+3",
    The4 = "+4",
    The5 = "+5",
    The6 = "+6",
    The7 = "+7",
    The8 = "+8",
    The9 = "+9",
}

export interface Translation {
    official: string;
    common:   string;
}
