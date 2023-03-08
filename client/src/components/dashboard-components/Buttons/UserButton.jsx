import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { signOut } from "../../../redux/actions/authAction";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserButton = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  let { t } = useTranslation(["user"]);
  let { avatar, lastName, name } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutHandle = async () => {
    await dispatch(signOut());
    if (isLogged) {
      navigate("/signin");
    }
    toast.success(t("logged-out"));
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const styles = {
    py: 1,
    px: 2,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };
  return (
    <>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Avatar
          alt={name}
          onClick={handleDropdownOpen}
          src={
            avatar?.url ||
            "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
          }
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 210, marginTop: 2 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ py: 1, px: 1 }}>
          <div className="flex_betwen">
            <img
              className="h-10 w-10 rounded-full bg-teal-300"
              src={avatar?.url}
              alt=""
            />
            <Box
              sx={{
                display: "flex",
                marginLeft: "5px",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <p className="font-semibold text-gray-800">
                {lastName ? `${name} ${lastName}` : name}
              </p>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {t("admin")}
              </Typography>
            </Box>
          </div>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Link to={"/dashboard/cabinet"}>
            <Box sx={styles}>
              <AiOutlineUser className="mr-2" />
              {t("personal")}
            </Box>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={signOutHandle}>
          <FiLogOut className="mr-2 text-xl text-gray-600" />
          {t("sign-out")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserButton;
