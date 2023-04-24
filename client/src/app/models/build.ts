export interface Builds {
    _id?: string,
    buildNumber: number,
    buildName: string,
    image: string,
    amount: string,
    buildModel: string,
    parts: any[],
    craftable?: boolean,
    qtyGarage?: number,
    modelLink: string;
}