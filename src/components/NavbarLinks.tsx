'use client'
import { FolderIcon } from '@/icons/FolderIcon'
import { GraphIcon } from '@/icons/GraphIcon'
import { HomeIcon } from '@/icons/HomeIcon'
import { SettingsIcon } from '@/icons/SettingsIcon'
import { UsersIcon } from '@/icons/UsersIcon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarLink {
  href: string
  icon: (isActive: boolean) => React.ReactNode
}

const NAVBAR_LINKS: NavbarLink[] = [
  {
    href: '/',
    icon: (isActive: boolean) => <HomeIcon isActive={isActive} />,
  },
  {
    href: '/stats',
    icon: (isActive: boolean) => <GraphIcon isActive={isActive} />,
  },
  {
    href: '/archive',
    icon: (isActive: boolean) => <FolderIcon isActive={isActive} />,
  },
  {
    href: '/users',
    icon: (isActive: boolean) => <UsersIcon isActive={isActive} />,
  },
  {
    href: '/settings',
    icon: (isActive: boolean) => <SettingsIcon isActive={isActive} />,
  },
]

export const NavbarLinks = () => {
  const path = usePathname()
  return (
    <>
      {NAVBAR_LINKS.map(({ href, icon }, i) => {
        let isActive = false

        if (href !== '/') {
          isActive = path.startsWith(href)
        }

        // if URL: / or /boards then the home icon should be highlighted
        if ((href === '/' && path.startsWith('/boards')) || path === href) {
          isActive = true
        }

        return (
          <li key={`${href}-${i}`}>
            <Link href={href}>{icon(isActive)}</Link>
          </li>
        )
      })}
    </>
  )
}
