import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomTextField from "../CustomTextField/CustomTextField.jsx";


const Form = ({ onSubmit, initialValues, validationSchema, extraFields, btnText, FieldsData }) => {
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
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                            "& input[type=number]": {
                                MozAppearance: "textfield",
                            },
                        }}
                        overflow="auto"
                        onWheel={(e) => e.target.blur()}
                    >
                        {/* Campos extra inyectados desde el padre */}
                        {extraFields?.({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                        })}
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
