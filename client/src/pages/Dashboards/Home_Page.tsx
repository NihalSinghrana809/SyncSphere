import { Footer } from "../../components/Auth/Footer";
import { Header } from "../../components/Auth/Header";
import Home_Dashboard from "../../components/Home Dashboard/Home_Dashboard";

export const Home_Page = () => {
      return (
            <div className="">
                  <Header />
                  <Home_Dashboard />
                  <Footer />
            </div>
      )
}

export default Home_Page;
