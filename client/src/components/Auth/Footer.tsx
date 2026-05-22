export const Footer = () => {
      return (
            <footer className="bg-[#0b0e17] text-gray-300 py-6 px-8 flex flex-col sm:flex-row items-center justify-between">
                  {/* Left: Brand */}
                  <div className="text-lg font-semibold text-[#9bb1ff]">Syncsphere</div>

                  {/* Center: Copyright */}
                  <div className="text-sm text-gray-400 mt-2 sm:mt-0">
                        © 2026 Syncsphere. All rights reserved.
                  </div>

                  {/* Right: Links */}
                  <div className="flex space-x-4 mt-2 sm:mt-0">
                        <a
                              href="/privacy-policy"
                              className="text-sm hover:text-[#9bb1ff] transition-colors"
                        >
                              Privacy Policy
                        </a>
                        <a
                              href="/terms-of-service"
                              className="text-sm hover:text-[#9bb1ff] transition-colors"
                        >
                              Terms of Service
                        </a>
                  </div>
            </footer>
      )
}

export default Footer;
