"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect, type ReactNode, type CSSProperties } from "react";

const CAL_LINK = "nabeelbarqawi/30min";
const CAL_NS = "booking";

/**
 * Call this from anywhere to open the Cal.com booking modal programmatically.
 * e.g. import { openBookingModal } from "@/components/CalBookingButton";
 */
export async function openBookingModal() {
  const cal = await getCalApi({ namespace: CAL_NS });
  cal("modal", { calLink: CAL_LINK });
}

interface CalBookingButtonProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CalBookingButton({ children, className, style }: CalBookingButtonProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NS });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NS}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={className}
      style={style}
    >
      {children ?? "Book time with me"}
    </button>
  );
}
