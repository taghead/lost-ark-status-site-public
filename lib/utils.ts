/**
 * Updates the url based on key and value pair.
 * Must pass next router as second argument.
 *
 * @example
 * import { useRouter } from "next/router";
 * const router = useRouter();
 * const states = {
 *  id: 1,
 *  search: "Zinnervale"
 * }
 * updateUrl(states, router)
 */
export function updateUrl(states: any, router: any) {
  const arrOfUrlStates = [
    { key: "id", value: states?.id || null },
    { key: "search", value: states?.search || null },
  ];

  let counter = 0;

  const url = arrOfUrlStates.map((state) => {
    if (state.value && counter === 0) {
      counter++;
      return `/?${state.key}=${state.value}`;
    }

    if (state.value) {
      return `&${state.key}=${state.value}`;
    }
  });

  router.push(url.join("") || "", undefined, {
    shallow: true,
  });
}

/**
 * Handles conversions of server statuses.
 *
 * Pass either their numeric value or status string.
 *
 */
export function convertStatus(
  status: string | number,
  options?: convertStatusOpts
) {
  const opts = {
    emoji: false,
    ...options,
  };

  const map = [
    { string: "Offline", number: 1, emoji: "❌" },
    { string: "Maintenance", number: 2, emoji: "🔨" },
    { string: "Full", number: 3, emoji: "🔴" },
    { string: "Busy", number: 4, emoji: "🟡" },
    { string: "Good", number: 5, emoji: "🟢" },
  ];

  if (typeof status === "number") {
    const res = map.find((el) => el.number === status);
    return opts.emoji ? res?.emoji : res?.string;
  }

  if (typeof status === "string") {
    const res = map.find((el) => el.string === status);
    return opts.emoji ? res?.emoji : res?.number;
  }
}

interface convertStatusOpts {
  emoji?: boolean;
}
