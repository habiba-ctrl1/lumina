import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  alternateLinks: false
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
