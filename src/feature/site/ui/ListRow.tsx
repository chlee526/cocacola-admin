import { useContext, useMemo } from 'react';

import { ListChildComponentProps } from 'react-window';

import { SiteListContext } from '@/entity/site';

import { ListItem, ListItemButton } from '@mui/material';

const ListRow = (props: ListChildComponentProps) => {
    const { selectedItems, handleToggle } = useContext(SiteListContext);
    const { data, index, style } = props;
    const { seq, sseq, siteName, url, active, chSeq, channel } = useMemo(() => {
        return data[index];
    }, [data, index, style]);
    const isSelected = useMemo(() => selectedItems.has(seq || sseq), [selectedItems, seq, sseq]);

    return (
        <ListItem
            style={style}
            key={index}
            component="div"
            className={`row ${chSeq ? 'is4Col' : ''}`}
            disablePadding
        >
            <ListItemButton
                className={`item ${isSelected ? 'isSelected' : ''}`}
                selected={isSelected}
                onClick={() => handleToggle(seq || sseq)}
                sx={{ fontSize: '0.85em', fontWeight: 300 }}
            >
                <span>{sseq || seq}</span>
                <span>{siteName}</span>
                {chSeq && <span>{channel}</span>}
                <span className="isLast">
                    <span className={`state ${chSeq === 0 ? 'isNotUse' : ''}`}>{active}</span>
                    {url}
                </span>
            </ListItemButton>
        </ListItem>
    );
};

export { ListRow };
