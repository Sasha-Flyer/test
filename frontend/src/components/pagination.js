export const PaginationComponent = ({currentPage, setPages, isLast}) => {

  function prev() {
    if (currentPage > 1) return (<div onClick={() => {setPages(currentPage-1)}}> <a href={"#"}>← предыдущая</a></div>)
  }

  function next() {
    if (!isLast) return (<div onClick={() => {setPages(currentPage+1)}}> <a href={"#"}>следующая →</a></div>)
  }

  function beginning() {
    if (currentPage > 2) return (<div onClick={() => {setPages(1)}}> <a href={"#"}>В начало</a></div>)
  }

  return (
    <div className={"pages"}>
      {beginning()}
      {prev()}
      <div>{currentPage}</div>
      {next()}
    </div>
  )
}
