"use client";

import { ReactLenis } from "lenis/react";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return <ReactLenis root>{children}</ReactLenis>;
}
