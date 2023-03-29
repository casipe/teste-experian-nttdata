export type ICulturaPlantadaTypes = "soja" | "milho" | "algodao" |"cafe" | "cana-acucar" | "";

export interface IRuralProducerDatas {
    id?: string;
    doc: string;
    nome: string;
    nomeFazenda: string;
    cidade: string;
    uf: string;
    culturaPlantada: ICulturaPlantadaTypes;
    areaTotal: number | string;
    areaVegetacao: number | string;
    areaAgricultavel: number | string;
}


export interface IListCulturaPlantada {
    desc: string;
    value: ICulturaPlantadaTypes;
}
