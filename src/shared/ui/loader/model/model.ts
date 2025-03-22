interface LoaderState {
    id: string;
    isOpen: boolean;
}

interface PageLoaderModel {
    showPageLoader: (id: string, open: boolean) => void;
    isOpen: boolean;
    loaderStack: LoaderState[];
    resetPageLoader: () => void;
}

export type { PageLoaderModel };
