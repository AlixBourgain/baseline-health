"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({ trigger, title, description, children, className }: { trigger: React.ReactNode; title: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={trigger as React.ReactElement} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] transition-opacity" />
        <Dialog.Popup className={cn("fixed left-1/2 top-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl outline-none", className)}>
          <div className="pr-10">
            <Dialog.Title className="text-xl font-semibold tracking-tight">{title}</Dialog.Title>
            {description ? <Dialog.Description className="mt-2 text-sm leading-6 text-neutral-600">{description}</Dialog.Description> : null}
          </div>
          <Dialog.Close className="absolute right-5 top-5 rounded-full p-2 text-neutral-500 hover:bg-neutral-100" aria-label="Fermer">
            <X className="size-4" />
          </Dialog.Close>
          <div className="mt-6">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
