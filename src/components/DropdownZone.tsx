import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

export default function DropdownZone(props: {
  header: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
  open?: boolean;
  disabled?: boolean;
  textMode?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(props.open ?? false);

  const caretIcon = isOpen ? (
    <FaCaretUp size={24} color="primary-500" />
  ) : (
    <FaCaretDown size={24} color="primary-500" />
  );

  const expandButton = (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      disabled={props.disabled}
    >
      {caretIcon}
    </button>
  );

  return (
    <div
      className={cn({
        "my-5 w-full gap-4 rounded": true,
        "border border-gray-500": isOpen && !props.textMode,
      })}
    >
      <div
        className={cn({
          "flex w-full items-center justify-between gap-3 rounded font-outfit-regular text-sm":
            true,
          "bg-gray-200": !isOpen && !props.textMode,
          "hover:border hover:border-gray-500 hover:bg-gray-100":
            !isOpen && !props.textMode,
          "p-3": !props.textMode,
        })}
      >
        {!props.textMode ? expandButton : null}
        <div className="text-black font-semibold text-md">{props.header}</div>
        {props.textMode ? (
          <div className="flex items-center gap-2">
            {props.actions}
            {expandButton}
          </div>
        ) : null}
      </div>
      <div
        className={cn({
          "overflow-auto transition-all ease-linear": true,
          "max-h-[720px] p-3": isOpen,
          "max-h-0": !isOpen,
        })}
      >
        {props.content}
      </div>
    </div>
  );
}
