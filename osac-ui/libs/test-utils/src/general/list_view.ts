import { type Page, expect } from '@playwright/test';

import { ViewSwitcher } from '../../../locators/view_switcher';

/**
 * Switch a redesigned list page to its list view, which holds the table the
 * row helpers read. The pages open in card view by default.
 */
export const selectListView = async (page: Page): Promise<void> => {
  const listView = page.locator(...ViewSwitcher.listView);
  await expect(listView).toBeVisible();
  if ((await listView.getAttribute('aria-pressed')) !== 'true') {
    await listView.click();
  }
  await expect(listView).toHaveAttribute('aria-pressed', 'true');
};
