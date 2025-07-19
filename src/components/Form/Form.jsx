import { Box, Button, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import CustomTextField from "../CustomTextField/CustomTextField.jsx";
import { FieldsData } from "../../Data/Data.jsx";

const Form = ({ onSubmit, initialValues, validationSchema, extraFields, btnText }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                        overflow="auto"
                    >
                        {FieldsData.map((campo) => (
                            <CustomTextField
                                key={campo.name}
                                label={campo.label}
                                name={campo.name}
                                type={campo.type}
                                value={values[campo.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!touched[campo.name] && !!errors[campo.name]}
                                helperText={touched[campo.name] && errors[campo.name]}
                                sx={{ gridColumn: campo.gridColumn || "span 4" }}
                            />
                        ))}

                        {/* Campos extra inyectados desde el padre */}
                        {extraFields?.({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                        })}
                    </Box>

                    <Box mt="20px" display="flex" justifyContent="end">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{
                                backgroundColor: "#E7423E",
                                color: "#fff",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#6E81A4",
                                },
                            }}
                        >
                            {btnText}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
