import { NavbarIcon } from '@/types/app'
import { navbarIconStyle } from '@/utils/constant'

export function FolderIcon({ isActive }: NavbarIcon) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={navbarIconStyle(isActive)}>
      <path
        d="M2 6.95l.069-1.691a4 4 0 0 1 3.189-3.189C5.626 2 6.067 2 6.95 2l.766.017a4 4 0 0 1 2.18.903c.144.119.28.256.554.529L11 4c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .848.351C14.098 6 14.675 6 15.828 6h.374c2.632 0 3.948 0 4.804.769.079.071.154.146.224.224.77.856.77 2.172.77 4.804V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14V6.95z"
        fill="inherit"
      />
      <path
        fillRule="evenodd"
        d="M12.25 10a.75.75 0 0 1 .75-.75h5a.75.75 0 1 1 0 1.5h-5a.75.75 0 0 1-.75-.75z"
        fill="transparent"
      />
      <path
        d="M16.986 3.021C16.832 3 16.649 3 16.284 3H12l.37.383c.666.69.922.947 1.218 1.118a2.51 2.51 0 0 0 .543.233c.325.096.682.102 1.624.102h.334l2.45.083L19 5c-.186-1.037-.996-1.84-2.014-1.979z"
        fill="inherit"
      />
    </svg>
  )
}
