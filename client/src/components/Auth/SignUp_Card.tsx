import { useNavigate } from 'react-router-dom';
import BorderGlow from '../Templates/Border1';

export const SignUp_Card = () => {
      const navigate = useNavigate();
      return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0b0e17] via-[#10142a] to-[#1a1440] text-white">
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
                              {/* Card */}
                              <div className="bg-[#0b0e17]/80 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
                                    {/* Header */}
                                    <h1 className="text-3xl font-bold text-[#9bb1ff] mb-2">Join the Evolution</h1>
                                    <p className="text-gray-400 mb-6">
                                          Start your high-performance fitness journey today.
                                    </p>

                                    {/* Form */}
                                    <form className="space-y-4">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                      FULL NAME
                                                </label>
                                                <input
                                                      type="text"
                                                      placeholder="Enter your full name"
                                                      className="w-full bg-[#121826] border border-gray-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-[#9bb1ff]"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                      EMAIL ADDRESS
                                                </label>
                                                <input
                                                      type="email"
                                                      placeholder="name@gmail.com"
                                                      className="w-full bg-[#121826] border border-gray-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-[#9bb1ff]"
                                                />
                                          </div>

                                          <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-1">
                                                            PASSWORD
                                                      </label>
                                                      <input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            className="w-full bg-[#121826] border border-gray-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-[#9bb1ff]"
                                                      />
                                                </div>
                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-1">
                                                            CONFIRM
                                                      </label>
                                                      <input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            className="w-full bg-[#121826] border border-gray-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-[#9bb1ff]"
                                                      />
                                                </div>
                                          </div>

                                          <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="terms" className="accent-[#9bb1ff]" />
                                                <label htmlFor="terms" className="text-sm text-gray-400">
                                                      I agree to the{" "}
                                                      <a href="#" className="text-[#9bb1ff] font-medium">
                                                            Terms & Conditions
                                                      </a>
                                                </label>
                                          </div>

                                          <button
                                                type="submit"
                                                className="w-full bg-[#9bb1ff] text-[#0b0e17] font-semibold py-2 rounded-md hover:bg-[#a8baff] transition-colors"
                                          >
                                                SIGN UP
                                          </button>

                                          <p className="text-center text-sm text-gray-400 mt-3">
                                                Already have an account?{" "}
                                                <button
                                                      onClick={() => navigate("/login")}
                                                      className="text-[#b0b8ff] font-semibold hover:underline"
                                                >
                                                      Login
                                                </button>
                                          </p>
                                    </form>
                              </div>

                              {/* Footer Icons */}
                              <div className="flex justify-center space-x-12 mt-10 text-gray-400 text-xs">
                                    <div className="flex flex-col items-center">
                                          ⚡<span className="mt-1">PRECISION</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                          📊<span className="mt-1">DATA-DRIVEN</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                          📈<span className="mt-1">INSIGHTFUL</span>
                                    </div>
                              </div>
                        </div>
                  </BorderGlow>
            </div>
      )
}

export default SignUp_Card;