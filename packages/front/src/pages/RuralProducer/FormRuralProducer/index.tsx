/*eslint no-unused-vars: "off"*/

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import InputLabel from "@mui/material/InputLabel";
import ModalConfirm from "../../../components/ModalConfirm";
import { Container } from "./style";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

import { RootState } from "../../../stores/redux/";
import { ListCulturaPlantada, ListStates, StatesProps, Sleep } from "../../../utils/general";
import { URL_API } from "../../../utils/constants";
import { IRuralProducerDatas, IListCulturaPlantada } from "../../../types/IRuralProducerDatas";
import { validateCnpj, validateCpf } from "../../../utils/validate";
import { useDispatch } from "react-redux";
import { setLoading as dispatchLoading } from "../../../stores/redux/app.reducer";
import {
    addItem as dispatchAddItem,
    updateItem as dispatchUpdateItem,
} from "../../../stores/redux/ruralProducer.reducer";

interface FormProps {
    dataItem: IRuralProducerDatas;
    open: boolean;
    onClose(): void;
    setMessageSuccess(str: any): void;
}

export const defaultValues: IRuralProducerDatas = {
    id: "",
    doc: "",
    nome: "",
    nomeFazenda: "",
    cidade: "",
    uf: "",
    culturaPlantada: "",
    areaTotal: "",
    areaVegetacao: "",
    areaAgricultavel: "",
};

export const defaultErrors: IRuralProducerDatas = defaultValues;

let isError = false;

export const validateSumArea = (datasForm: IRuralProducerDatas): boolean => {
    const sum = Number(datasForm.areaAgricultavel) + Number(datasForm.areaVegetacao);
    return !(sum > Number(datasForm.areaTotal));
};

export const validateForm = (datasForm: IRuralProducerDatas, isTest = false) => {
    let errorsAux: any = [];
    let datasFormAux: any = datasForm;
    isError = false;
    for (const key in datasFormAux) {
        if (key === "id") {
            continue;
        }
        const value: string = datasFormAux[key];
        let message = "";
        if (value === null || value === "") {
            message = "Campo obrigatório";
            isError = true;
        } else {
            if (key === "doc") {
                if ((value.length < 11 && !validateCpf(value)) || (value.length > 11 && !validateCnpj(value))) {
                    message = "Documento inválido";
                    isError = true;
                }
            }
        }
        errorsAux[key] = message;
    }

    if (!validateSumArea(datasForm)) {
        errorsAux["areaTotal"] = "Área total não pode ser menor que a soma da área agricultável e área de vegetação";
        isError = true;
    }

    if (isError && isTest) {
        console.log({ errorsAux });
    }

    return !isError ? true : errorsAux;
};

