import { FunctionComponent } from "react";
import MyNavbar from "../../Components/Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="home">
      <MyNavbar />
    </div>
  );
};

export default Home;
