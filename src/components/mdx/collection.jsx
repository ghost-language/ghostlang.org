export function Collection({ children }) {
  return (
    <div className="columns-3 gap-4 prose-p:my-0 prose-a:block prose-a:px-3 prose-a:py-1 prose-a:text-gray-800 prose-a:no-underline hover:prose-a:bg-gray-100 prose-a:rounded py-4">
      {children}
    </div>
  )
}