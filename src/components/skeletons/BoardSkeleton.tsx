import { ListSkeleton } from './ListSkeleton'

function BoardSkeleton() {
  return (
    // <>
    //   <button>Add list</button>
    //   <div>
    //     <div>
    //       <section className="h-full relative min-h-screen rounded-2xl p-12 bg-dark-white  dark:bg-light-gray flex gap-12">
    //         {Array(2)
    //           .fill(0)
    //           .map((_, i) => (
    //             <ListSkeleton key={i} />
    //           ))}
    //       </section>
    //     </div>
    //   </div>
    // </>
    <div className="flex flex-col w-full pr-8 gap-4 overflow-hidden">
      <div className="w-full min-h-[6rem]">
        <button>Add list</button>
      </div>
      <section className="w-full h-[calc(100vh-10rem)] p-8 grid gap-8 bg-light-gray rounded-3xl mr-16">
        <div>
          <h2 className="text-4xl font-bold ">Board title</h2>
        </div>
        <section className="h-[calc(100vh-18rem)] flex rounded-2xl">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <ListSkeleton key={i} />
            ))}
        </section>
      </section>
    </div>
  )
}
export { BoardSkeleton }
