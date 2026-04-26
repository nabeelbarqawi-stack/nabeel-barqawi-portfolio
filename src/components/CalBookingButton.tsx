"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect, type ReactNode, type CSSProperties } from "react";

const CAL_LINK = "nabeel-barqawi-fm0wzq";
const CAL_NS = "booking";

// Module-level promise so the embed script is only loaded once
// regardless of how many CalBookingButton instances are on the page.
let _calPromise: ReturnType<typeof getCalApi> | null = null;
function loadCal() {
  if (!_calPromise) {
    _calPromise = getCalApi({ namespace: CAL_NS });
  }
  return _calPromise;
}

/**
 * Open the Cal.com booking modal from anywhere:
 *   import { openBookingModal } from "@/components/CalBookingButton";
 *   openBookingModal();
 */
export async function openBookingModal() {
  const cal = await loadCal();
  cal("modal", { calLink: CAL_LINK });
}

interface CalBookingButtonProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CalBookingButton({
  children,
  className,
  style,
}: CalBookingButtonProps) {
  // Initialise the embed script on mount so it's ready before the user clicks.
  useEffect(() => {
    loadCal().then((cal) => {
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    });
  }, []);

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={openBookingModal}
    >
      {children ?? "Book time with me"}
    </button>
  );
}