const FormRuralProducer = ({ dataItem, open, onClose, setMessageSuccess }: FormProps) => {
    const { loading } = useSelector((state: RootState) => state.app);

    const [datasForm, setDatasForm] = useState<IRuralProducerDatas>(defaultValues);
    const [errors, setErrors] = useState<IRuralProducerDatas>(defaultErrors);
    const [keyForm, setKeyForm] = useState<number>(0);

    const dispatch = useDispatch();

    useEffect(() => {
        if (dataItem.id) {
            setDatasForm(dataItem);
        }
    }, [dataItem]);

    useEffect(() => {
        generateKeyForm();
    }, [open]);

    const generateKeyForm = () => {
        setKeyForm(Math.floor(Math.random() * 100) + 1);
    };

    const reset = () => {
        setErrors(defaultErrors);
        setDatasForm(defaultValues);
        isError = false;
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleFormChange = (name: string) => (event: any) => {
        let value = event.target !== undefined ? event.target.value : event.value;
        if (name === "areaTotal" || name === "areaAgricultavel" || name === "areaVegetacao") {
            value = value.replaceAll(",", ".");
        }
        setDatasForm((prev) => ({ ...prev, [name]: value }));
    };

    const dispatchAdd = async () => {
        dispatch(dispatchLoading(true));
        axios.post(`${URL_API}/ruralproducer`, datasForm).then(async (response) => {
            const id = response.data.id;
            if (id) {
                setMessageSuccess("Item adicionado com sucesso.");
                dispatch(dispatchAddItem({ ...datasForm, id }));
            } else {
                console.log("Error Api: ", response.data);
                alert("Não foi possível adicionar novo o item");
            }
            await Sleep(1e3);
            dispatch(dispatchLoading(false));
            handleClose();
        });
    };

    const dispatchUpdate = async () => {
        dispatch(dispatchLoading(true));
        const id = datasForm.id;
        axios.put(`${URL_API}/ruralproducer/${id}`, datasForm).then(async (response) => {
            if (!response.data?.error) {
                setMessageSuccess("Item alterado com sucesso.");
                dispatch(dispatchUpdateItem(datasForm));
            } else {
                console.log("Error Api: ", response.data);
                alert("Não foi possível alterar o item");
            }
            await Sleep(1e3);
            dispatch(dispatchLoading(false));
            handleClose();
        });
    };

    const handleSubmit = async () => {
        const error: any = validateForm(datasForm);
        if (error !== true) {
            setErrors(error);
        }
        if (isError) {
            return;
        }
        if (!dataItem.id) {
            dispatchAdd();
        } else {
            dispatchUpdate();
        }
    };

    return (
        <>
            <ModalConfirm
                title={`${dataItem?.id ? "Alterar" : "Adicionar"} `}
                open={open}
                buttonClose={false}
                onClose={() => handleClose()}
                onConfirmYesText="Salvar"
                onConfirmYesDisabled={loading}
                onConfirmNoTetx={<>Fechar</>}
                onConfirmYes={() => handleSubmit()}
                onConfirmNo={() => handleClose()}
                width="100%"
                renderContent={
                    <Container>
                        <Box
                            component="form"
                            sx={{
                                "& .MuiTextField-root": { m: 1, width: "29ch" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="name"
                                    data-testid="name"
                                    key={`nome-${keyForm}`}
                                    label="Nome"
                                    defaultValue={datasForm.id ? datasForm.nome : ""}
                                    error={errors.nome !== ""}
                                    helperText={errors.nome}
                                    onChange={handleFormChange("nome")}
                                />

                                <TextField
                                    required
                                    id="doc"
                                    key={`doc-${keyForm}`}
                                    label="CPF/CNPJ"
                                    defaultValue={datasForm.id ? datasForm.doc : ""}
                                    error={errors.doc !== ""}
                                    helperText={errors.doc}
                                    onChange={handleFormChange("doc")}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="nomeFazenda"
                                    key={`nomeFazenda-${keyForm}`}
                                    label="Nome da Fazenda"
                                    defaultValue={datasForm.nomeFazenda}
                                    error={errors.nomeFazenda !== ""}
                                    helperText={errors.nomeFazenda}
                                    onChange={handleFormChange("nomeFazenda")}
                                />

                                <TextField
                                    required
                                    id="city"
                                    key={`city-${keyForm}`}
                                    label={"Cidade"}
                                    defaultValue={datasForm.cidade}
                                    error={errors.cidade !== ""}
                                    helperText={errors.cidade}
                                    onChange={handleFormChange("cidade")}
                                />
                            </div>

                            <div>
                                <FormControl sx={{ m: 1, minWidth: "29ch" }} error={errors.uf !== ""}>
                                    <InputLabel required id="uf-label">
                                        Estado
                                    </InputLabel>
                                    <Select
                                        required
                                        key={`uf-${keyForm}`}
                                        labelId="uf-label"
                                        id="uf"
                                        value={datasForm.uf}
                                        label="Estado"
                                        onChange={handleFormChange("uf")}
                                        renderValue={(value) =>
                                            `${ListStates.filter((i: StatesProps) => i.uf === value)[0]?.name}`
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>Selecione...</em>
                                        </MenuItem>
                                        {ListStates.map((item: StatesProps, k) => (
                                            <MenuItem key={k} value={String(item.uf)}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.uf && <FormHelperText>{errors.uf}</FormHelperText>}
                                </FormControl>

                                <FormControl
                                    sx={{ m: 1, minWidth: "29ch" }}
                                    error={errors.culturaPlantada !== null && errors.culturaPlantada?.length > 0}
                                >
                                    <InputLabel required id="cultura-plantada-label">
                                        Culturas Plantadas
                                    </InputLabel>
                                    <Select
                                        required
                                        key={`cultura-plantada-${keyForm}`}
                                        labelId="cultura-plantada-label"
                                        id="cultura-plantada"
                                        value={
                                            datasForm.culturaPlantada !== null ? String(datasForm.culturaPlantada) : ""
                                        }
                                        label="Culturas Plantadas"
                                        onChange={handleFormChange("culturaPlantada")}
                                        renderValue={(value) =>
                                            `${ListCulturaPlantada.filter((i) => i.value === value)[0]?.desc}`
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>Selecione...</em>
                                        </MenuItem>
                                        {ListCulturaPlantada.map((item: IListCulturaPlantada, k) => (
                                            <MenuItem key={k} value={String(item.value)}>
                                                {item?.desc}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.culturaPlantada !== null && errors.culturaPlantada?.length > 0 && (
                                        <FormHelperText>{errors.culturaPlantada}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                            <Divider variant="middle" style={{ margin: "10px 0" }} />
                            <div>
                                <NumericFormat
                                    required
                                    customInput={TextField}
                                    //suffix=" ha"
                                    decimalScale={2}
                                    decimalSeparator=","
                                    fixedDecimalScale
                                    type="text"
                                    thousandSeparator={false}
                                    key={`area-total-${keyForm}`}
                                    sx={{ m: 1, minWidth: 150 }}
                                    id="area-total"
                                    label="Área Total  (ha)"
                                    placeholder="0,00 ha"
                                    value={String(datasForm.areaTotal).replace(".", ",")}
                                    defaultValue={String(datasForm.areaTotal).replace(".", ",")}
                                    error={errors.areaTotal !== ""}
                                    helperText={errors.areaTotal}
                                    onChange={handleFormChange("areaTotal")}
                                />

                                <NumericFormat
                                    required
                                    customInput={TextField}
                                    //suffix=" ha"
                                    decimalScale={2}
                                    decimalSeparator=","
                                    fixedDecimalScale
                                    type="text"
                                    thousandSeparator={false}
                                    key={`area-agricultavel-${keyForm}`}
                                    sx={{ m: 1, minWidth: 150 }}
                                    id="area-agricultavel"
                                    label="Área Agricultável  (ha)"
                                    placeholder="0,00 ha"
                                    value={String(datasForm.areaAgricultavel).replace(".", ",")}
                                    defaultValue={String(datasForm.areaAgricultavel).replace(".", ",")}
                                    error={errors.areaAgricultavel !== ""}
                                    helperText={errors.areaAgricultavel}
                                    onChange={handleFormChange("areaAgricultavel")}
                                />

                                <NumericFormat
                                    required
                                    customInput={TextField}
                                    //suffix=" ha"
                                    decimalScale={2}
                                    decimalSeparator=","
                                    fixedDecimalScale
                                    type="text"
                                    thousandSeparator={false}
                                    key={`area-vegetacao-${keyForm}`}
                                    sx={{ m: 1, minWidth: 150 }}
                                    id="area-vegetacao"
                                    label={"Área de Vegetação (ha)"}
                                    placeholder="0,00 ha"
                                    value={String(datasForm.areaVegetacao).replace(".", ",")}
                                    defaultValue={String(datasForm.areaVegetacao).replace(".", ",")}
                                    error={errors.areaVegetacao !== ""}
                                    helperText={errors.areaVegetacao}
                                    onChange={handleFormChange("areaVegetacao")}
                                />
                            </div>
                        </Box>
                    </Container>
                }
            />
        </>
    );
};

export default FormRuralProducer;
