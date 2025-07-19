import { TextField } from "@mui/material";
import { useField } from "formik";

const CustomTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props.name);
    const esFecha = props.type === "date";
    const parseFecha = (valor) => {
        // Si el valor ya está en formato yyyy-MM-dd, lo dejamos igual
        if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) return valor;

        // Si viene como dd/mm/yyyy lo transformamos
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
            const [dia, mes, año] = valor.split("/");
            return `${año}-${mes}-${dia}`;
        }

        return valor;
    };


    return (
        <TextField
            fullWidth
            variant="filled"
            label={label}
            {...field}
            {...props}
            type={props.type || "text"}
            value={esFecha ? parseFecha(field.value) : field.value}
            placeholder={esFecha ? undefined : props.placeholder}
            InputLabelProps={esFecha ? { shrink: true } : {}}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E7423E", // color cuando está enfocado
                },
                "& .MuiFilledInput-root": {
                    "&::before": {
                        borderBottom: "4px solid #052462",
                    },
                    "&::after": {
                        borderBottom: "4px solid #E7423E",
                    },
                    "&:hover::before": {
                        borderBottom: "3px solid #E7423E",
                    },
                }
            }}
        />
    );
};

export default CustomTextField;
