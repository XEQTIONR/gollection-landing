import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { docs } from '@/routes';
import { useEffect, useRef, CSSProperties } from 'react';
import { animate, createScope, spring, createDraggable, Scope, createTimeline, anime } from 'animejs';
// import { dashboard } from '@/routes';

export default function Dashboard() {

    const root = useRef<HTMLDivElement | null>(null);
    const funcLabel = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const timeline = createTimeline({
            //loop: true,
            //loopDelay: 1000,
        });



        const rootWidth = root.current?.clientWidth || 0;
        const rootHeight = root.current?.clientHeight || 0;
        const aWidth = document.getElementById('a')?.clientWidth || 0;

        console.log({aWidth})
        //(document.querySelector('#a,#b') as HTMLElement)?.style.backgroundColor = '#0000FF';
        
        if (rootWidth > 0) {
            timeline.set('#a,#b', {
                borderWidth: '5px',
                borderColor: 'oklch(0.5434 0.1855 259.82)'
            },0);

            timeline.set('#a', {
                left: 0,
            },0)

            timeline.set('#b', {
                left: aWidth*2,
            },0)

            if (funcLabel.current) {
                funcLabel.current!.textContent = 'gollection.Join(slice1, slice2)';
                funcLabel.current!.style.opacity = '0';
                
            }

            timeline.add('#a div,#b div', {
                backgroundColor: '#2369d9'
            },0)

            // timeline.add('#funcLabel', {
            //     y: '-10px',
            //     opacity: 1,
            //     delay: 100,
            //     duration: 1000
            // }, 0);

            timeline.add('#a', {
                zIndex: 10,
                duration: 500,
                delay: 1000,
                x: `${aWidth/2}px`,
            },0);
            timeline.add('#b', {
                // borderWidth: 0,
                // paddingTop: 13,
                // borderColor: 'rgba(0, 0, 0, 0)',
                duration: 500,
                delay: 1000,
                x: `-${aWidth/2}px`,
            },0)

            // timeline.add('#a, #b', {
            //     duration: 100,
            //     borderWidth: '0px',
            // }, 1500)

            timeline.add('#a div', {
                duration: 500,
                y: (_, i: number) => `${((aWidth/3) * (i+1)) + 10}px`,
                x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`,
            },1500);

            timeline.add('#b div', {
                duration: 500,
                // delay: 1000,
                // left: 0,
                y: (_, i: number) => `${((aWidth/3) * (i+1)) + 10}px`,
                x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`,
            },1500);

            timeline.add('#b', {
                duration: 500,
                x: `-${aWidth * 1.17}px`,
                borderColor: 'rgba(0, 0, 0, 0)',
            },2000);

            timeline.add('#b', {
                
                duration: 500,
                x: `-${aWidth * 1.17}px`,
                //y: `-`
            },2500);

            timeline.add('#a div,#b div', {
                duration: 500,
                y: (_, i: number) => `${(i%3) * (aWidth/3)}px`,
            },2500);

            timeline.add('#b', {
                duration: 500,
                x: `-${aWidth * 1.17}px`,
                //y: `-`
            },3000);

            timeline.add('#a', {
                duration: 500,
                height: `${aWidth + 15}px`,
                width: `${aWidth * (2/3) + 15}px`,
                // y: (_, i: number) => `${(i%3) * (aWidth/3)}px`,
            },3000);

            timeline.set('#b div', {
                backgroundColor: '#888',
            },3000);

            // timeline.add('#a div', {
            //     alignItems: 'end',
            //     duration: 500,
            //     // height: `${aWidth + 15}px`,
            //     width: `${50}px`,
            //     // y: (_, i: number) => `${(i%3) * (aWidth/3)}px`,
            // },3000);
        }

        // timeline.add('#a,#b', {
        //     backgroundColor: '#4287f5',
            
        // });

        // timeline.add('#a div,#b div', {
        //     backgroundColor: '#19bf77',
            
        // });

        timeline.play();
        // scope.current = createScope({ root }).add( self => {
        //     // Every anime.js instance declared here is now scoped to <div ref={root}>
        //     // Created a bounce animation loop
        //     animate('#a', {
        //       x: '7.7rem',
        //     //   scale: [
        //     //     { to: 1.25, ease: 'inOut(3)', duration: 200 },
        //     //     { to: 1, ease: spring({ bounce: .7 }) }
        //     //   ],
        //       loop: true,
        //       loopDelay: 250,
        //     });

        //     animate('#b', {
        //         x: '-7.7rem',
        //         // scale: [
        //         //   { to: 1.25, ease: 'inOut(3)', duration: 200 },
        //         //   { to: 1, ease: spring({ bounce: .7 }) }
        //         // ],
        //         loop: true,
        //         loopDelay: 250,
        //       });
            
        //     // Make the logo draggable around its center
        //     // createDraggable('#a', {
        //     //   container: [0, 0, 0, 0],
        //     //   releaseEase: spring({ bounce: .7 })
        //     // });
      
        //     // Register function methods to be used outside the useEffect
        //     // self.add('rotateLogo', (i) => {
        //     //   animate('.logo', {
        //     //     rotate: i * 360,
        //     //     ease: 'out(4)',
        //     //     duration: 1500,
        //     //   });
        //     // });
      
        //   });
      
          // Properly cleanup all anime.js instances declared inside the scope
        //   return () => scope.current?.revert()
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4 px-6">
                <div className="relative">
                    <div ref={root} className="h-80 w-full lg:w-1/2 absolute top-0 lg:top-auto lg:bottom-0 right-0 ">
                        <span className="absolute top-0 left-0" ref={funcLabel} id="funcLabel"></span>
                        <Collection top={8} left={0} id="a" items={['id','age','n']} />
                        <Collection top={8} left={0} isRight={true} id="b" items={[511,21,6]} />
                    </div>
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

function Collection({ id, items, top = 0, left = 0, isRight = false, }: { id: string, items: any[], top?: number, left?: number, isRight?: boolean }) {
    

    return (
        <div 
            id={id}
            className="rounded absolute flex items-baseline p-2 gap-2 overflow-visible"
        >
            {
                items.map(i => (
                    <div className="size-10 rounded bg-[#2369d9] flex  items-center justify-center shrink-0">
                        <h6 className="text-white text-sm font-medium text-center">{i}</h6>
                    </div>
                ))
            }
        </div>
    )
}

Dashboard.layout = {
    breadcrumbs: [],
};
