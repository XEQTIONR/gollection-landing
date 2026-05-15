import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { docs } from '@/routes';
// import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4 px-6">
                <div className="relative">
                    <div className="h-80 w-1/2 bg-blue-800/50 absolute bottom-0 right-0"></div>
                    <h1 className="text-4xl lg:text-7xl font-semibold uppercase mt-[35vh] md:mt-[30vh] tracking-wide font-brand">
                        Gollection
                        <span className="text-base ml-3 lowercase">v1.0</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-muted-foreground lg:ml-2 md:max-w-[50vw]">
                       A simple Golang library that provides convenient helpers to work with collections of data.
                    </p>
                    <div className="flex gap-4.5 mt-6">
                       <Button className="cursor-pointer" onClick={() => router.visit(docs())} size="lg">Read the Docs</Button>
                       <Button className="cursor-pointer" onClick={() => window.location.href = 'https://github.com/xeqtionr/gollection'} variant="outline" size="lg">View on GitHub</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [],
};
