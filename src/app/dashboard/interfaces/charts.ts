export interface Charts{
    labels: string[],
    datasets: DataSet[]
}

export interface DataSet{
    label: string,
    backgroundColor: string,
    data: number[]
}