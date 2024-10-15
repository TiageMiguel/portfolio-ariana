"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    router.push("/");
  }, [error, router]);

  return null;
}