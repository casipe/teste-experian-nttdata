import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HiBars3 as MenuIcon } from "react-icons/hi2";

import { Container } from "./style";

interface Props {
    window?: () => Window;
}

interface IMenuItem {
    title: string;
    link?: string;
    onClick?(): void;
}

const drawerWidth = 240;

const navItems: IMenuItem[] = [
    { title: "Dashboard", link: "" },
    { title: "Produtor Rural", link: "ruralproducer" },
];

export default function DrawerAppBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const navigate = useNavigate();

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Menu
            </Typography>
            <Divider />
            <List>
                {navItems.map((item: IMenuItem, k: number) => (
                    <ListItem key={k} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText onClick={() => navigate(item.link || "")} primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Container>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className="menuMobile"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { md: "block" } }}>
                        Brain Agriculture
                    </Typography>
                    <Box className="menuDesktop">
                        {navItems.map((item, k) => (
                            <Button onClick={() => navigate(item.link || "")} key={k} sx={{ color: "#fff" }}>
                                {item.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    className="menuMobile"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Container>
    );
}
