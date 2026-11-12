// Card/List toggle shared by the redesigned list pages (ViewSwitcher).
export const ViewSwitcher = {
  listView: ['[id="list-view"]'],
} as const satisfies Record<string, readonly [selector: string]>;
