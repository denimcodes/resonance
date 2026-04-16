"use client";

import { TRPCReactProvider } from "@/trpc/client";
import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ClerkProvider>
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </ClerkProvider>
    );
}