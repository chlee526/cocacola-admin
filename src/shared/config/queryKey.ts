interface queryKeyInterface {
    [key: string]: string;
}

const QUERY_KEY: queryKeyInterface = {
    공통코드: 'ANALYSIS',
} as const;

export { QUERY_KEY };
