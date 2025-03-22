import { useEffect, useRef } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { MenuModel, useAuthStore } from '@/entity/auth';
import { useCommonStroe } from '@/shared/store';

import { navigationStyle } from './Navigation.style';

import { MenuItem, MenuList, Stack } from '@mui/material';

interface NavigationItemProps {
    path: string;
    name: string;
    sub?: MenuModel[];
}

const NavigationItem = ({ path, name, sub }: NavigationItemProps) => {
    return (
        <div>
            <NavLink to={path}>{name}</NavLink>

            <div className="sub">
                <MenuList>
                    {sub?.map(subMenu => (
                        <MenuItem key={subMenu.url + subMenu.name}>
                            <NavLink to={subMenu.url}>{subMenu.name}</NavLink>
                        </MenuItem>
                    ))}
                </MenuList>
            </div>
        </div>
    );
};

const Navigation = () => {
    const location = useLocation();
    const menuList = useAuthStore().getAuthMenuState();

    // 현재 Active된 노드명 Store에 저장
    const { setCurrentPath } = useCommonStroe();
    const curRef = useRef(null);
    useEffect(() => {
        if (curRef.current) {
            const activeNodes = (curRef.current as HTMLDivElement).querySelectorAll('.active');
            if (activeNodes)
                setCurrentPath(Array.from(activeNodes).map(node => node.textContent || ''));
        }
    }, [curRef, setCurrentPath, location]);

    return (
        <Stack ref={curRef} className="nav" direction="row" css={navigationStyle}>
            {menuList?.map(item => (
                <NavigationItem
                    key={item.url + item.name}
                    path={item.url}
                    name={item.name}
                    sub={item.child || []}
                />
            ))}
        </Stack>
    );
};

export { Navigation };
