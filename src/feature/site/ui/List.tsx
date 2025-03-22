import { useEffect, useRef, useState } from 'react';

import { FixedSizeList } from 'react-window';

import { EmptyList } from './EmptyList';
import { listStyle } from './List.style';
import { ListRow } from './ListRow';
import { useList } from '../hook/useStie';

import { Box } from '@mui/material';

interface SizeType {
    width: number;
    height: number;
}

const List = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { data, filters } = useList();

    const [containerSize, setContainerSize] = useState<SizeType>({
        width: 0,
        height: 0,
    });

    const updateWidth = () => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            window.addEventListener('resize', updateWidth);
            setTimeout(updateWidth, 10);
        }
        return () => window.removeEventListener('resize', updateWidth);
    }, [containerRef]);

    useEffect(() => {
        updateWidth();
    }, [filters]);

    if (!data || data.length === 0) return <EmptyList />;

    return (
        <div ref={containerRef} className="list">
            <Box
                css={listStyle}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    bgcolor: 'background.paper',
                }}
            >
                <FixedSizeList
                    height={containerSize.height}
                    width={containerSize.width}
                    itemSize={31}
                    itemCount={data.length}
                    overscanCount={10}
                    itemData={data}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {ListRow}
                </FixedSizeList>
            </Box>
        </div>
    );
};

export { List };
