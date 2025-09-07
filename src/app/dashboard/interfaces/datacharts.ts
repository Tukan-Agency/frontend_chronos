export interface Datachart {
    year: filters,
}



export interface filters{
    month: Month,
    trimestre: Trimestre,
    semestre: Semestre
}

export interface Data{
    winnings: number,
    losses: number,
    inversion: number
}

export interface Month {
    ene: Data,
    feb: Data,
    mar: Data,
    abr: Data,
    may: Data,
    jun: Data,
    jul: Data,
    ago: Data,
    sep: Data,
    oct: Data,
    nov: Data,
    dic: Data,
}

export interface Trimestre {
    trimestre1: Data,
    trimestre2: Data,
    trimestre3: Data,
    trimestre4: Data
}

export interface Semestre {
    semestre1: Data,
    semestre2: Data
}
