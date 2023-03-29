
import { IListCulturaPlantada } from "../types/IRuralProducerDatas";

export function filterNumber(str: string) {
    return String(str).replace(/\D/gim, '')
}

export function Sleep(delay = 0): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export function stringFormatter(str: string, mask: string, maskChar = '#') {
    const arrStr = Array.from(str);
    const arrMaskCount = mask.split(maskChar);
    if (arrStr.length !== arrMaskCount.length - 1) {
        return str;
    }
    const arrMask = Array.from(mask);
    let i = 0, result = '';

    arrMask.forEach((m: string) => {
        if (m === maskChar) {
            result = `${result}${arrStr[i]}`;
            i++;
        } else {
            result = `${result}${m}`
        }
    });
    return result;
}

export function formatterDoc(str: string) {
    if(!str){
        return '';
    }
    return str.length <= 11 ? stringFormatter(str, '###.###.###-##') : stringFormatter(str, '##.###.###/####-##')
}

export function arraySort(array: any[], property: string, order?: 'desc' | 'asc') {
    try {
        var sortOrder = 1;
        if (order === 'desc') {
            sortOrder = -1;
        }

        const arr = JSON.parse(JSON.stringify(array));

        return arr.sort(function (a: any, b: any) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        })
    } catch (e: any) {
        console.error('ArraySort', e)
    }
}


export const ListCulturaPlantada: IListCulturaPlantada[] = [
    { desc: 'Soja', value: "soja" },
    { desc: 'Milho', value: "milho" },
    { desc: 'Algodão', value: "algodao" },
    { desc: 'Café', value: "cafe" },
    { desc: 'Cana de Açúcar', value: "cana-acucar" }
];

export interface StatesProps {
    uf: string;
    name: string;
}

export const ListStates: StatesProps[] =

    [
        { uf: 'AC', name: 'Acre' },
        { uf: 'AL', name: 'Alagoas' },
        { uf: 'AP', name: 'Amapá' },
        { uf: 'AM', name: 'Amazonas' },
        { uf: 'BA', name: 'Bahia' },
        { uf: 'CE', name: 'Ceará' },
        { uf: 'DF', name: 'Distrito Federal' },
        { uf: 'ES', name: 'Espírito Santo' },
        { uf: 'GO', name: 'Goías' },
        { uf: 'MA', name: 'Maranhão' },
        { uf: 'MT', name: 'Mato Grosso' },
        { uf: 'MS', name: 'Mato Grosso do Sul' },
        { uf: 'MG', name: 'Minas Gerais' },
        { uf: 'PA', name: 'Pará' },
        { uf: 'PB', name: 'Paraíba' },
        { uf: 'PR', name: 'Paraná' },
        { uf: 'PE', name: 'Pernambuco' },
        { uf: 'PI', name: 'Piauí' },
        { uf: 'RJ', name: 'Rio de Janeiro' },
        { uf: 'RN', name: 'Rio Grande do Norte' },
        { uf: 'RS', name: 'Rio Grande do Sul' },
        { uf: 'RO', name: 'Rondônia' },
        { uf: 'RR', name: 'Roraíma' },
        { uf: 'SC', name: 'Santa Catarina' },
        { uf: 'SP', name: 'São Paulo' },
        { uf: 'SE', name: 'Sergipe' },
        { uf: 'TO', name: 'Tocantins' }
    ];


export const getState = (uf: string): StatesProps => {
    if (uf !== '') {
        const res = ListStates.filter((i: StatesProps) => i.uf === uf);
        if (res.length) {
            return res[0];
        }
    }
    return { uf, name: '' }
}
