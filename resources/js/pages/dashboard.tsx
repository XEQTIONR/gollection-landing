import { Head, router } from '@inertiajs/react';
import { createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { docs } from '@/routes';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

const BLUE_COLOR = 'oklch(0.6206 0.2121 270)';
const BLUE_COLOR_OPACITY = 'oklch(0.6206 0.2121 270 / 0.20)';
const GRAY_COLOR = 'oklch(0.7467 0 0)';
const GREEN_COLOR = 'oklch(0.7 0.1751 163.06)';
const TRANSPARENT_COLOR = 'oklch(0 0 0 / 0%)';

const PADDING = 10;

export default function Dashboard() {

    const root = useRef<HTMLDivElement | null>(null)
    const funcLabel = useRef<HTMLSpanElement | null>(null)
    const [viewportWidth, setViewportWidth] = useState(0)

    const onResizeViewport = () => {
        console.log('resize', window.innerWidth)
        setViewportWidth(window.innerWidth)
    }
    const debouncedFunc = useDebouncedCallback(onResizeViewport, 100)

    useEffect(() => {
        window.addEventListener('resize', debouncedFunc)
        
        return () => {
            window.removeEventListener('resize', debouncedFunc)
        }
    }, [debouncedFunc])

    useEffect(() => {
        const LOOP_DELAY = 1000;
        let cancelled = false;
        let loopTimeout: ReturnType<typeof setTimeout> | undefined;

        let phase1: ReturnType<typeof createTimeline> | null = null;
        let phase2: ReturnType<typeof createTimeline> | null = null;
        let phase3: ReturnType<typeof createTimeline> | null = null;
        let phase4: ReturnType<typeof createTimeline> | null = null;
        let phase5: ReturnType<typeof createTimeline> | null = null;
        let phase6: ReturnType<typeof createTimeline> | null = null;
        let phase7: ReturnType<typeof createTimeline> | null = null;

        const rootWidth = root.current?.clientWidth || 0;
        const aWidth = document.getElementById('a')?.clientWidth || 0;
        const itemWidth = document.querySelector('#a div')?.clientWidth || 0;

        const removeDynamicClones = () => {
            root.current?.querySelectorAll('[id^="clone"]').forEach((el) => el.remove())
        };

        const resetSourceElements = () => {
            const aLabels = ['id', 'age', 'n'];
            document.querySelectorAll('#a div h6').forEach((el, i) => {
                if (aLabels[i]) {
                    el.textContent = aLabels[i];
                }
            });
        };

        const cleanup = () => {
            phase1?.revert();
            phase2?.revert();
            phase3?.revert();
            phase4?.revert();
            phase5?.revert();
            phase6?.revert();
            phase7?.revert();
            phase1 = phase2 = phase3 = phase4 = phase5 = phase6 = phase7 = null;
            removeDynamicClones();
            resetSourceElements();
        };

        const scheduleRestart = () => {
            if (cancelled) {
                return;
            }

            loopTimeout = setTimeout(() => {
                if (!cancelled) {
                    runSequence();
                }
            }, LOOP_DELAY);
        };

        const runSequence = () => {
            if (cancelled || rootWidth <= 0) {
                return;
            }

            cleanup();

            phase1 = createTimeline()
                .set('#a,#b', { top: aWidth/3, borderWidth: '5px', borderColor: BLUE_COLOR, backgroundColor: BLUE_COLOR_OPACITY, opacity: 1 }, 0)
                .set('#a', { left: 0, zIndex: 2 }, 0)
                .set('#b', { left: aWidth*2, zIndex: 2 }, 0)
                .set('#funcLabel', { opacity: 0 }, 0)
                .set('#a div,#b div', { backgroundColor: BLUE_COLOR, opacity: 1 }, 0)
                .add('#funcLabel', { y: '-10px', opacity: 1, delay: 100, duration: 1000, textContent: 'gollection.Combine(fields, values)' }, 0)
                .add('#a', { duration: 500, delay: 1000, x: `${aWidth/2}px`, }, 0)
                .add('#b', { duration: 500, delay: 1000, x: `-${aWidth/2}px`, }, 0)
                .add('#a div', { duration: 500, y: (_, i: number) => `${((aWidth/3) * (i+1)) + 10}px`, x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`}, 1500)
                .add('#b div', { duration: 500, y: (_, i: number) => `${((aWidth/3) * (i+1)) + 10}px`, x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`, }, 1500)
                .add('#b', { duration: 500, x: `-${aWidth * 1.17}px`, borderColor: TRANSPARENT_COLOR, backgroundColor: TRANSPARENT_COLOR }, 2000)
                .add('#b', { duration: 500, x: `-${aWidth * 1.17}px` }, 2500)
                .add('#a div,#b div', {duration: 500, y: (_, i: number) => `${(i%3) * (aWidth/3)}px`, }, 2500)
                .add('#b', { duration: 500, x: -(aWidth*1.667) }, 3000)
                .add('#a', { x: 0, duration: 500, height: `${aWidth + 15}px`, width: `${aWidth * (2/3) + 15}px` }, 3000)
                .set('#b div', {  backgroundColor: GRAY_COLOR }, 3000)
                .call(() => {

                    const cloneA = document.getElementById('a')?.cloneNode(true) as HTMLElement;
                    const cloneB = document.getElementById('b')?.cloneNode(true) as HTMLElement;

                    if (!cloneA || !cloneB) {
                        return;
                    }

                    cloneA.id = 'cloneA';
                    cloneB.id = 'cloneB';
                    cloneA.style.opacity = '0';
                    cloneB.style.opacity = '0';
                    cloneA.style.zIndex = '-1';
                    cloneB.style.zIndex = '-1';
                    root.current?.appendChild(cloneA);
                    root.current?.appendChild(cloneB);

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
                            backgroundColor: { to: TRANSPARENT_COLOR, duration: 0, delay: 1500 },
                            opacity: { to: 1, duration: 0, delay: 700 },
                            zIndex: { to: 2, duration: 0, delay: 700 },
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
                            opacity: { to: 1, duration: 0, delay: 700 },
                            zIndex: { to: 2, duration: 0, delay: 700 },
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
                        
                        phase1?.revert()
                        
                        phase3 = createTimeline()

                        phase3
                            .set('#a,#b', { top: aWidth/3, borderWidth: '5px', borderColor: BLUE_COLOR, backgroundColor: BLUE_COLOR_OPACITY, }, 0)
                            .set('#a', { left: 0 }, 0)
                            .set('#b', { left: aWidth*2 }, 0)
                            .set('#a div,#b div', { backgroundColor: BLUE_COLOR, opacity: 1 }, 0)
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
                                const aDivs = document.querySelectorAll('#a div')
                                const bDivs = document.querySelectorAll('#b div')


                                const aClones: HTMLElement[][] = []
                                const bClones: HTMLElement[][] = []

                                aDivs.forEach((aDiv, j) => {
                                    const clones = []

                                    for (let i = 0; i < 3; i++) {
                                        const clone = aDiv.cloneNode(true) as HTMLElement
                                        clone.id = `cloneA-${j}-copy-${i}`
                                        clone.style.opacity = '0'
                                        root.current?.appendChild(clone)
                                        clones.push(clone)
                                    }

                                    aClones.push(clones)
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


                                for (let i = 0; i < 9; i++) {
                                    const input = document.querySelector('#a')!.cloneNode(true) as HTMLElement;

                                    while (input.children.length > 0) {
                                        input.removeChild(input.children[0]);
                                    }

                                    input.id = `clone-${i}`;
                                    root.current?.appendChild(input);
                                    input.style.border = `2px dashed ${BLUE_COLOR}`;
                                    input.style.opacity = '0';
                                    input.style.position = 'absolute';
                                    input.style.top = '0';
                                    input.style.left = '-10px';
                                    input.style.zIndex = '5';
                                    input.style.width = aWidth*(2/3) + 10 + 'px'
                                }

                                const outerContainer = document.querySelector('#a')!.cloneNode(true) as HTMLElement

                                while (outerContainer.children.length > 0) {
                                    outerContainer.removeChild(outerContainer.children[0]);
                                }

                                outerContainer.id = `clone-Container`
                                root.current?.appendChild(outerContainer);
                                outerContainer.style.border = `5px solid ${BLUE_COLOR}`;
                                outerContainer.style.opacity = '0';
                                outerContainer.style.position = 'absolute';
                                outerContainer.style.top = itemWidth + 'px';
                                outerContainer.style.left = '0';
                                outerContainer.style.zIndex = '3';
                                outerContainer.style.width = aWidth * 3 + 'px'
                                outerContainer.style.height = (itemWidth * 3) + (12 * PADDING) + 'px'

                                phase4 = createTimeline();

                                for (let i = 0; i < 3; i++) {
                                    aClones[i].forEach((clone, j) => {
                                        phase4?.add(clone, {
                                            position: 'absolute',
                                            y: aWidth/3 + (PADDING*j),
                                            x: (50*i),
                                            opacity: 0,
                                            delay: 0,
                                            duration: 0,
                                            zIndex: 10
                                        }, 0)
                                    })

                                    bClones[i].forEach((clone, j) => {
                                        phase4?.add(clone, {
                                            position: 'absolute',
                                            y: aWidth/3 + (PADDING*j),
                                            x: rootWidth - aWidth + (50*i),
                                            opacity: 0,
                                            delay: 0,
                                            duration: 0,
                                            zIndex: 10
                                        }, 0)
                                    })
                                }

                                aClones.forEach((aCloneGroup, i) => {
                                    aCloneGroup.forEach((aClone, j) => {

                                        phase4?.add(aClone, {
                                            y: aWidth + (70*j) - PADDING,
                                            x: (4 * i * itemWidth) + 20,
                                            opacity: 1,
                                            delay: 0,
                                            duration: 500,
                                        }, 1500 * i + 500 * j)

                                        const miniContainer = document.getElementById(`clone-${i*3 + j}`)!

                                        miniContainer.style.left = (4 * i * itemWidth)+ PADDING + 'px';
                                        miniContainer.style.top = aWidth + (70*j) - 30 + itemWidth/4 + 'px';

                                        phase4?.add(miniContainer, {
                                            opacity: 1,
                                            zIndex: 1,
                                            delay: 0,
                                            duration: 500,
                                        }, 1500 * i + 500 * j)
                                        
                                        phase4?.add(aClone, {
                                            y: (70*j) + aWidth/3 + itemWidth/2.5,
                                        }, 4500)

                                        phase4?.add(miniContainer, {
                                            transform: `translateY(-${(aWidth/2)}px)`,
                                        }, 4500)
                                    })
                                })


                                bClones.forEach((bCloneGroup, i) => {
                                    bCloneGroup.forEach((bClone, j) => {
                                        phase4?.add(bClone, {
                                            y: aWidth + (70*i) - PADDING,
                                            x: (4 * j * itemWidth) + 20 + (itemWidth + PADDING),
                                            opacity: 1,
                                            delay: 0,
                                            duration: 500,
                                        }, 1500 * i + 500 * j)   

                                        phase4?.add(bClone, {
                                            y: (70*i) + aWidth/3 + itemWidth/2.5,
                                        }, 4500)
                                    })
                                })
                                
                                phase4
                                    .add('#a,#b', { opacity: 0, backgroundColor: BLUE_COLOR_OPACITY }, 4500)
                                    .add('#clone-Container', { opacity: 1 }, 4500)
                                    .call(() => {
                                        cleanup()

                                        
                                        const aClones: HTMLElement[] = []
                                        const cClones: HTMLElement[] = []

                                        aDivs.forEach((aDiv, j) => {
                    
                                            const aclone = aDiv.cloneNode(true) as HTMLElement
                                            const cclone = aDiv.cloneNode(true) as HTMLElement
                                            aclone.id = `clone-${j}`
                                            cclone.id = `clone-${j}-c`
                                            cclone.innerHTML = '0'
                                            //clone.style.opacity = '0'
                                            root.current?.appendChild(aclone)
                                            root.current?.appendChild(cclone)

                                            aClones.push(aclone)
                                            cClones.push(cclone)
                                        })

                                        phase5 = createTimeline()
                                        phase5
                                        .set('#a,#b', { top: aWidth/3, borderTopWidth: 5, borderBottomWidth: 5, borderColor: BLUE_COLOR }, 0)
                                        .set('#a', { left: 0, borderLeftWidth: '5px' }, 0)
                                        .set('#b', { left: aWidth*2 - aWidth - 4, borderRightWidth: 5, }, 0)
                                        .set('#funcLabel', { opacity: 0 }, 0)
                                        .set('#a div,#b div', { backgroundColor: BLUE_COLOR, opacity: 1 }, 0)
                                        .add('#funcLabel', { y: -10, opacity: 1, delay: 100, duration: 1000, textContent: 'gollection.Counts(slice)' }, 0)
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
                                        .set('#b div', { textContent: (_, i: number) => {
                                            switch (i) {
                                                case 0:
                                                    return 'tim';
                                                case 1:
                                                    return 'joe';
                                                case 2:
                                                    return 'joe';
                                            }
                                        } }, 0)
                                        
                                        aClones.forEach((aClone, i) => {
                                            phase5!
                                               .set(aClone, { backgroundColor: BLUE_COLOR, y: aWidth + ((itemWidth + PADDING)*i), duration: 200, position: 'absolute', opacity: 0, textContent: () => {
                                                    switch (i) {
                                                        
                                                        case 0:
                                                            return 'joe';
                                                        case 1:
                                                            return 'fin';
                                                        case 2:
                                                            return 'tim';
                                                    }
                                               } }, 0)
                                               .add(aClone, { opacity: 1 }, 1000)


                                               .set(cClones[i], { backgroundColor: BLUE_COLOR, x: itemWidth + PADDING, y: aWidth + ((itemWidth + PADDING)*i), duration: 200, position: 'absolute', opacity: 0, }, 0)
                                               .add(cClones[i], { opacity: 1 }, 2000)
                                        })

                                        const allDivs = document.querySelectorAll('#a div, #b div')

                                        allDivs.forEach((aDiv, i) => {
                                            const AT = 2000 + (250*i)
                                            phase5!.add(aDiv, { scale: [1, 1.5, 1], duration: 250 }, AT)


                                            switch (i) {
                                                case 0:
                                                    phase5!.add(cClones[0], { duration: 0, textContent: '1' }, AT)
                                                    phase5!.add(cClones[0], { duration: 0, backgroundColor: GREEN_COLOR}, AT)
                                                    phase5!.add(cClones[0], { duration: 0, backgroundColor: GRAY_COLOR}, AT+100)
                                                    break
                                                case 1:
                                                    phase5!.add(cClones[1], { duration: 0, textContent: '1' }, AT)
                                                    phase5!.add(cClones[1], { duration: 0, backgroundColor: GREEN_COLOR}, AT)
                                                    phase5!.add(cClones[1], { duration: 0, backgroundColor: GRAY_COLOR}, AT+100)
                                                    break
                                                case 2:
                                                    phase5!.add(cClones[2], { duration: 0, textContent: '1' }, AT)
                                                    phase5!.add(cClones[2], { duration: 0, backgroundColor: GREEN_COLOR}, AT)
                                                    phase5!.add(cClones[2], { duration: 0, backgroundColor: GRAY_COLOR}, AT+100)
                                                    break
                                                case 3:
                                                    phase5!.add(cClones[2], { duration: 0, textContent: '2' }, AT)
                                                    phase5!.add(cClones[2], { duration: 0, backgroundColor: GREEN_COLOR}, AT)
                                                    phase5!.add(cClones[2], { duration: 0, backgroundColor: GRAY_COLOR}, AT+100)
                                                    break
                                                case 4:
                                                    phase5!.add(cClones[0], { duration: 0, textContent: '2' }, AT)
                                                    phase5!.add(cClones[0], { duration: 0, backgroundColor: GREEN_COLOR}, AT)
                                                    phase5!.add(cClones[0], { duration: 0, backgroundColor: GRAY_COLOR}, AT+100)
                                                    break
                                                case 5:
                                                    phase5!.add(cClones[0], { duration: 0, textContent: '3', endDelay: 3000 }, AT)
                                                    phase5!.add(cClones[0], { duration: 0, backgroundColor: GREEN_COLOR}, AT)
                                                    phase5!.add(cClones[0], { duration: 0, backgroundColor: GRAY_COLOR}, AT+100)
                                                    break
                                            }
                                        })

                                        phase5.call(() => {
                                            cleanup()
                                            phase6 = createTimeline()
                                                .set('#a,#b', { top: aWidth/3, borderWidth: '5px', borderColor: BLUE_COLOR }, 0)
                                                
                                                .set('#a div', { textContent: (_, i: number) => {
                                                    switch (i) {
                                                        case 0:
                                                            return 'tim';
                                                        case 1:
                                                            return 'tim';
                                                        case 2:
                                                            return 'fin';
                                                    }
                                                } }, 0)
                                                .set('#b div', { textContent: (_, i: number) => {
                                                    switch (i) {
                                                        case 0:
                                                            return 'tom';
                                                        case 1:
                                                            return 'jon';
                                                        case 2:
                                                            return 'tim';
                                                    }
                                                } }, 0)
                                                .set('#a', { left: 0 }, 0)
                                                .set('#b', { left: aWidth*2 }, 0)
                                                .set('#funcLabel', { opacity: 0 }, 0)
                                                .set('#a div,#b div', { backgroundColor: BLUE_COLOR, opacity: 1 }, 0)
                                                .add('#funcLabel', { y: '-10px', opacity: 1, delay: 100, duration: 1000, textContent: 'gollection.Diff(slice, otherSlice)' }, 0)
                                                .add('#b div:nth-child(3)', { duration: 0, backgroundColor: GREEN_COLOR } , 2000)
                                                .add('#a div:nth-child(-n + 2)', { duration: 0, backgroundColor: GRAY_COLOR } , 2000)
                                                .add('#a div:nth-child(-n + 2)', { opacity: 0 } , 3000)
                                                .add("#a", { duration: 300, width: aWidth*(1/3) + 12, } , 3500)
                                                .add('#a div', { duration: 300, x: aWidth*(-2/3) + 4 }, 3500)
                                                .add('#b', {opacity: 0}, 3700)
                                                .call(() => {
                                                    cleanup()
                                                    phase7 = createTimeline({onComplete: scheduleRestart})
                                                        .set('#funcLabel', { opacity: 0 }, 0)
                                                        .set('#a,#b', { top: aWidth/3, borderWidth: '5px', position: 'absolute' }, 0)
                                                        .set('#a', { left: 0, borderColor: BLUE_COLOR, zIndex: 2, x: 0, height: `${aWidth + 15}px`, width: `${aWidth * (2/3) + 15}px` }, 0)
                                                        .set('#b', { left: aWidth*2, borderColor: TRANSPARENT_COLOR, backgroundColor: TRANSPARENT_COLOR, zIndex: 3, x: -(aWidth*1.667) }, 0)
                                                        .set('#a div', { opacity: 1, y: (_, i: number) => `${((aWidth/3) * (i))}px`, x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`, backgroundColor: BLUE_COLOR}, 0)
                                                        .set('#b div', { opacity: 1, y: (_, i: number) => `${((aWidth/3) * (i))}px`, x: (_, i: number) => `-${(((aWidth/3)-2) * (i))}px`, backgroundColor: GRAY_COLOR}, 0)
                                                        .call(() => {
                                                            const cloneA = document.querySelector('#a')!.cloneNode(true) as HTMLElement
                                                            const cloneB = document.querySelector('#b')!.cloneNode(true) as HTMLElement

                                                            cloneA.id = 'clone-a'
                                                            cloneB.id = 'clone-b'

                                                            root.current?.appendChild(cloneA)
                                                            root.current?.appendChild(cloneB)

                                                            // cloneA.style.opacity = '0'
                                                            // cloneB.style.opacity = '0'
                                                            cloneA.style.position = 'absolute'
                                                            cloneB.style.position = 'absolute'

                                                            cloneA.style.y = `${aWidth/3}px`
                                                            cloneB.style.y = `${aWidth/3}px`

                                                            phase7!
                                                                .set(cloneA, { x: aWidth }, 0)
                                                                .set(cloneB, { x: aWidth * (-2/3), zIndex: 3, borderColor: TRANSPARENT_COLOR }, 0)
                                                                .set('#clone-a div', { backgroundColor: BLUE_COLOR, opacity: 1 }, 0)
                                                                .set('#clone-a div:nth-child(3)', { textContent: 'u' }, 0)
                                                                .set('#clone-b div', { zIndex: 3, backgroundColor: GRAY_COLOR, opacity: 1, textContent: (_, i:number) => {
                                                                    switch (i) {
                                                                        case 0:
                                                                            return '511';
                                                                        case 1:
                                                                            return '11';
                                                                        case 2:
                                                                            return '6';
                                                                    }
                                                                } }, 0)
                                                                    
                                                                .add('#funcLabel', { y: '-10px', opacity: 1, delay: 100, duration: 1000, endDelay: 10000, textContent: 'gollection.DiffAssoc(map, otherMap)' }, 0)
                                                                .add('#a div:nth-child(2)', { backgroundColor: GREEN_COLOR, duration: 0 }, 2000)
                                                                .add('#b div:nth-child(2)', { backgroundColor: GREEN_COLOR, duration: 0 }, 2000)
                                                                .add('#clone-a div:nth-child(2), #clone-b div:nth-child(2)', { backgroundColor: GREEN_COLOR, duration: 0 }, 2000)
                                                                .add('#clone-a, #clone-b', { opacity: 0, endDelay: 10000 }, 3000)
                                                                .add('#a div:nth-child(odd), #b div:nth-child(odd)', { opacity: 0 }, 3000)
                                                                .add('#a div:nth-child(2)', { backgroundColor: BLUE_COLOR, duration: 0 }, 3000)
                                                                .add('#b div:nth-child(2)', { backgroundColor: GRAY_COLOR, duration: 0 }, 3000)
                                                                .add('#a div:nth-child(2),#b div:nth-child(2)', { y: 0, duration: 500 }, 3000)
                                                                .add('#a', { height: aWidth*(1/3) + 15, duration: 500 }, 3000)
                                                            
                                                        })
                                                        .play() // phase7.play();
                                                }, 5000)
                                                .play() // phase6.play();
                                        }, 4500)
                                        .play()  // phase5.play();
                                    }, 6000)
                                    .play() // phase4.play();
                            })
                            .play() // phase3.play();
                    }, 3000)
                    .play() // phase2.play();
                }, 3500)
                .play() // phase1.play();
        };

        runSequence();

        return () => {
            cancelled = true;
            clearTimeout(loopTimeout);
            cleanup();
        };
    }, [viewportWidth]);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4 px-6">
                <div className="relative">
                    <div ref={root} className=" max-h-[33vh] h-80 w-full md:w-2/3 xl:w-2/5 absolute top-10 md:top-30 lg:top-40 right-0 md:right-10 lg:right-0 z-10">
                        <span className="absolute top-0 left-0 font-mono text-xs md:text-base text-muted-foreground border py-2 px-4 rounded-md" ref={funcLabel} id="funcLabel"></span>
                        <Collection id="a" items={['id','age','n']} />
                        <Collection id="b" items={[511,21,6]} />
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-semibold uppercase mt-[35vh] md:mt-[30vh] tracking-wide font-brand z-50 relative">
                        Gollection
                        <span className="text-base  ml-3 lowercase">v1.0</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-muted-foreground lg:ml-2 md:max-w-[50vw] z-50 relative font-sans">
                       A simple Golang library that provides convenient helpers to work with collections of data.
                    </p>
                    <div className="flex gap-4.5 mt-6 z-50 relative">
                       <Button className="border-2 border-transparent cursor-pointer font-semibold text-white transition-colors duration-300" onClick={() => router.visit(docs())} size="lg">Read the Docs</Button>
                       <Button className="border-2 cursor-pointer hover:border-primary font-semibold hover:text-primary dark:hover:text-white hover:bg-transparent transition-colors duration-300" onClick={() => window.location.href = 'https://github.com/xeqtionr/gollection'} variant="outline" size="lg">View on GitHub</Button>
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
                items.map(item => (
                    <div style={{ opacity: 0 }} className="size-7 md:size-10 lg:size-12 rounded bg-[#2369d9] flex text-white  items-center justify-center shrink-0 text-sm font-medium text-center">
                        {item}
                    </div>
                ))
            }
        </div>
    )
}

Dashboard.layout = {
    breadcrumbs: [],
};
