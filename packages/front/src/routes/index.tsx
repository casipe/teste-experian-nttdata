import { Routes as RoutesDom, Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import RuralProducer from "../pages/RuralProducer";
import NoFound from "../pages/NoFound";

const Routes = () => {
    return (
        <RoutesDom>
            <Route path="/" element={<Dashboard />} />
            <Route index element={<Dashboard />} />
            <Route path="ruralproducer" element={<RuralProducer />} />
            <Route path="*" element={<NoFound />} />
        </RoutesDom>
    );
};

export default Routes;
