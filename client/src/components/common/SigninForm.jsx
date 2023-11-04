import {LoadingButton} from "@mui/lab"
import {Alert, Box, Button, Stack, TextField, Switch, Typography} from "@mui/material"
import {useFormik} from "formik"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {toast} from "react-toastify"
import * as Yup from "yup"
import userApi from "../../api/modules/user.api"
import {setAuthModalOpen} from "../../redux/features/authModalSlice"
import {setUser} from "../../redux/features/userSlice"

const SigninForm = ({switchAuthState}) => {
    const dispatch = useDispatch();

    const [isLoginRequest, setisLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [rememberMe, setRememberMe] = useState(false);


    const signinForm = useFormik({
        initialValues: {
            username: "",
            password: ""
    },
    validationSchema: Yup.object({
        username: Yup.string()
        .min(8, "Username must be at least 8 characters")
        .required("Username Required"),
        password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password Required"),
        }),
        onSubmit: async values => {
            setErrorMessage(undefined);
            setisLoginRequest(true);
            const { response, err} = await userApi.signin(values, rememberMe);
            setisLoginRequest(false);

            if (response) {
                signinForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success("Sign In successfully");
            }
            if (err) setErrorMessage(err.message);
        }
    });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
        <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.username && signinForm.errors.username !== undefined}
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.password && signinForm.errors.password !== undefined}
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>
      <Box sx={{display: "flex", direction: "row", alignItems:"center", mt: 3}}>
        <Switch label="Remember me" 
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}z
          >
        </Switch>
        <Typography>
          Remember me
        </Typography>
      </Box>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>
      <Button
        fullWidth
        sx={{marginTop: "1rem"}}
        onClick={() => switchAuthState()}
      >
        sign up
      </Button>
      {errorMessage && (
      <Box sx={{marginTop: 2}}>
        <Alert severity="error" variant="outlined">{errorMessage}</Alert>
      </Box>
      )}
    </Box>
  )
}

export default SigninForm;