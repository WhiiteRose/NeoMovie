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

const SignupForm = ({ switchAuthState}) => {
    const dispatch = useDispatch();

    const [isLoginRequest, setisLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [rememberMe, setRememberMe] = useState(false);


    const signupForm = useFormik({
        initialValues: {
            password: "",
            username: "",
            displayName: "",
            confirmPassword: ""
    },
    validationSchema: Yup.object({
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")
            .required("Username Required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password Required"),
        displayName: Yup.string()
            .min(8, "displayName must be at least 8 characters")
            .required("displayName Required"),
        confirmPassword: Yup.string()
            .min(8, "confirmPassword must be at least 8 characters")
            .required("confirmPassword Required"),
        }),
        onSubmit: async values => {
            setErrorMessage(undefined);
            setisLoginRequest(true);
            const { response, err} = await userApi.signup(values, rememberMe);
            setisLoginRequest(false);

            if (response) {
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success("Sign Up successfully");
            }
            if (err) setErrorMessage(err.message);
        }
    });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
        <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.username && signupForm.errors.username !== undefined}
          helperText={signupForm.touched.username && signupForm.errors.username}
        />
         <TextField
          type="text"
          placeholder="Display Name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
          helperText={signupForm.touched.displayName && signupForm.errors.displayName}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.password && signupForm.errors.password !== undefined}
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
         <TextField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
          helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
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
        sign up
      </LoadingButton>
      <Button
        fullWidth
        sx={{marginTop: "1rem"}}
        onClick={() => switchAuthState()}
      >
        sign in
      </Button>
      {errorMessage && (
      <Box sx={{marginTop: 2}}>
        <Alert severity="error" variant="outlined">{errorMessage}</Alert>
      </Box>
      )}
    </Box>
  );
};

export default SignupForm