/*eslint no-unused-vars: "off"*/
import React from "react";
import {Container, Thead, Tbody} from "./style";

interface IDatas {
    data: object;
    row: string[];
    renderAction?:(item:any)=>React.ReactNode;
}

interface TableProps {
    columns: string[];
    datas: IDatas[];
}

const Table = ({ columns, datas }: TableProps) => {
    if(!datas.length){
        return null;
    }
    return (
        <Container className="table">
            <Thead>
                <tr>
                    {columns.map((nome: string, k) => (
                        <th key={k}>{nome}</th>
                    ))}
                    {datas[0].renderAction && <th className="action">Ação</th>}
                </tr>
            </Thead>

            <Tbody>
                {datas.map((item: IDatas, k) => (
                    <tr key={k}>
                        {item.row.map((desc) => (
                            <td>{desc}</td>
                        ))}
                        {item.renderAction !== undefined && <td className="action">{item.renderAction(item.data)}</td>}
                    </tr>
                ))}
            </Tbody>
        </Container>
    );
};

export default Table;
