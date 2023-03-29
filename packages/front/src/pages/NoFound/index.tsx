import { useEffect } from "react";
import { Link } from "react-router-dom";
import theme from "../../theme";

const NoFound = () => {
    useEffect(() => {
        document.title = "Página não encontrada";
    }, []);
    return (
        <div style={{ margin: "140px 10px", textAlign: "center", fontSize: 14 }}>
            <h2>Página não encontrada</h2>
            <p style={{ marginTop: "30px" }}>
                <Link to="/" style={{ color: theme.colors.primary, fontSize: 17 }}>
                    Ir para o Dashboard
                </Link>
            </p>
        </div>
    );
};

export default NoFound;
