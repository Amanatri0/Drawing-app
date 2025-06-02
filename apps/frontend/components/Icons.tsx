import { ReactNode } from "react";

export function Icons({
  icon,
  onclick,
  activated,
}: {
  icon: ReactNode;
  onclick: () => void;
  activated: boolean;
}) {
  return (
    <div
      className={`p-2 bg-gray-400 hover:bg-gray-600 rounded border-2  ${activated ? "text-red-500" : "text-black"} `}
      onClick={onclick}
    >
      {icon}
    </div>
  );
}
