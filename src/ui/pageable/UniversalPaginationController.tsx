import Pageable from "./Pageable";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";

type PaginationArrowProps = {
    icon: IconProp;
    enabled: boolean;
    fn: () => void;
}

const PaginationArrow = ({icon, enabled, fn}: PaginationArrowProps) =>
    <FontAwesomeIcon icon={icon} className={
        clsx(enabled
            ? "text-gray-900 cursor-pointer"
            : "text-gray-400 cursor-not-allowed")
    } onClick={enabled ? fn : undefined}/>;

type UniversalPaginationControllerProps = {
    totalPages: number;
}


export const UniversalPaginationController = ({totalPages}: UniversalPaginationControllerProps) => {
    return <Pageable.PaginationController>
        {({page, next, prev, selectPage}) => (
            <div className="text-gray-900 space-x-4">
                <PaginationArrow icon={solid("angles-left")}
                                 enabled={page > 0} fn={() => selectPage(0)}/>
                <PaginationArrow icon={solid("angle-left")}
                                 enabled={page > 0} fn={prev}/>
                <span>{page + 1} / {totalPages !== 0 ? totalPages : 1}</span>
                <PaginationArrow icon={solid("angle-right")}
                                 enabled={page < totalPages - 1} fn={next}/>
                <PaginationArrow icon={solid("angles-right")}
                                 enabled={page < totalPages - 1}
                                 fn={() => selectPage(totalPages - 1)}/>
            </div>
        )}
    </Pageable.PaginationController>
}