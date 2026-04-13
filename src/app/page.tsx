'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

export default function Home() {
  return (
    <Button variant="destructive" onClick={() => toast.success('Hello world')}>Click me</Button>
  );
}
