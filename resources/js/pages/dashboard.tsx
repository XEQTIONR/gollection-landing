import { Head, router } from '@inertiajs/react';
import { createTimeline, utils } from 'animejs';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { docs } from '@/routes';
// import { dashboard } from '@/routes';

export default function Dashboard() {

    const root = useRef<HTMLDivElement | null>(null);
    const funcLabel = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {

        const timeline = createTimeline({
            // loop: true,
            // loopDelay: 1000,
            // onComplete: () => {
            //     console.log('onComplete')
            // }
        });



        const rootWidth = root.current?.clientWidth || 0;
        const aWidth = document.getElementById('a')?.clientWidth || 0;

        console.log({aWidth})
                
        
        let phase2: ReturnType<typeof createTimeline> | null = null;
        let phase3: ReturnType<typeof createTimeline> | null = null;
        let phase4: ReturnType<typeof createTimeline> | null = null;

        if (rootWidth > 0) {
            timeline
                .set('#a,#b', { top: aWidth/3, borderWidth: '5px', borderColor: 'oklch(0.5434 0.1855 259.82)' }, 0)
                .set('#a', { left: 0 }, 0)
                .set('#b', { left: aWidth*2 }, 0)
                .set('#funcLabel', { opacity: 0 }, 0)
                .set('#a div,#b div', { backgroundColor: '#2369d9' }, 0)
                .add('#funcLabel', { y: '-10px', opacity: 1, delay: 100, duration: 1000, textContent: 'gollection.Combine(fields, values)' }, 0)
                .add('#a', { zIndex: 2, duration: 500, delay: 1000, x: `${aWidth/2}px`, }, 0)
                .add('#b', { duration: 500, delay: 1000, x: `-${aWidth/2}px`, }, 0)
                .add('#a div', { duration: 500, y: (_, i: number) => `${((aWidth/3) * (i+1)) + 10}px`, x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`}, 1500)
                .add('#b div', { duration: 500, y: (_, i: number) => `${((aWidth/3) * (i+1)) + 10}px`, x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`, }, 1500)
                .add('#b', { duration: 500, x: `-${aWidth * 1.17}px`, borderColor: 'rgba(0, 0, 0, 0)' }, 2000)
                .add('#b', { duration: 500, x: `-${aWidth * 1.17}px` }, 2500)
                .add('#a div,#b div', {duration: 500, y: (_, i: number) => `${(i%3) * (aWidth/3)}px`, }, 2500)
                .add('#b', { duration: 500, x: -(aWidth*1.667) }, 3000)
                .add('#a', { x: 0, duration: 500, height: `${aWidth + 15}px`, width: `${aWidth * (2/3) + 15}px` }, 3000)
                .set('#b div', {  backgroundColor: '#888' }, 3000)
                .call(() => {
                    // Phase 2 must be a separate timeline — timeline.add() on the parent during play calls init() and replays #a/#b.
                    const cloneA = document.getElementById('a')?.cloneNode(true) as HTMLElement;
                    const cloneB = document.getElementById('b')?.cloneNode(true) as HTMLElement;

                    if (!cloneA || !cloneB) {
                        return;
                    }

                    cloneA.id = 'cloneA';
                    cloneB.id = 'cloneB';
                    root.current?.appendChild(cloneA);
                    root.current?.appendChild(cloneB);
                    cloneA.style.zIndex = '-1';
                    cloneB.style.zIndex = '-1';

                    if (cloneA.children[2]) {
                        cloneA.removeChild(cloneA.children[2]);
                    }

                    if (cloneB.children[1]) {
                        cloneB.children[1].innerHTML = '11';
                    }

                    if (cloneB.children[2]) {
                        cloneB.removeChild(cloneB.children[2]);
                    }

                    const cloneHeight = aWidth * (2 / 3) + 15;
                    const label = funcLabel.current!

                    phase2 = createTimeline()
                        .add(cloneA, {
                            zIndex: { to: 1, duration: 0, delay: 700 },
                            height: [
                                { to: cloneHeight, duration: 0, delay: 700 },
                                { to: cloneHeight / 2, duration: 0, delay: 1000 },
                            ],
                            borderBottomWidth: { to: 0, duration: 0, delay: 1500 },
                            x: [
                                { to: aWidth, duration: 0, delay: 700 },
                                { to: 0, duration: 500, delay: 500 },
                            ],
                        }, 600)
                        .add(cloneB, {
                            zIndex: { to: 0, duration: 0, delay: 700 },
                            height: [
                                { to: cloneHeight, duration: 0, delay: 700 },
                                { to: cloneHeight / 2, duration: 0, delay: 1000 },
                            ],
                            x: [
                                { to: -(aWidth / 1.5), duration: 0, delay: 700 },
                                { to: -(aWidth / 1.5) - aWidth, duration: 500, delay: 500 },
                            ],
                        }, 600)
                        .add(label, {
                            y: [0, -10],
                            opacity: [0, 1],
                            delay: 0,
                            duration: 1000,
                            textContent: 'gollection.CombineMap(fields, values)',
                        }, 400)

                    phase2.call(() => {
                        const cloneAEl = document.getElementById('cloneA');
                        const cloneBEl = document.getElementById('cloneB');

                        if (cloneAEl && root.current?.contains(cloneAEl)) {
                            root.current.removeChild(cloneAEl);
                        }

                        if (cloneBEl && root.current?.contains(cloneBEl)) {
                            root.current.removeChild(cloneBEl);
                        }
                        
                        timeline.revert()
                        
                        phase3 = createTimeline()

                        phase3
                            .set('#a,#b', { top: aWidth/3, borderWidth: '5px', borderColor: 'oklch(0.5434 0.1855 259.82)' }, 0)
                            .set('#a', { left: 0 }, 0)
                            .set('#b', { left: aWidth*2 }, 0)
                            .set('#a div', { textContent: (_, i: number) => {
                                switch (i) {
                                    case 0:
                                        return 'joe';
                                    case 1:
                                        return 'fin';
                                    case 2:
                                        return 'tim';
                                }
                            } }, 0)
                            .add('#funcLabel', { y: '-10px', opacity: 1, delay: 0, duration: 1000, textContent: 'gollection.CrossJoin(fields, values)' }, 0)
                            .call(() => {
                                const aDivs = document.querySelectorAll('#a div');
                                const bDivs = document.querySelectorAll('#b div');


                                const aClones: HTMLElement[][] = [];
                                const bClones: HTMLElement[][] = [];

                                aDivs.forEach((aDiv, j) => {
                                    const clones = [];

                                    for (let i = 0; i < 3; i++) {
                                        const clone = aDiv.cloneNode(true) as HTMLElement;
                                        clone.id = `cloneA-${j}-copy-${i}`;
                                        clone.style.opacity = '0';
                                        root.current?.appendChild(clone);
                                        clones.push(clone);
                                    }

                                    aClones.push(clones);
                                })

                                bDivs.forEach((bDiv, j) => {
                                    const clones = [];

                                    for (let i = 0; i < 3; i++) {
                                        const clone = bDiv.cloneNode(true) as HTMLElement;
                                        clone.id = `cloneA-${j}-copy-${i}`;
                                        clone.style.opacity = '0';
                                        root.current?.appendChild(clone);
                                        clones.push(clone);
                                    }

                                    bClones.push(clones);
                                })

                                phase4 = createTimeline()

                                for (let i = 0; i < 3; i++) {
                                    // console.log('aclones i', aClones[i])
                                    aClones[i].forEach((clone, j) => {
                                        phase4?.add(clone, {
                                            position: 'absolute',
                                            y: aWidth/3 + (10*j),
                                            x: (50*i),
                                            // x: (_, j: number) => `${(j * (aWidth/3)) + 10}px`,
                                            opacity: 0,
                                            delay: 0,
                                            duration: 0,
                                        }, 0)
                                    })

                                    bClones[i].forEach((clone, j) => {
                                        phase4?.add(clone, {
                                            position: 'absolute',
                                            y: aWidth/3 + (10*j),
                                            x: rootWidth - aWidth + (50*i),
                                            // x: (_, j: number) => `${(j * (aWidth/3)) + 10}px`,
                                            opacity: 0,
                                            delay: 0,
                                            duration: 0,
                                        }, 0)
                                    })
                                }

                                aClones.forEach((aCloneGroup, i) => {
                                    aCloneGroup.forEach((aClone, j) => {
                                        phase4?.add(aClone, {
                                            y: aWidth + (70*j) - 20,
                                            x: (150*i) + 20,
                                            opacity: 1,
                                            delay: 0,
                                            duration: 500,
                                        }, 1500 * i + 500 * j)   
                                    })
                                })


                                bClones.forEach((aCloneGroup, i) => {
                                    aCloneGroup.forEach((aClone, j) => {
                                        phase4?.add(aClone, {
                                            y: aWidth + (70*i) - 20,
                                            x: (150*j) + 20 + 60,
                                            opacity: 1,
                                            delay: 0,
                                            duration: 500,
                                        }, 1500 * i + 500 * j)   
                                    })
                                })

                                phase4.play();
                            })

                        phase3.play();
                    }, 3000);

                    phase2.play();
                }, 3500)
        }

        timeline.play();

        return () => {
            timeline.revert();
            phase2?.revert();
            phase3?.revert();
            phase4?.revert();
        };
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4 px-6">
                <div className="relative">
                    <div ref={root} className="h-80 w-full md:w-3/5 xl:w-2/5 absolute top-20 md:top-30 lg:top-40 right-0 z-10 border-2 border-dashed">
                        <span className="absolute top-0 left-0 font-mono text-xs md:text-base text-muted-foreground border py-2 px-4 rounded-md" ref={funcLabel} id="funcLabel"></span>
                        <Collection id="a" items={['id','age','n']} />
                        <Collection id="b" items={[511,21,6]} />
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-semibold uppercase mt-[35vh] md:mt-[30vh] tracking-wide font-brand z-50 relative">
                        Gollection
                        <span className="text-base ml-3 lowercase">v1.0</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-muted-foreground lg:ml-2 md:max-w-[50vw] z-50 relative">
                       A simple Golang library that provides convenient helpers to work with collections of data.
                    </p>
                    <div className="flex gap-4.5 mt-6 z-50 relative">
                       <Button className="cursor-pointer" onClick={() => router.visit(docs())} size="lg">Read the Docs</Button>
                       <Button className="cursor-pointer" onClick={() => window.location.href = 'https://github.com/xeqtionr/gollection'} variant="outline" size="lg">View on GitHub</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

function Collection({ id, items }: { id: string, items: any[] }) {
    return (
        <div 
            id={id}
            className="rounded absolute flex items-baseline p-2 gap-2 overflow-visible h-13 md:h-16 lg:h-18"
        >
            {
                items.map(i => (
                    <div className="size-7 md:size-10 lg:size-12 rounded bg-[#2369d9] flex  items-center justify-center shrink-0">
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
