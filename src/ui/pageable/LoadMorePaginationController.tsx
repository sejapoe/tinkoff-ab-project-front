import Pageable from "./Pageable";

type LoadMorePaginationControllerProps = {
    totalPages: number;
    step: number;
}


export const LoadMorePaginationController = ({totalPages, step}: LoadMorePaginationControllerProps) => {
    return <Pageable.PaginationController>
        {({selectPageSize, pageSize}) => (
            <button disabled={totalPages <= 1} className="text-blue-700 disabled:hidden cursor-pointer" onClick={() => {
                selectPageSize(pageSize + step)
            }}>
                Load more
            </button>
        )}
    </Pageable.PaginationController>
}