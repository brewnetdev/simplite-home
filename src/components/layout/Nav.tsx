'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();

  const locale = pathname.startsWith('/en') ? 'en' : 'ko';
  const pathWithoutLocale = pathname.replace(/^\/(ko|en)/, '') || '/';

  const switchLocale = (newLocale: string) => {
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const isActive = (path: string) => {
    const current = pathWithoutLocale;
    if (path === '/tika') return current.startsWith('/tika');
    if (path === '/markflow') return current.startsWith('/markflow');
    if (path === '/contact') return current.startsWith('/contact');
    return false;
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <Image src="/assets/simplite-logo-nav.svg" alt="Simplite" width={360} height={100} style={{ height: 60, width: 'auto' }} priority />
        </Link>
        <div className="nav-links">
          <Link href="/#products">{t('products')}</Link>
          <Link href="/tika" className={isActive('/tika') ? 'active' : ''}>
            {t('tika')}
          </Link>
          <Link href="/markflow" className={isActive('/markflow') ? 'active' : ''}>
            {t('markflow')}
          </Link>
          <Link href="/#enterprise">{t('enterprise')}</Link>
          <Link href="/#pricing">{t('pricing')}</Link>
          <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>
            {t('contact')}
          </Link>
        </div>
        <div className="nav-cta">
          <div className="lang-toggle">
            <button
              className={locale === 'ko' ? 'active' : ''}
              onClick={() => switchLocale('ko')}
            >
              KO
            </button>
            <button
              className={locale === 'en' ? 'active' : ''}
              onClick={() => switchLocale('en')}
            >
              EN
            </button>
          </div>
          <a
            href="https://github.com/claude-code-expert"
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            {t('github')}
          </a>
        </div>
      </div>
    </nav>
  );
}
