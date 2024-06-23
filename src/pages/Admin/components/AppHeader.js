import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CHeader,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    useColorModes,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
    cilBell,
    cilContrast,
    cilEnvelopeOpen,
    cilList,
    cilMenu,
    cilMoon,
    cilSun,
} from "@coreui/icons";

import { AppHeaderDropdown } from "./index";

const AppHeader = () => {
    const headerRef = useRef();
    const { colorMode, setColorMode } = useColorModes(
        "coreui-free-react-admin-template-theme"
    );

    useEffect(() => {
        document.addEventListener("scroll", () => {
            headerRef.current &&
                headerRef.current.classList.toggle(
                    "shadow-sm",
                    document.documentElement.scrollTop > 0
                );
        });
    }, []);

    return (
        <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
            <CContainer className="border-bottom px-4" fluid>
                <CHeaderNav className="d-none d-md-flex">
                    <CNavItem>
                        <CNavLink to="/admin" as={NavLink}>
                            Главная
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink to="/" as={NavLink}>
                            Вернуться на сайт
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
               
                <CHeaderNav>
                    <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
                    </li>
                    <CDropdown variant="nav-item" placement="bottom-end">
                        <CDropdownToggle caret={false}>
                            {colorMode === "dark" ? (
                                <CIcon icon={cilMoon} size="lg" />
                            ) : colorMode === "auto" ? (
                                <CIcon icon={cilContrast} size="lg" />
                            ) : (
                                <CIcon icon={cilSun} size="lg" />
                            )}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem
                                active={colorMode === "light"}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode("light")}
                            >
                                <CIcon
                                    className="me-2"
                                    icon={cilSun}
                                    size="lg"
                                />{" "}
                                Light
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === "dark"}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode("dark")}
                            >
                                <CIcon
                                    className="me-2"
                                    icon={cilMoon}
                                    size="lg"
                                />{" "}
                                Dark
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === "auto"}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode("auto")}
                            >
                                <CIcon
                                    className="me-2"
                                    icon={cilContrast}
                                    size="lg"
                                />{" "}
                                Auto
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
                    </li>
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
        </CHeader>
    );
};

export default AppHeader;
