import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animatePageIn = (element) => {
    if (element) {
        gsap.fromTo(
            element,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }
};

export const animateStagger = (elements, delay = 0) => {
    if (elements && elements.length > 0) {
        gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elements[0],
                    start: "top 85%",
                },
            }
        );
    }
};

export const animateHero = (title, subtitle, button, image) => {
    const tl = gsap.timeline();

    tl.fromTo(
        title,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );

    if (subtitle) {
        tl.fromTo(
            subtitle,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
        );
    }

    if (button) {
        tl.fromTo(
            button,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
            "-=0.4"
        );
    }

    if (image) {
        tl.fromTo(
            image,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
            "-=0.8"
        );
    }
};

export const animateCartSlideIn = (cartElement) => {
    if (cartElement) {
        gsap.fromTo(
            cartElement,
            { x: "100%" },
            { x: "0%", duration: 0.5, ease: "power3.inOut" }
        );
    }
};

export const animateCartSlideOut = (cartElement, onComplete) => {
    if (cartElement) {
        gsap.to(cartElement, {
            x: "100%",
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: onComplete,
        });
    }
};
