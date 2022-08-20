import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Switch } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import BasketPage from "../../../features/Basket/BasketPage";
import { useStoreContext } from "../../Context/StoreContext";
import { useAppSelector } from "../../Store/ConfigureStore";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  {
    title: "catalog",
    path: "/catalog",
  },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  {
    title: "login",
    path: "/login",
  },
  { title: "register", path: "/register" },
];
const navStyle = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  // const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyle}>
            My Store
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <Box>
          <List
            sx={{
              display: "flex",
            }}
          >
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            color="inherit"
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List
            sx={{
              display: "flex",
            }}
          >
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
