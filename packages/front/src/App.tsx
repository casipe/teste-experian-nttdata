import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import Container from "./components/shared/ContainerWrap";
import Navbar from "./components/NavBar";
import Loading from "./components/Loading";
import Routes from "./routes";
import { RootState } from "./stores/redux";

import Theme, { globalStyle as GlobalCSS } from "./theme";

function App() {
    const { loading } = useSelector((state: RootState) => state.app);

    return (
        <div className="App">
            <ThemeProvider theme={Theme}>
                <Loading open={loading} />
                <GlobalCSS />
                <Navbar />
                <Container>
                    <Routes />
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
