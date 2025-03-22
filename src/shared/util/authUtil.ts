/**
 * [GET, PUT, POST, DELETE]로 전달된 권한에 대해서 레벨로 변환하여 전달
 * @param auth
 * @returns
 */
const transAuthToLevel = (auth: string[]) => {
    if (['GET', 'PUT', 'POST'].every(method => auth.includes(method)) && !auth.includes('DELETE')) {
        return 2;
    }
    if (['GET', 'PUT', 'POST', 'DELETE'].every(method => auth.includes(method))) {
        return 3;
    }
    return 1;
};

export { transAuthToLevel };
