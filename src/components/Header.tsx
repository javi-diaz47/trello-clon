import { ThemeSwitch } from './ThemeSwitch'

export function Header() {
  return (
    <header className="min-h-[6rem] flex items-center justify-between">
      <div className="">
        <h2 className="text-2xl font-bold">Trello Clon</h2>
      </div>
      <ThemeSwitch />
    </header>
  )
}
