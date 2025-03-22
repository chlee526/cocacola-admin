import { Dispatch, memo, SetStateAction } from 'react';

import { TreeViewDataModel, WidgetTreeView } from '@chlee526/ui-kit-react';

import { useCategoryHandler } from '@/feature/keyword';
import { Loader } from '@/shared/ui';

const CategoryList = memo(() => {
    // Hooks
    const { categoryList, isLoaderOpen, selectedCategory, setSelectedCategory, handleAdd, handleUpdate, handleDelete } =
        useCategoryHandler();
    return (
        <>
            <Loader open={isLoaderOpen} />
            <WidgetTreeView
                data={categoryList}
                selectedItem={[selectedCategory, setSelectedCategory as Dispatch<SetStateAction<TreeViewDataModel | null>>]}
                addEvent={handleAdd}
                updateEvent={handleUpdate}
                deleteEvent={handleDelete}
            />
        </>
    );
});
CategoryList.displayName = 'CategoryList';
export { CategoryList };
