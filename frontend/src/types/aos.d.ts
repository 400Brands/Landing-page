declare module "aos" {
  interface AosOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    disable?: "phone" | "tablet" | "mobile" | (() => boolean);
    startEvent?: string;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    debounceDelay?: number;
    throttleDelay?: number;
  }

  export function init(options?: AosOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;
  export function destroy(): void;

  const aos: {
    init: typeof init;
    refresh: typeof refresh;
    refreshHard: typeof refreshHard;
    destroy: typeof destroy;
  };

  export default aos;
}
