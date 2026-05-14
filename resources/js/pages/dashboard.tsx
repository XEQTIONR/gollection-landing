import { Head } from '@inertiajs/react';
// import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4 px-6">
                <div className="bg-amber-900/20 relative">
                    <div className="h-80 w-1/2 bg-blue-800/50 absolute bottom-0 right-0"></div>
                    <h1 className="text-4xl lg:text-7xl font-semibold uppercase mt-[35vh] md:mt-[30vh] tracking-wide font-brand">
                        Gollection
                        <span className="text-base ml-3 lowercase">v1.0</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-muted-foreground lg:ml-2 md:max-w-[50vw]">
                       A simple Golang library that provides convenient helpers to work with collections of data.
                    </p>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [],
};
