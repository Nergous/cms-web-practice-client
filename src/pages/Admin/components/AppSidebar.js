import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Provider } from 'react-redux';

import {
  CCloseButton,
  CNavLink,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config

const AppSidebar = () => {

    const items = [
        { 
            component: CNavLink,
            name: "Music",
            to: '/admin/music',
        },
        { 
            component: CNavLink,
            name: "Members",
            to: '/admin/members',
        },
        { 
            component: CNavLink,
            name: "Gigs",
            to: '/admin/gigs',
        },
    ]

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
        />
      </CSidebarHeader>
      <AppSidebarNav items={items} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
