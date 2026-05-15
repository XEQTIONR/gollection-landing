import { useState } from 'react';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppHeaderSidebarProvider } from '@/contexts/app-header-sidebar-context';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <AppShell variant="header">
            <AppHeaderSidebarProvider
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            >
                <AppHeader
                    breadcrumbs={breadcrumbs}
                    setSidebarOpen={setSidebarOpen}
                    sidebarOpen={sidebarOpen}
                />
                <AppContent variant="header">{children}</AppContent>
            </AppHeaderSidebarProvider>
        </AppShell>
    );
}
