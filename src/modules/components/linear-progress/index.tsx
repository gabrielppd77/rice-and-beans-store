import clsx from "clsx";

interface LinearProgressProps {
  active?: boolean;
}

export function LinearProgress({ active = true }: LinearProgressProps) {
  return (
    <div className={clsx("w-full", !active && "invisible")}>
      <div className="h-1 w-full overflow-hidden rounded bg-red-400">
        <div className="animate-progress h-full w-full origin-left bg-red-500"></div>
      </div>
    </div>
  );
}
