import React from "react";
import {
    AppContent,
    AppSidebar,
    AppFooter,
    AppHeader,
} from "../components/index";

import { CForm, CFormInput, CButton } from "@coreui/react";

import { useState } from "react";

const DefaultLayout = ({ items }) => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    Текст на основной странице
                    <CForm>
                        <CFormInput
                            type="textarea"
                            id="exampleFormControlTextarea1"
                            rows="3"
                        />
                        <CButton color="primary" >
                            Save
                        </CButton>
                    </CForm>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default DefaultLayout;
