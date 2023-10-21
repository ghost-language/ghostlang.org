export function Navigation({ navigation }) {
  return (
    <>
      {Object.keys(navigation.links).map((section, idx) => (
        <div key={idx} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {section}
          </h4>

          <div className="grid grid-flow-row auto-rows-max text-sm">
            {Object.keys(navigation.links[section]).map((name, idx) => {
              const slug = navigation.links[section][name]

              return <Link key={idx} href={`${slug}`} className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground">{name}</Link>
            })}
          </div>
        </div>
      ))}
    </>
  )
}