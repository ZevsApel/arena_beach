import { useEffect } from "react";

const useOutsideClick = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
    useEffect(() => {
        const listener = (e: MouseEvent | TouchEvent) => {
        const el = ref?.current;
        if (!el) return;
        if (e.target && el.contains(e.target as Node)) return;
        handler();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
        };
  }, [ref, handler]);
}

export default useOutsideClick;