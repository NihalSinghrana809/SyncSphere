import running_man from '../../assets/running_man.png'
export const Hero_Section = () => {
      return (
            <section className="relative w-full md:w-1/2 min-h-full flex items-center justify-center bg-gradient-to-r from-purple-800 to-blue-900 text-white overflow-hidden">
                  {/* Background Image */}
                  <img src={running_man}
                        alt="Athlete running"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17]/80 to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 text-center px-6 max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#b0b8ff] mb-4">
                              REDEFINE <br /> YOUR LIMITS.
                        </h1>
                        <p className="text-gray-300 text-lg">
                              Precision tracking meets high-intensity performance. Log in to
                              synchronize your progress and unlock your inner glow.
                        </p>
                  </div>
            </section>
      )
}

export default Hero_Section;