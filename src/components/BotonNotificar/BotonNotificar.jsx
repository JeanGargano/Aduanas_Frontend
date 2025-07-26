import { Button } from "@mui/material";

const BotonNotificar = ({ id_cliente, onClick }) => {
    const handleClick = (e) => {
        e.stopPropagation(); // evita que seleccione fila al hacer click
        if (onClick) onClick(id_cliente);
    };

    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "#E7423E",
                color: "white",
                fontWeight: "bold",
            }}
            onClick={handleClick}
        >
            Notificar
        </Button>
    );
};

export default BotonNotificar;
