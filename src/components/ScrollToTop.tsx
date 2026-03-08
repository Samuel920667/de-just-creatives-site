"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Forces the window to scroll to the top immediately whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}