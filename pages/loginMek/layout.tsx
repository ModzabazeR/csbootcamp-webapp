export default function layout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div>
        this is layout
        fawe fijaw'jfpw
      </div>
      {children}
    </div>
  )
}