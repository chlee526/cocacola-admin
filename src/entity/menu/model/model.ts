interface MenuType {
    seq: number;
    name: string;
    pseq: number;
    depth: number;
    url: string;
    child?: MenuType[];
}
interface AllMenuResponseType {
    code: string;
    message: string;
    total: number;
    data: MenuType[];
}

export type { MenuType, AllMenuResponseType };
