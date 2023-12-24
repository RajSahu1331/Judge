import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout, setName } from '../../slices/authSlice';
import ContactMe from '../Editor/ContactMe';
import codifyFavicon from '../../../codify.png';
const Navbar = () => {
    const { userInfo, name } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            localStorage.removeItem('jwtToken');
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userInfo && userInfo.email) {
                    const response = await fetch(`http://localhost:8000/api/user/${userInfo.email}`);
                    const userData = await response.json();
                    console.log(userData);
                    dispatch(setName(userData));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userInfo) {
            fetchUserData();
        }
    }, [userInfo, dispatch]);

    const openMail = () => {
        window.location.href = `mailto:rajsahu1331@gmail.com?subject=Codify`;
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
                {/* Add Codify.png as favicon */}
                <img src={codifyFavicon} alt="Codify Favicon" className="h-6 w-6 mr-2" />

                {/* Codify text */}
                <Link to="/home" className="text-white text-xl font-bold">
                    Codify
                </Link>
            </div>
            <div className="flex items-center flex-1 justify-center">
                {name && (
                    <div className="text-white text-lg font-semibold">
                        {name}
                    </div>
                )}
            </div>
            <div className="flex items-center">
                {/* Add other navbar items */}
                <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded mr-4" onClick={openMail}>
                    Contact Me
                </button>
                <button className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded" onClick={logoutHandler}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
