import { useState, useEffect, useCallback } from "react";
import PageContent from "../../components/shared/PageContent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";
import ModalConfirm from "../../components/ModalConfirm";
import FabBottom from "../../components/shared/FabButton";
import Table from "../../components/shared/Table";
import Form from "./FormRuralProducer";
import Alert from "../../components/Alert";
import { Container, Actions } from "./style";
import theme from "../../theme";
import { ListCulturaPlantada, formatterDoc, arraySort, Sleep } from "../../utils/general";
import { URL_API } from "../../utils/constants";
import { IRuralProducerDatas } from "../../types/IRuralProducerDatas";
import { RootState } from "../../stores/redux/";

import { setData as dispatchSetDatas } from "../../stores/redux/ruralProducer.reducer";
import { setLoading as dispatchLoading } from "../../stores/redux/app.reducer";
import { removeItem as dispatchReomveItem } from "../../stores/redux/ruralProducer.reducer";

const RuralProducer = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [openConfirmRemove, setOpenConfirmRemove] = useState<boolean>(false);
    const [datas, setDatas] = useState<any[]>([]);
    const [dataItem, setDataItem] = useState<any>([]);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [itemRemove, setItemRemove] = useState<any>([]);

    const { datas: datasStore } = useSelector((state: RootState) => state.ruralProducer);
    const { loading } = useSelector((state: RootState) => state.app);

    const dispatch = useDispatch();
    const columnsTable = ["Nome", "CPF/CNPJ", "Nome Fazenda", "Cultura"];

    const fecthData = useCallback(() => {
        if (loading || datasStore.length) {
            return;
        }
        dispatch(dispatchLoading(true));
        axios.get(`${URL_API}/ruralproducer`).then(async (response) => {
            dispatch(dispatchSetDatas(response.data.datas));
            await Sleep(1e3);
            dispatch(dispatchLoading(false));
        });
    }, []);

    useEffect(() => {
        document.title = "Produtor Rural";
        fecthData();
    }, []);

    useEffect(() => {
        if (messageSuccess) {
            setTimeout(() => {
                setMessageSuccess("");
            }, 3e3);
        }
    }, [messageSuccess]);

    const dispatchRemove = () => {
        const id = itemRemove.id;
        if (id) {
            dispatch(dispatchLoading(true));
            axios.delete(`${URL_API}/ruralproducer/${id}`).then(async (response) => {
                if (!response.data.error) {
                    setMessageSuccess("Item excluído com sucesso");
                    dispatch(dispatchReomveItem(itemRemove));
                } else {
                    console.log("Error Api: ", response.data);
                    alert("Não foi possível excluir o item");
                }
                Sleep(1e3);
                handleClose();
                dispatch(dispatchLoading(false));
                setOpenConfirmRemove(false);
                setItemRemove([]);
            });
        } else {
            handleClose();
        }
    };

    const renderAction = (item: any) => {
        return (
            <Actions>
                <HiPencilSquare
                    color={theme.colors.secundary}
                    size={20}
                    onClick={() => {
                        setDataItem(item);
                        setOpenForm(true);
                    }}
                    title="Alterar"
                    style={{ marginRight: 5 }}
                >
                    Alterar
                </HiPencilSquare>
                <HiTrash
                    title="Excluir"
                    color={theme.colors.error}
                    size={20}
                    onClick={() => {
                        setItemRemove(item);
                        setOpenConfirmRemove(true);
                    }}
                >
                    Excluir
                </HiTrash>
            </Actions>
        );
    };

    const RenderConfirmRemove = () => {
        return (
            <ModalConfirm
                open={itemRemove.id && openConfirmRemove}
                onClose={() => {
                    setItemRemove([]);
                    setOpenConfirmRemove(false);
                }}
                onConfirmNoTetx="Não"
                onConfirmNo={() => {
                    setItemRemove([]);
                    setOpenConfirmRemove(false);
                }}
                onConfirmYesText="Excluir"
                onConfirmYes={() => {
                    dispatchRemove();
                }}
                renderContent={
                    <>
                        <p> Tem certeza que deseja EXCLUIR o item?</p>
                        <br />
                        <span style={{ color: "#978f8f", fontSize: 13 }}>
                            Nome: {itemRemove.nome}
                            <br />
                            {itemRemove.doc?.length <= 11 ? "CPF" : "CNPJ"}: {formatterDoc(itemRemove?.doc)}
                            <br />
                            Fazenda: {itemRemove.nomeFazenda}
                            <br />
                            Cultura:{" "}
                            {ListCulturaPlantada.filter((i) => i.value === itemRemove.culturaPlantada)[0]?.desc}
                        </span>
                    </>
                }
            />
        );
    };

    useEffect(() => {
        let listSort = arraySort(datasStore, "nome", "asc");
        setDatas(
            listSort.map((item: IRuralProducerDatas) => ({
                data: item,
                row: [
                    item.nome,
                    formatterDoc(item.doc),
                    item.nomeFazenda,
                    `${ListCulturaPlantada.filter((i) => i.value === item.culturaPlantada)[0]?.desc}`,
                ],
                renderAction,
            }))
        );

        return () => {
            setDataItem([]);
        };
    }, [datasStore]);

    const handleClose = async () => {
        setOpenForm(false);
        setDataItem([]);
    };

    return (
        <>
            <RenderConfirmRemove />

            <PageContent title="Produtor Rural">
                <Form dataItem={dataItem} open={openForm} onClose={handleClose} setMessageSuccess={setMessageSuccess} />
                <FabBottom tooltip="Adicionar" onClick={() => setOpenForm(true)}>
                    +
                </FabBottom>{" "}
                {<Alert type="success" text={messageSuccess} open={messageSuccess !== ""} />}
                <Container>
                    {datasStore.length > 0 ? (
                        <Table columns={columnsTable} datas={datas} />
                    ) : (
                        <div style={{ textAlign: "center", marginTop: 120 }}>Não há dados para exibição.</div>
                    )}
                </Container>
            </PageContent>
        </>
    );
};

export default RuralProducer;
