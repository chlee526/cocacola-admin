import { AuthModel, MenuModel, MethodType } from '../model/authModel';

/**
 * 권한 메뉴 파싱 - api 를 통해 받아온 권한 메뉴 목록 파싱
 * @param {AuthModel[]} authMenu 사용자의 권한 메뉴
 * @returns {MenuModel[]}  네비게이션에서 사용할 메뉴목록
 * */
function transformMenuData(authMenu: AuthModel[]): MenuModel[] {
    return authMenu.map(menuItem => {
        const { menuDto } = menuItem;
        return {
            name: menuDto.name,
            url: menuDto.url,
            child: menuDto.child
                ? menuDto.child.map(childItem => ({
                      name: childItem.menuDto.name,
                      url: childItem.menuDto.url,
                  }))
                : [],
        };
    });
}

/**
 * 메뉴별 권한 Methods 반환 함수 - api 를 통해 받아온 권한 메뉴 목록 파싱
 * @param {AuthModel[]} menu 사용자의 권한 메뉴
 * @returns {Record<string, MethodType[]>}  각 메뉴의 권한 메서드
 * */
const transformMenuMethods = (menu: AuthModel[]): Record<string, MethodType[]> => {
    const result: Record<string, MethodType[]> = {};

    function processMenuItem(item: AuthModel) {
        const { methods, menuDto } = item;
        const { url, child } = menuDto;

        if (url) {
            result[url] = methods;
        }

        if (child && child.length > 0) {
            child.forEach(processMenuItem);
        }
    }

    menu.forEach(processMenuItem);
    return result;
};

export { transformMenuData, transformMenuMethods };
