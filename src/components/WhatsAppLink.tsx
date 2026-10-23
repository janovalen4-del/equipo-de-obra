"use client";

import type { MouseEvent, MouseEventHandler, ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  message: string;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
};

export function WhatsAppLink({
  message,
  className,
  ariaLabel,
  onClick,
  children,
}: WhatsAppLinkProps) {
  const url = buildWhatsAppUrl(message);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!url) {
      event.preventDefault();
      document
        .querySelector("#contacto")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={url ?? "#contacto"}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
