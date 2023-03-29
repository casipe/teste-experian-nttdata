import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chart } from "react-google-charts";
import { RootState } from "../../stores/redux/";
import { setLoading } from "../../stores/redux/app.reducer";
import { setData } from "../../stores/redux/ruralProducer.reducer";
import { ListStates, getState, ListCulturaPlantada } from "../../utils/general";
import { URL_API } from "../../utils/constants";
import { IRuralProducerDatas } from "../../types/IRuralProducerDatas";
import Theme from "../../theme";
import { Container } from "./style";

export const optionsTotalByCulture = {
    title: "Área Total por Cultura",
};
export const optionsTotalByUF = {
    title: "Área Total por Estado",
};

export const optionsTotalBySolo = {
    title: "Área por Uso do Solo",
};

export const calculateAreaTotal = (datasStore: IRuralProducerDatas[]) => {
    let initialValue = 0;
    return datasStore.reduce((accumulator, currentValue) => accumulator + Number(currentValue.areaTotal), initialValue);
};
export const calculateTotalFazenda = (datasStore: IRuralProducerDatas[]) => {
    let itemsTemp: any[] = [];

    return datasStore.filter((item: any) => {
        const localFazenda = `${item.nomeFazenda}-${item.uf}-${item.cidade}`;
        const result = !itemsTemp.includes(localFazenda);
        itemsTemp.push(localFazenda);

        return result;
    }).length;
};

export const calculateTotalByState = (datasStore: IRuralProducerDatas[]) => {
    let initialValue = 0;
    /** CALCULAR O TOTAL DA ÁREA POR ESTADO **/
    const totalByUF: any = [["UF", "Total"]];
    ListStates.forEach(({ uf }: any) => {
        initialValue = 0;
        const total = datasStore.reduce((accumulator, item) => {
            let val = 0;
            if (item.uf === uf) {
                val = Number(item.areaTotal);
            }
            return accumulator + val;
        }, initialValue);
        if (total) {
            const name: any = getState(uf).name;
            totalByUF.push([name, total]);
        }
    });
    return totalByUF;
    /** CALCULAR O TOTAL DA ÁREA POR ESTADO **/
};

export const calculateTotalByCulture = (datasStore: IRuralProducerDatas[]) => {
    let initialValue = 0;

    /** CALCULAR O TOTAL DA ÁREA POR CULTURA **/
    const totalByCulture: any = [["Cultura", "Total"]];
    ListCulturaPlantada.forEach(({ value }: any) => {
        initialValue = 0;
        const total = datasStore.reduce((accumulator, item) => {
            let val = 0;
            if (item.culturaPlantada === value) {
                val = Number(item.areaTotal);
            }
            return accumulator + val;
        }, initialValue);

        if (total) {
            const desc: any = ListCulturaPlantada.filter((i) => i.value === value)[0]?.desc;
            totalByCulture.push([desc, total]);
        }
    });
    return totalByCulture;
    /** CALCULAR O TOTAL DA ÁREA POR CULTURA **/
};

export const calculateTotalBySolo = (datasStore: IRuralProducerDatas[]) => {
    let initialValue = 0;
    /** CALCULAR O TOTAL DO SOLO **/
    const totalBySolo: any = [["Uso do Solo", "Área Total"]];
    initialValue = 0;
    const totalAgricultavel = datasStore.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.areaAgricultavel),
        initialValue
    );
    totalBySolo.push(["Agricultável", totalAgricultavel]);
    initialValue = 0;
    const totalVegetacao = datasStore.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.areaVegetacao),
        initialValue
    );
    totalBySolo.push(["Vegetação", totalVegetacao]);

    return totalBySolo;
    /** CALCULAR O TOTAL DO SOLO **/
};

const CountCard = ({ text, count }: { text: string; count: string | number }) => (
    <Grid item md={4} sm={10} marginTop={6} marginLeft={5}>
        <Box
            sx={{
                minWidth: 340,
                border: `1px solid ${Theme.colors.primary} `,
                borderRadius: 2,
                color: "#fff",
                background: Theme.colors.primaryHover,
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="#fff" gutterBottom>
                    {text}
                </Typography>
                <Typography variant="h4" component="div">
                    {count}
                </Typography>
            </CardContent>
        </Box>
    </Grid>
);

const Dashboard = () => {
    const [totalFazenda, setTotalFazenda] = useState<number>(0.0);
    const [areaTotal, setAreaTotal] = useState<number>(0.0);
    const [listTotalByUF, setListTotalByUF] = useState<any[]>([]);
    const [listTotalByCulture, setListTotalByCulture] = useState<any[]>([]);
    const [listTotalBySolo, setListTotalBySolo] = useState<any[]>([]);

    const { loading } = useSelector((state: RootState) => state.app);
    const { datas: datasStore } = useSelector((state: RootState) => state.ruralProducer);

    const dispatch = useDispatch();

    const fecthData = React.useCallback(() => {
        if (datasStore.length || loading) {
            return;
        }
        dispatch(setLoading(true));
        axios.get(`${URL_API}/ruralproducer`).then((response) => {
            dispatch(setData(response.data.datas));
            dispatch(setLoading(false));
        });
    }, []);

    fecthData();

    useEffect(() => {
        document.title = "Dashboard";
        setTotalFazenda(calculateTotalFazenda(datasStore));
        setAreaTotal(calculateAreaTotal(datasStore));
        setListTotalByUF(calculateTotalByState(datasStore));
        setListTotalByCulture(calculateTotalByCulture(datasStore));
        setListTotalBySolo(calculateTotalBySolo(datasStore));
    }, [datasStore]);

    if (loading) {
        return null;
    }

    if (!datasStore.length) {
        return <div style={{ textAlign: "center", marginTop: 120 }}>Não há dados para exibição.</div>;
    }

    return (
        <Container>
            <Grid container spacing={3} marginTop={1} style={{ justifyContent: "center" }}>
                <Grid item md={5} sm={10}>
                    <CountCard text="Total de Fazenda" count={totalFazenda} />
                    <CountCard text="Área Total" count={`${areaTotal} ha`} />
                </Grid>
                <Grid item md={5} sm={10}>
                    <Chart
                        chartType="PieChart"
                        data={listTotalBySolo}
                        options={optionsTotalBySolo}
                        width={"100%"}
                        height={"400px"}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} marginTop={1} style={{ justifyContent: "center" }}>
                <Grid item md={5} sm={10}>
                    <Chart
                        chartType="PieChart"
                        data={listTotalByCulture}
                        options={optionsTotalByCulture}
                        width={"100%"}
                        height={"400px"}
                    />
                </Grid>
                <Grid item md={5} sm={10}>
                    <Chart
                        chartType="PieChart"
                        data={listTotalByUF}
                        options={optionsTotalByUF}
                        width={"100%"}
                        height={"400px"}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
