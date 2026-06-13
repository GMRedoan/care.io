"use client";

import { motion } from "framer-motion";

const animations = {
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },

    fadeUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    },

    fadeDown: {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
    },

    fadeLeft: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },

    fadeRight: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },

    pageSwitch: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
     },

    zoom: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
};

export default function Animate({
    children,
    type = "fadeUp",
    delay = 0,
    duration = 0.4,
    className = "",
    once = true,
}) {
    return (
        <motion.div
            className={className}
            variants={animations[type]}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{
                once,
                amount: 0.2,
            }}
            transition={{
                duration,
                delay,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}