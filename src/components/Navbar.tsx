import { Avatar } from './Avatar'
import { genUUID } from '@/utils/genUUID'
import { NavbarLinks } from '@/components/NavbarLinks'

export function Navbar() {
  return (
    <nav className="w-full grid grid-rows-10">
      <header className="grid place-content-center">
        <h2 className="text-xl font-bold">Trello</h2>
      </header>

      <ul className="row-span-8 grid place-content-center gap-8 ">
        <NavbarLinks />
      </ul>
      <footer className="grid justify-center">
        <div className="aspect-square grid place-content-center bg-neutral-200 rounded-full border-2 border-transparent hover:border-blue-500">
          <Avatar username={genUUID()} width={48} height={48} />
        </div>
      </footer>
    </nav>
  )
}
