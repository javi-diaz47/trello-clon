function Board({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="w-full h-full min-h-screen rounded-2xl p-12 bg-dark-white  dark:bg-light-gray
      flex gap-12
   ">
      {children}
    </section>
  )
}

export { Board }
