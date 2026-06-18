import React, { useEffect, useMemo, useState, startTransition, useRef, useLayoutEffect } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";

export default function TextStagger(props) {
    const {
        text,
        delay = 0.08,
        duration = 0.5,
        font = {},
        color = "inherit",
        variable = false,
        style,
        trigger = "inView",
        halfOpacity = false,
        className = ""
    } = props;
    const [hasAnimated, setHasAnimated] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [wrappedLines, setWrappedLines] = useState([]);
    const measureRef = useRef(null);
    const controls = useAnimationControls();
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, margin: "-50px" });

    useLayoutEffect(() => {
        if (!measureRef.current || typeof window === "undefined") return;

        const measureLines = () => {
            const element = measureRef.current;
            if (!element) return;

            const range = document.createRange();
            const textNode = element.firstChild;
            if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
               setWrappedLines([text]);
               return;
            }

            const lines = [];
            const fullText = text || "";
            let currentLine = "";
            let lastBottom = -1;

            for (let i = 0; i < fullText.length; i++) {
                range.setStart(textNode, 0);
                range.setEnd(textNode, i + 1);
                const rect = range.getBoundingClientRect();

                if (lastBottom === -1) {
                    lastBottom = rect.bottom;
                }

                if (rect.bottom > lastBottom + 2) {
                    lines.push(currentLine);
                    currentLine = fullText[i];
                    lastBottom = rect.bottom;
                } else {
                    currentLine += fullText[i];
                }
            }

            const newLines = lines.length > 0 ? lines : [fullText];
            setWrappedLines((prev) => {
                if (prev.length === newLines.length && prev.every((val, index) => val === newLines[index])) {
                    return prev;
                }
                return newLines;
            });
        };

        measureLines();
        window.addEventListener("resize", measureLines);
        return () => window.removeEventListener("resize", measureLines);
    }, [text, JSON.stringify(font), JSON.stringify(style)]);

    const shouldAnimate = useMemo(() => {
        if (trigger === "inView") return inView;
        if (trigger === "hover") return hasAnimated;
        if (trigger === "click") return clicked;
        return false;
    }, [inView, hasAnimated, clicked, trigger]);

    useEffect(() => {
        if (shouldAnimate) {
            if (!hasAnimated || trigger === 'hover' || trigger === 'click') {
                controls.start((i) => ({
                    y: 0,
                    transition: {
                        delay: i * delay,
                        duration,
                        ease: [0.44, 0, 0.34, 0.98],
                    },
                }));
                if (!hasAnimated) setHasAnimated(true);
            }
        }
    }, [controls, delay, duration, hasAnimated, shouldAnimate, trigger]);

    const handleMouseEnter = () => {
        if (trigger === "hover" && !hasAnimated)
            startTransition(() => setHasAnimated(true));
    };
    const handleClick = () => {
        if (trigger === "click" && !clicked)
            startTransition(() => setClicked(true));
    };

    return (
        <div className={className}>
            <div
                ref={measureRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                    whiteSpace: "pre-wrap",
                    width: "100%",
                    ...font
                }}
                aria-hidden="true"
            >
                {text}
            </div>

            <div
                ref={containerRef}
                style={{
                    ...style,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color,
                    ...font,
                }}
                onMouseEnter={trigger === "hover" ? handleMouseEnter : undefined}
                onClick={trigger === "click" ? handleClick : undefined}
            >
                {wrappedLines.map((line, i) => {
                    const charCountBeforeLine = wrappedLines
                        .slice(0, i)
                        .reduce((sum, l) => sum + l.length, 0);
                    const totalChars = text.length;
                    const halfPoint = totalChars / 2;

                    const lineOpacity = halfOpacity && charCountBeforeLine >= halfPoint ? 0.5 : 1;

                    return (
                        <span
                            key={i}
                            style={{
                                display: "block",
                                overflow: "hidden",
                                width: "100%",
                                marginBottom: 0,
                                lineHeight: font.lineHeight || 1.2,
                            }}
                        >
                            <motion.span
                                custom={i}
                                initial={{ y: "100%" }}
                                animate={controls}
                                style={{
                                    display: "inline-block",
                                    whiteSpace: "pre-wrap",
                                    color,
                                    opacity: lineOpacity,
                                    fontWeight: variable ? 700 : "inherit",
                                    willChange: "transform",
                                    lineHeight: font.lineHeight || 1.2,
                                }}
                            >
                                {line || " "}
                            </motion.span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
