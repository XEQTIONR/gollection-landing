import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Menu, Search, Book, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { docs } from '@/routes';
import type { BreadcrumbItem, Method, NavItem } from '@/types';
import GithubLogoOutlineIcon from './icons/github';
import { Kbd } from '@/components/ui/kbd';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [];

// const rightNavItems: NavItem[] = [
//     {
//         title: 'Repo',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Github
//     },
//     {
//         title: 'Docs',
//         href: docs(),
//         icon: BookOpen,
//     },
// ];

const activeItemStyles =
    'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'

export function AppHeader({ breadcrumbs = [] }: Props) {
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl()
    const { url, props } = usePage<{ methods: Method[] }>()
    const isDocs = url.includes('docs')

    const [open, setOpen] = useState(false)
    const [searchQ, setSearchQ] = useState('')
    const methods = props.methods
    const [results, setResults] = useState<Method[]>(methods)

    const debouncedSearch = useDebouncedCallback((q: string) => {
        const r = methods.filter((method: Method) => {
            const lower = q.toLowerCase()

            return (
                method.name.toLowerCase().includes(lower) || 
                method.description.toLowerCase().includes(lower) || 
                method.code?.toLowerCase().includes(lower)
            )
        })

        setResults(r)
    }, 500)

    useEffect(() => {
        debouncedSearch(searchQ)
    }, [searchQ, debouncedSearch])

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey && event.key.toLowerCase() === 'k') {
                setOpen(o => !o)
            }
        }

        
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [searchQ])

    const handleSelect = (result: Method) => {
        setOpen(false)
        const elem = document.querySelector(`#${result.name}`)

        if (elem) {
            elem.scrollIntoView()
        }
    }

    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command shouldFilter={false} className="rounded-lg border">
                    <CommandInput value={searchQ} onInput={e => setSearchQ(e.currentTarget.value)} placeholder="Search the docs..." />
                    <CommandList>
                        <CommandEmpty>
                            
                            <Wind className="size-4 mx-auto mb-3" />
                            No results found.


                        </CommandEmpty>
                        <CommandGroup heading={`${results?.length ?? 0} Results `}>
                            {
                                results?.map((result) => (
                                    <CommandItem onSelect={() => handleSelect(result)} key={result.name}>
                                        {result.name} <span className="text-xs text-ellipsis line-clamp-1 overflow-hidden text-muted-foreground">{result.description}</span>
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                        <CommandSeparator />
                    </CommandList>
                </Command>
            </CommandDialog>
            <div className="border-b border-sidebar-border/80 sticky top-0 z-10 bg-background">
                <div className="mx-auto flex h-16 items-center px-5 md:max-w-352">
                    {/* Mobile Menu */}
                    {/* <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-[34px] w-[34px]"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-5 w-5" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={toUrl(item.href)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-5 w-5" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div> */}

                    <Link
                        href="/"
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden h-full items-center space-x-6 lg:flex px-10">
                        {isDocs && (
                            <>
                            <Button className="cursor-text text-muted-foreground" variant="ghost" onClick={() => setOpen(true)}>
                                <Search className="size-4" />
                                Search ...
                                
                            </Button>
                            <Kbd className="ml-2 tracking-wide">⌘K</Kbd>
                            </>
                        )}
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="relative flex h-full items-center"
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                whenCurrentUrl(
                                                    item.href,
                                                    activeItemStyles,
                                                ),
                                                'h-9 cursor-pointer px-3',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="mr-2 h-4 w-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                        {isCurrentUrl(item.href) && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                        {isDocs &&
                            <Button
                                onClick={() => setOpen(true)}
                                variant="ghost"
                                size="icon"
                                className="group h-9 w-9 cursor-pointer lg:hidden text-muted-foreground"
                            >
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button>
                        }
                            <div className="ml-1 flex gap-5 items-center">
                                {!isDocs &&
                                    <Link className='font-sans2 font-medium flex items-center text-sm gap-2 px-3 py-1 rounded text-foreground/80 hover:text-foreground border-2 border-background hover:border-foreground/80 transition-colors duration-300' href={docs()}>
                                        <Book className="size-4" /> 
                                        Docs
                                    </Link>
                                }
                                <GithubLogoOutlineIcon onClick={() => window.open('https://github.com/xeqtionr/gollection', '_blank')} className="size-5 cursor-pointer fill-foreground/30 hover:fill-foreground transition-colors duration-300"  />
                            </div>
                        </div>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={auth.user?.avatar}
                                            alt={auth.user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
