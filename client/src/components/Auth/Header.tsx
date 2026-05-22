import { useNavigate, useLocation } from 'react-router-dom';
import icon from '../../assets/icon.png'
import TextType from '../Templates/TextType';

export const Header = () => {
      const navigate = useNavigate();
      const location = useLocation();
      return (
            <nav className="bg-[#0b0d17] text-gray-200 flex items-center justify-between px-8 h-24">
                  {/* Logo */}
                  <div className="bg-[#0b0e17] flex items-center justify-center h-full px-4">
                        <div className="flex items-center space-x-3">
                              <img
                                    src={icon}
                                    alt="Syncsphere Logo"
                                    className="h-12 w-auto"
                              />
                              <span className="text-[#9bb1ff] text-2xl font-semibold">
                                    <TextType
                                          text={["SyncSphere"]}
                                          typingSpeed={75}
                                          pauseDuration={1500}
                                          showCursor
                                          cursorCharacter="_"
                                          deletingSpeed={50}
                                          variableSpeed={{ min: 60, max: 120 }}
                                          cursorBlinkDuration={0.5}
                                    />
                              </span>
                        </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex space-x-6 text-sm font-medium">
                        <a href="#" className="hover:text-white">Home</a>
                        <a href="#" className="hover:text-white">Features</a>
                        <a href="#" className="hover:text-white">Support</a>
                  </div>

                  {/* Right Side Buttons */}
                  <div className="flex items-center gap-3">

                        {/* Login Button */}
                        <button
                              onClick={() => navigate("/login")}
                              className={`px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300
          ${location.pathname === "/login"
                                          ? "bg-[#2563eb] text-white"
                                          : "text-gray-300 hover:text-white"
                                    }
        `}
                        >
                              Login
                        </button>

                        {/* Signup Button */}
                        <button
                              onClick={() => navigate("/signup")}
                              className={`px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300

          ${location.pathname === "/signup"
                                          ? "bg-[#2563eb] text-white"
                                          : "text-gray-300 hover:text-white"
                                    }
        `}
                        >
                              Sign Up
                        </button>

                  </div>

            </nav>
      )
}

export default Header;
