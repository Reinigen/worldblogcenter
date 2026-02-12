'use client'



const PageItem = ({page, pageNumbers, totalPages, onPageClick}:{page:number, totalPages:number, pageNumbers: number[], onPageClick: (page: number) => void}) => {
  return (
    <>
      {
        pageNumbers.length <= 1 
        ? "All Posts Visible":
        <ul className="justify-center pagination">
            <li className={`page-item ${page - 1 <= 0? "disabled": ""}`}>
                <a className="page-link" href="#" aria-label="Previous"
                  onClick={(e) => { e.preventDefault(); onPageClick(page - 1) }}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            {pageNumbers.map((num) => (
                <li className="page-item" key={num}>
                    <a className="page-link" href="#"
                      onClick={(e) => { e.preventDefault(); onPageClick(num) }}>
                      {num + 1}
                    </a>
                </li>
            ))}

            <li className={`page-item ${page + 1 >= totalPages||page - 1 <= 0? "disabled": ""}`}>
                <a className="page-link" href="#" aria-label="Next"
                  onClick={(e) => { e.preventDefault(); onPageClick(page + 1) }}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
      }
    </>
    

  )
}

export default PageItem
