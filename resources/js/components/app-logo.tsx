import { usePage } from '@inertiajs/react';
// import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { url } = usePage();
    
    const isDocs = url.includes('docs');
    
    return (    
        <>
            {/* <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"> */}
                {/* <AppLogoIcon className="size-14 fill-current text-white dark:text-black" /> */}
            {/* </div> */}
            <div className="grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate  font-medium font-brand uppercase text-xl tracking-widest">
                    Gollection
                    {isDocs && <span className="text-xs font-semibold tracking-wider text-center font-mono relative -top-0.75 ml-3 py-0.5 pl-0.75 pr-0.5 bg-foreground text-background rounded lowercase">Docs</span>}
                </span>
            </div>
        </>
    );
}
