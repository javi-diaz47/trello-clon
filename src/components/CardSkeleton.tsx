function CardSkeleton() {
  return (
    <li className=" w-full h-24 p-4 flex flex-col gap-2 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2  border-neutral-700">
      <div>
        <h2 className="text-xl font-bold"></h2>
        <p></p>
      </div>
    </li>
  )
}

export { CardSkeleton }
