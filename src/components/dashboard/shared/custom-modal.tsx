"use client";

// Provider
import { useModal } from "@/providers/modal-provider";

// UI components
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

type Props = {
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  maxWidth?: string;
};

const CustomModal = ({ children, defaultOpen, subheading, heading, maxWidth }: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent
        className={cn(
          "h-screen overflow-y-scroll !bg-white !text-black",
          "dark:bg-black dark:text-white",
          "md:h-fit md:max-h-[700px]",
          maxWidth,
        )}
      >
        <DialogHeader className="pt-8 text-left">
          {/* Always provide a DialogTitle for accessibility. If no visible heading is passed,
              render a visually-hidden title so screen readers still announce the dialog. */}
          {heading ? (
            <DialogTitle className="text-2xl font-bold">{heading}</DialogTitle>
          ) : (
            <VisuallyHidden>
              {/* Provide a meaningful default title for screen reader users. You can change this
                  text to something more specific if you know the modal's purpose. */}
              <DialogTitle>Dialog</DialogTitle>
            </VisuallyHidden>
          )}

          {subheading && <DialogDescription>{subheading}</DialogDescription>}

          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
