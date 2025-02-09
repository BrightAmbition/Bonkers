import { useState, useEffect } from "react";
import api from "../utils/api";
import { connect } from "react-redux";
import { withDraw, loadUser } from '../actions/user';
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const Withdraw = ({ auth, withDraw, loadUser }) => {


    const [users, setUsers] = useState([])
    const fetchScoreData = async () => {
        const res = await api.get('/users/all');
        console.log(res.data);
        setUsers(res.data);
    }
    useEffect(() => {
        fetchScoreData();
    }, [])
    if (auth.isAuthenticated == false) {
        return <Navigate to="/signup" />
    }
    else if (auth.isAuthenticated == undefined) {
        return <>Loading</>
    }
    return (<>
        <div id="score-board" className="w-3/4 md:w-2/3 lg:w-1/2 m-auto py-20">

            <div className="rounded-[50px] bg-[#361728cc] p-10">
                <div id="score-title" className="text-center text-[32px] md:text-[40px] sm:text-[50px] text-orange-300 my-5">
                    With Draw your Bonkers!
                </div>

                <div>
                    <table className="w-full text-center">
                        <thead className="sm:text-[26px] text-[16px] text-[#b5eeff] border-b">
                            <tr>
                                <th className="hidden sm:inline sm:mr-5">Rank</th>
                                <th className="hidden sm:inline">Name</th>
                                <th >Score</th>
                                {/* <th >Earn</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-[22px] text-gray-400 sm:text-[36px] md:text-[40px] lg:text-[48px]">
                            {
                                auth.user &&
                                users.map((user, index) => {
                                    if (user._id == auth.user._id)
                                        return <tr key={index} className={index == 0 ? "text-[#dfff00]" : ""}
                                        >
                                            <td className="hidden sm:inline sm:mr-5">{index + 1}</td>
                                            <td className="hidden sm:inline">{user.name}</td>
                                            {/* <td>{user.score}</td> */}
                                            <td>{user.earn}</td>
                                        </tr>
                                })
                            }

                        </tbody>
                    </table>
                    <div className="text-[20px] text-[#128921] text-center mt-10">With draw your Bonkers!</div>
                    <div className="w-full flex justify-center">
                        <button className="bg-blue-600 rounded-lg px-5 py-2 mt-5 text-gray-200" onClick={async () => {
                            let score = 0;
                            users.forEach((user, index) => {
                                if (user._id == auth.user._id)
                                    score = user.score;
                            })


                            if (auth.user.earn == true)
                                toast.error("You already withdraw");
                            else {
                                toast.warning("Please wait while withdrawing");
                                await withDraw();
                                toast.success("You withdraw successfully!");
                            }

                        }}> withdraw</button>
                    </div>
                </div>
            </div>


        </div>

    </>);
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    alerts: state.alert,
});
export default connect(mapStateToProps, { withDraw, loadUser })(Withdraw);