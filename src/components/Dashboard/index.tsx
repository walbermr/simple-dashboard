import { OperationTable } from "../OperationTable";
import { Container } from "./styles";

import { ChartPage } from "../Report";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function Dashboard(){
    return(
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ChartPage/>}></Route>
                    <Route path="/dashboard" element={<OperationTable/>}></Route>
                </Routes>
            </BrowserRouter>
        </Container>
    )
}