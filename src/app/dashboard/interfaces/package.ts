export interface PackageResponse {
    ok: boolean,
    package: Package
}

export interface Package {
    name: string,
    apalancamiento: number,
    deposit: number,
    spreadType: string,
    spredPip: number,
    openOrders: number
}