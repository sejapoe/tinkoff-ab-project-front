import React, {useState} from 'react';
import clsx from "clsx";
import {useCurrentUser} from "../../auth/model";
import {usePostHistory} from "../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";


type HistoryProps = {
    id: number;
    show: boolean;
    close: () => void;
};

export const History = ({id, show, close}: HistoryProps) => {
    const {data: postHistory} = usePostHistory(id)

    return (
        show && postHistory ?
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30">
                <div className="relative bg-white p-2 rounded">
                    <div className="absolute right-2 top-2"><FontAwesomeIcon className="cursor-pointer text-2xl"
                                                                             icon={solid("xmark")}
                                                                             onClick={close}/></div>
                    <div className="bg-white px-8 py-4 flex flex-col rounded">
                        <table className="table-auto">
                            <tbody>
                                {postHistory.map(value => (
                                    <tr>
                                        <td>{value.text}</td>
                                        <td className="w-4"/>
                                        <td>{new Date(value.updatedAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div> : null
    );
};

type EditedProps = {
    id: number;
    updateAt: string;
};

export const Edited = ({id, updateAt}: EditedProps) => {
    const [showHistory, setShowHistory] = useState(false)
    const user = useCurrentUser()

    return (
        <>
            {user?.roles.includes("ROLE_MODERATOR") &&
                <History id={id} show={showHistory} close={() => setShowHistory(false)}/>
            }
            <span className={clsx(
                "ml-2 text-xs italic",
                user?.roles.includes("ROLE_MODERATOR") && "text-red-600 hover:text-red-700 cursor-pointer"
            )}
                  onClick={() => {
                      if (user?.roles.includes("ROLE_MODERATOR")) {
                          setShowHistory(true)
                      }
                  }}
                  title={new Date(updateAt).toLocaleString()}>(ред.)</span>
        </>
    );
};