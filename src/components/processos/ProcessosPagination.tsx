
import ReactPaginate from "react-paginate";

interface ProcessosPaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const ProcessosPagination = ({ pageCount, onPageChange }: ProcessosPaginationProps) => (
  <div className="flex justify-center mt-4">
    <ReactPaginate
      previousLabel={"Anterior"}
      nextLabel={"Próxima"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName={"flex gap-2"}
      activeClassName={"font-bold underline"}
      pageClassName={"px-2"}
      previousClassName={"px-2"}
      nextClassName={"px-2"}
      breakClassName={"px-2"}
    />
  </div>
);

export default ProcessosPagination;
