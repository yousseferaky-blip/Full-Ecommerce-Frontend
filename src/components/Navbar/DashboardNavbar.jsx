import { FaBarsProgress } from "react-icons/fa6";
import img from "../../assets/images/logo.83ad3901.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../assets/url";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const DashboardNavbar = ({ active, setActive }) => {
const {setUser} = useContext(userContext)
  const navigate = useNavigate()

    const handleLogOut = async ()=>{
        try{
            await axios.get(`${BASE_URL}/user/logout`)
            setUser(null)
            navigate("/signin")
            toast.success("Logged Out Successfully")
        }catch(err){
            console.log(err)
        }
    }

  return (
    <nav className="flex justify-between items-center px-4 md:px-[4vw] lg:px-[5vw] py-[1rem] border-b border-gray-300">
      <div className="flex items-center gap-6">
        <img src={img} alt="logo" loading="lazy" className="hidden sm:flex" />
        
        <FaBarsProgress
          onClick={() => setActive(!active)}
          className={`${active && "rotate-90" } transform cursor-pointer text-gray-500 hover:text-gray-900`}
        />
      </div>
      <div className="flex items-center gap-6">
        <Link className="text-xl hover:text-gray-900 text-gray-500" to={"/"}>
          Home
        </Link>
        <button onClick={handleLogOut} className="bg-[#4B5563] text-white px-2 py-1 rounded-sm cursor-pointer">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
