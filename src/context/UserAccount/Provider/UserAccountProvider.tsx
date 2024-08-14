import { ReactNode, useCallback, useEffect, useState } from "react";
import { UserAccount, UserAccountContext } from "../UserAccountContext";
import { getUserList } from "../../../db/UserList";

export default function UserAccountProvider({
    children,
}: {
    children?: ReactNode;
}) {
    const [UserList, setUserList] = useState<UserAccount[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState<UserAccount | undefined>(undefined);
    const [userSelected, setUserSelected] = useState(-1);

    const setUserNext = useCallback(
        (selected: number) => {
            if (selected >= 0) {
                setUser(UserList[selected]);
                localStorage.setItem("profile_index", selected.toString());
            }
        },
        [UserList]
    );

    useEffect(() => {
        getUserList().then((data) => {
            if (data) {
                setUserList(data);
            }
        });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const index_string = localStorage.getItem("profile_index");
            if (index_string) {
                try {
                    const index = parseInt(index_string);
                    setUserNext(index);
                } catch (error) {
                    console.error(error);
                }
            }
            setModalVisible(true);
        });

        return () => clearTimeout(timeout);
    }, [setUserNext]);

    const logout = useCallback(() => {
        localStorage.removeItem("profile_index");
        setUser(undefined);
    }, []);

    return (
        <UserAccountContext.Provider
            value={{ UserAccount: [user, logout], UserList }}
        >
            <>
                {!user && modalVisible ? (
                    <div className="w-screen h-screen z-50 flex items-center justify-center bg-base-100">
                        <div className="card w-full max-w-xs md:max-w-sm bg-neutral text-neutral-content shadow-lg">
                            <div className="card-body">
                                {UserList.length > 0 ? (
                                    <>
                                        <h2 className="card-title self-center font-playlist text-7xl font-extralight">
                                            Welcome
                                        </h2>
                                        <div className="flex flex-col space-y-1.5 text-lg mt-4">
                                            <label
                                                className="text-lg"
                                                htmlFor="name"
                                            >
                                                You are:
                                            </label>
                                            <select
                                                className="select select-primary text-primary-content select-bordered select-lg w-full max-w-xs"
                                                id="framework"
                                                value={userSelected.toString()}
                                                onChange={(e) => {
                                                    const index = parseInt(
                                                        e.target.value
                                                    );
                                                    setUserSelected(index);
                                                }}
                                            >
                                                <option
                                                    className="text-gray-500"
                                                    value={-1}
                                                >
                                                    Select a Name
                                                </option>
                                                {UserList.map(
                                                    (profile, index) => (
                                                        <option
                                                            key={profile.name}
                                                            className="text-xl"
                                                            value={index.toString()}
                                                        >
                                                            {profile.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div className="card-actions mt-4">
                                            <button
                                                className="btn btn-primary text-primary-content w-full rounded-full"
                                                onClick={() => {
                                                    setUserNext(userSelected);
                                                }}
                                                disabled={userSelected < 0}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-center gap-5 my-24">
                                        <span className="loading loading-spinner loading-lg text-primary scale-150"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    children
                )}
            </>
        </UserAccountContext.Provider>
    );
}
