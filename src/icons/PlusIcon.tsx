import { Icon } from '@/types/app'

function PlusIcon({ className }: Icon) {
  const DEFAULT_STYLES = 'rounded-full bg-cyan-900 bg-opacity-75 text-sky-400'

  const styles = className ? className : DEFAULT_STYLES

  return (
    <svg
      className={styles}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  )
}

export { PlusIcon }
