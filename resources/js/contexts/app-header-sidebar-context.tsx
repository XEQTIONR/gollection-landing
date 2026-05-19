import { createContext, useContext } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

type AppHeaderSidebarContextValue = {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const AppHeaderSidebarContext =
    createContext<AppHeaderSidebarContextValue | null>(null);

export function AppHeaderSidebarProvider({
    sidebarOpen,
    setSidebarOpen,
    children,
}: AppHeaderSidebarContextValue & { children: ReactNode }) {
    return (
        <AppHeaderSidebarContext.Provider
            value={{ sidebarOpen, setSidebarOpen }}
        >
            {children}
        </AppHeaderSidebarContext.Provider>
    );
}

export function useAppHeaderSidebar(): AppHeaderSidebarContextValue {
    const context = useContext(AppHeaderSidebarContext);

    if (!context) {
        throw new Error(
            'useAppHeaderSidebar must be used within AppHeaderSidebarProvider',
        );
    }

    return context;
}
