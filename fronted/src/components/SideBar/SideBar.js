// imported side bar from https://codesandbox.io/s/9bbm9?file=/src/Aside.js:0-3067
// using react-pro-sidebar & react-icons
import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaDelicious,
  FaRegLaughWink,
  FaHeart
} from "react-icons/fa";

const SideBar = (props, { image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  function handleMenuClick() {
    //change to fetched data instead of true
    props.handleMenuClick(true)
  }


  return (
    <ProSidebar
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          Communi
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            onClick={handleMenuClick}
            icon={<FaTachometerAlt />}
            // suffix={<span className="badge red">'new'</span>}
          >
            Users
          </MenuItem>
          <MenuItem  onClick={handleMenuClick} icon={<FaGem />}> Costumers</MenuItem>
          <MenuItem onClick={handleMenuClick} icon={<FaDelicious />}> Employes</MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title="noFunction"
            icon={<FaRegLaughWink />}
          >
            <MenuItem>'Employes' 1</MenuItem>
            <MenuItem>'submenu' 2</MenuItem>
            <MenuItem>'submenu' 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title="noFunction"
            icon={<FaHeart />}
          >
            <MenuItem>'submenu' 1</MenuItem>
            <MenuItem>'submenu' 2</MenuItem>
            <MenuItem>'submenu' 3</MenuItem>
          </SubMenu>
          <SubMenu title="noFunction" icon={<FaList />}>
            <MenuItem>'submenu' 1 </MenuItem>
            <MenuItem>'submenu' 2 </MenuItem>
            <SubMenu title={`'submenu' 3`}>
              <MenuItem>'submenu' 3.1 </MenuItem>
              <MenuItem>'submenu' 3.2 </MenuItem>
              <SubMenu title={`'submenu' 3.3`}>
                <MenuItem>'submenu' 3.3.1 </MenuItem>
                <MenuItem>'submenu' 3.3.2 </MenuItem>
                <MenuItem>'submenu' 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px"
          }}
        >
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBar;
