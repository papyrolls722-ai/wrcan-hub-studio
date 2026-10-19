import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

export function SmartStartButton() {
  return (
    <Link to="/smartstart" aria-label="SmartStart" className="group flex flex-col items-center gap-2 text-center">
      <div className="smartstart-bezel w-full max-w-[9.5rem] rounded-2xl p-1.5">
        <div className="smartstart-pad relative flex aspect-square flex-col items-center justify-center rounded-xl transition-transform duration-150 group-hover:scale-[1.03] group-active:translate-y-0.5 group-active:scale-[0.98]">
          <span className="absolute top-2 text-[0.5rem] tracking-[0.2em] text-primary-foreground/80 uppercase">Button</span>
          <Star className="smartstart-engrave absolute top-6 right-5 h-4 w-4 fill-current" />
          <span className="smartstart-engrave font-display text-2xl leading-[0.9] font-bold lowercase">smart<br />start</span>
        </div>
      </div>
      <span className="text-[0.65rem] tracking-widest text-muted-foreground uppercase">Learning hub</span>
    </Link>
  );
}
