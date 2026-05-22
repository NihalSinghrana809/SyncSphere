import { useNavigate } from 'react-router-dom';
import BorderGlow from '../Templates/Border1';

export const Login_Card = () => {
      const navigate = useNavigate();
      return (
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-full bg-[#0D0429] text-white p-10">
                  <BorderGlow
                        edgeSensitivity={30}
                        glowColor="40 80 80"
                        backgroundColor="#120F17"
                        borderRadius={28}
                        glowRadius={40}
                        glowIntensity={1}
                        coneSpread={25}
                        animated={false}
                        colors={['#c084fc', '#f472b6', '#38bdf8']}
                  >
                        <div className="p-8">
                              <div className="bg-[#111827] p-8 rounded-xl shadow-lg w-full max-w-md border border-[#1f2937]">
                                    <h2 className="text-3xl font-bold text-[#b0b8ff] mb-2">Welcome Back</h2>
                                    <p className="text-gray-400 mb-6">
                                          Enter your credentials to access your dashboard.
                                    </p>

                                    {/* Email Field */}
                                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                                          EMAIL ADDRESS
                                    </label>
                                    <input
                                          type="email"
                                          placeholder="name@gmail.com"
                                          className="w-full bg-[#1f2937] text-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                    />

                                    {/* Password Field */}
                                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                                          PASSWORD
                                    </label>
                                    <input
                                          type="password"
                                          placeholder="••••••••"
                                          className="w-full bg-[#1f2937] text-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                                    />

                                    {/* Options */}
                                    <div className="flex items-center justify-between text-sm mb-6">
                                          <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="accent-[#6366f1]" />
                                                <span className="text-gray-400">Remember Me</span>
                                          </label>
                                          <a href="#" className="text-[#b0b8ff] hover:underline">
                                                Forgot Password?
                                          </a>
                                    </div>

                                    {/* Login Button */}
                                    <button onClick={() => navigate("/")} className="w-full bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white font-semibold py-2 rounded-md hover:opacity-90 transition">
                                          LOGIN TO DASHBOARD
                                    </button>

                                    {/* Footer */}
                                    <p className="text-center text-sm text-gray-400 mt-6">
                                          Don’t have an account?{" "}
                                          <button
                                                onClick={() => navigate("/signup")}
                                                className="text-[#b0b8ff] font-semibold hover:underline"
                                          >
                                                Sign Up
                                          </button>
                                    </p>
                              </div>
                        </div>
                  </BorderGlow>
            </div>
      )
}

export default Login_Card;
