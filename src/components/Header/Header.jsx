import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
    return (
        <Box mt="30px" mb={4}>
            <Typography
                variant="h3"
                color="#052462"
                fontWeight="bold"
                sx={{
                    marginBottom: "5px",
                    textAlign: {
                        xs: "center",  // móviles
                        sm: "left"     // tablets y desktop
                    }
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="h6"
                color="#E7423E"
                fontWeight="bold"
                sx={{
                    textAlign: {
                        xs: "left",
                        sm: "left"
                    }
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
