import { useEffect } from "react";
import { Link } from "react-router-dom";

const NoFound = () => {
    useEffect(() => {
        document.title = "Página não encontrada";
    }, []);
    return (
        <div style={{ margin: "140px 10px", textAlign: "center", fontSize: 14 }}>
            <h2>Página não encontrada</h2>
            <p style={{ marginTop: "30px" }}>
                <Link to="/">Voltar</Link>
            </p>
        </div>
    );
};

export default NoFound;
