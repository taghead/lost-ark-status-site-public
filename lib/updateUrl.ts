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
