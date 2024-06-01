import Navbar from "./componets/Navbar/Navbar";
import Footer from './componets/Footer/Footer';
import PageContainer from './componets/PageContainer/PageContainer';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUser } from "./redux/authSlice";
 
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [])

  return (
    <div className="App">
      <PageContainer />
    </div>
  );
}

export default App;
