import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { useState } from "react";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";


const PasswordUpdate = () => {
    const [onRequest, setOnRequest] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Required")
                .min(8, "Must be 8 characters or more"),
            newPassword: Yup.string()
                .required("Required")
                .min(8, "Must be 8 characters or more"),
            confirmNewPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("newPassword")], "Passwords must match"),
        }),
        onSubmit: async (values) => onUpdate(values),
    });

    const onUpdate = async (values) => {
        if (onRequest) return;
        setOnRequest(true);
        
        const {response, err} = await userApi.passwordUpdate(values);
        
        setOnRequest(false);
        if (err) return toast.error(err);
        if (response) {
            form.resetForm();
            navigate("/");
            dispatch(setUser(null));
            dispatch(setAuthModalOpen(true));
            toast.success("Password updated ! Please re-login");
        }
    };

    return (
        <div>
            <Box sx={{...uiConfigs.style.mainContent}}>
                <Container header="update password">
                    <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
                        <Stack spacing={2}>
                        <TextField
                            type="password"
                            placeholder="Password"
                            name="password"
                            fullWidth
                            value={form.values.password}
                            onChange={form.handleChange}
                            color="success"
                            error={form.touched.password && form.errors.password !== undefined}
                            helperText={form.touched.password && form.errors.password}
                            />
                        <TextField
                            type="password"
                            placeholder="New password"
                            name="newPassword"
                            fullWidth
                            value={form.values.newPassword}
                            onChange={form.handleChange}
                            color="success"
                            error={form.touched.newPassword && form.errors.newPassword !== undefined}
                            helperText={form.touched.newPassword && form.errors.newPassword}
                        />
                        <TextField
                            type="password"
                            placeholder="Confirm New password"
                            name="confirmNewPassword"
                            fullWidth
                            value={form.values.confirmNewPassword}
                            onChange={form.handleChange}
                            color="success"
                            error={form.touched.confirmNewPassword && form.errors.confirmNewPassword !== undefined}
                            helperText={form.touched.confirmNewPassword && form.errors.confirmNewPassword}
                        />
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            loading={onRequest}
                            sx={{marginTop: 4}}
                        >
                            update password
                        </LoadingButton>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </div>
    );
}

export default PasswordUpdate;