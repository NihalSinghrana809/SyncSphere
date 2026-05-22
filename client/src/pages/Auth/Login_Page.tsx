import Footer from '../../components/Auth/Footer'
import Header from '../../components/Auth/Header'
import Hero_Section from '../../components/Auth/Hero_Section'
import Login_Card from '../../components/Auth/Login_Card'

export const Login_Page = () => {
      return (
            <div className="min-h-screen flex flex-col">
                  <Header />
                  <div className="flex flex-wrap flex-1">
                        <Hero_Section />
                        <Login_Card />
                  </div>
                  <Footer />
            </div>
      )
}

export default Login_Page
