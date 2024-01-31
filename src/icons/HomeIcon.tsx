import { NavbarIcon } from '@/types/app'
import { navbarIconStyle } from '@/utils/constant'

export function HomeIcon({ isActive }: NavbarIcon) {
  return (
    <svg className={navbarIconStyle(isActive)} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M2.519 7.823C2 8.771 2 9.915 2 12.204v1.521c0 3.901 0 5.851 1.172 7.063S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212S22 17.626 22 13.725v-1.521c0-2.288 0-3.433-.519-4.381s-1.468-1.537-3.365-2.715l-2-1.241C14.111 2.622 13.108 2 12 2s-2.111.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823zM11.25 18a.75.75 0 1 0 1.5 0v-3a.75.75 0 1 0-1.5 0v3z"
        fill="inherit"
      />
    </svg>
  )
}
