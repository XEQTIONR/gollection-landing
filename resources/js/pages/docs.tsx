import { Head } from '@inertiajs/react';

import { useAppHeaderSidebar } from '@/contexts/app-header-sidebar-context';
import { cn } from '@/lib/utils';
import type { Method } from '@/types';

export default function Docs({ methods }: { methods: Method[] }) {
    const { sidebarOpen } = useAppHeaderSidebar();

    return (
        <>
            <Head title="Docs" />
            
            <div className="flex flex-row items-stretch gap-4 overflow-visible rounded-xl max-h-screen">
                <div className={cn(
                     "min-w-68 border-r py-4 px-6 h-full sticky top-18 max-h-[90vh] overflow-y-scroll",
                     "lg:min-w-60 lg:flex",
                     !sidebarOpen && "hidden",
                )}>
                    <ul className="">
                        <li className="mb-5 font-medium">
                            <a className="hover:underline" href={`#intro`}>
                                Gollection
                            </a>
                        </li>
                        <li className="mb-5 font-medium">
                            <a className="hover:underline" href={`#getting-started`}>
                                Getting Started
                            </a>
                        </li>
                        <li className="mb-5 font-medium">
                            <a className="hover:underline" href={`#available-methods`}>
                                Available Methods
                            </a>
                        </li>
                        {methods.map((method) => (
                            <li className="mb-3 pl-3" key={method.name}>
                                <a className="hover:underline" href={`#${method.name}`}>
                                    {method.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="h-full max-h-[90vh] overflow-y-scroll overflow-x-clip gap-12 px-4 py-2">
                    <div className="flex flex-col w-screen lg:w-full h-full pr-8 lg:pr-0">
                        <div id="intro">
                            <a href="#intro"><h2 className="font-semibold text-2xl ml-0.5 hover:underline">Gollection</h2></a>
                            <p className="mt-4 mb-4 ml-1 font-sans2">
                                A simple go library that provides convenient helpers to work with collections of data.
                                A Collection is a group of related data like a <b>slice</b> or a <b>map</b>.
                                
                            </p>
                            <p className="mt-4 mb-4 ml-1 font-sans2">
                                The word <b>"Gollection"</b> is a portmanteau of the words <i>"go"</i> and <i>"collection"</i>.
                            </p>
                            <p className="mt-4 mb-4 ml-1 font-sans2">
                                Current version is <b>1.0</b> <i>(Amethyst)</i>. 
                            </p>
                        </div>

                        <div id="getting-started" >
                            <a href="#getting-started"><h2 className="font-semibold text-2xl ml-0.5 hover:underline">Getting Started</h2></a>
                            <p className="mt-4 mb-4 ml-1 font-sans2">
                                Getting started with Gollection is easy. Just install the package and you're ready to go.
                                After that you can start using gollection functions.
                            </p>
                            <h3 className="font-semibold text-lg ml-0.5 mb-2">Get the package</h3>
                            <div className="bg-neutral-900 p-4 rounded-lg text-sm mb-4 overflow-x-scroll">
                                
                                <pre>
                                    <code className='language-go'>
                                        go get github.com/gollection/gollection
                                    </code>
                                </pre>
                            </div>
                            <h3 className="font-semibold text-lg ml-0.5 mb-2">Import it into your code</h3>
                            <div className="bg-neutral-900 p-4 rounded-lg text-sm mb-4 overflow-x-scroll">
                                
                                <pre>
                                    <code className='language-go'>
                                        import "github.com/gollection/gollection"
                                    </code>
                                </pre>
                            </div>
                            <h3 className="font-semibold text-lg ml-0.5 mb-2">You're ready to go!</h3>
                            <p className="mb-3">You can now start using gollection functions on your slices and maps.</p>
                            <div className="bg-neutral-900 p-4 rounded-lg text-sm overflow-x-scroll">
                                
                                <pre>
                                    <code className='language-go'>
                                        {
                                            `counts := gollection.Counts([]string{"a", "a", "b"})\nfmt.Printf("%v", counts)`
                                        }
                                    </code>
                                </pre>
                            </div>
                            {/* {method.code && (
                                <div className="bg-neutral-900 p-4 rounded-lg text-sm">
                                    <pre><code className='language-go'>{method.code}</code></pre>
                                </div>
                            )} */}
                        </div>
                        
                        <div className="flex flex-col">
                            <a href="#available-methods"><h2 id="available-methods" className="font-semibold text-2xl ml-0.5 my-6 hover:underline">Available Methods</h2></a>
                            <div className="flex flex-col gap-10">
                                {methods.map((method) => (
                                    <div id={method.name} key={method.name}>
                                        <a href={`#${method.name}`}><h2 className="font-semibold text-lg ml-0.5 hover:underline">{method.name}</h2></a>
                                        <p className="mt-2 mb-4 ml-1 font-sans2">{method.description}</p>
                                        {method.code && (
                                            <div className="bg-neutral-900 p-4 rounded-lg text-sm overflow-x-scroll">
                                                <pre><code className='language-go'>{method.code}</code></pre>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Docs.layout = {
    breadcrumbs: [],
};
