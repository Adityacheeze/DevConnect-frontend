import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { addUser } from "../utils/userSlice";
import SceneBackdrop from "./scene/SceneBackdrop";
import Footer from "./Footer";
import NavBar from "./NavBar";

const sceneByPath = {
  "/login": "auth",
  "/profile": "profile",
  "/connections": "network",
  "/requests": "network",
  "/delete": "danger",
};

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const isPublicRoute = location.pathname === "/login";

  useEffect(() => {
    if (userData || isPublicRoute) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (error) {
        if (error?.response?.status === 401 || error?.status === 401) navigate("/login");
        else console.error(error);
      }
    };

    fetchUser();
  }, [dispatch, isPublicRoute, navigate, userData]);

  const sceneVariant = sceneByPath[location.pathname] || "feed";

  if (!userData && !isPublicRoute) {
    return (
      <div className="relative isolate flex min-h-screen flex-col overflow-hidden text-slate-50">
        <SceneBackdrop variant={sceneVariant} />
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(5,5,11,0.34),rgba(5,5,11,0.66))]" />
        <NavBar />
        <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-20 md:pt-24">
          <div className="glass-panel max-w-md rounded-[2rem] p-8 text-center">
            <h1 className="gradient-text text-3xl font-black">Checking your session</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300/70">If your session is not active, you will be sent to login.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-slate-50">
      <SceneBackdrop variant={sceneVariant} />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(5,5,11,0.34),rgba(5,5,11,0.66))]" />
      <NavBar />
      <div className="relative z-10 flex-1 pt-20 md:pt-24 pointer-events-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
