import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
// import {Link as MuiLink} from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon,FacebookIcon,SitemarkIcon } from './CustomIcon.jsx'
import { useState } from 'react';
 import { Link as RouterLink } from 'react-router-dom';
const Card = styled(MuiCard)(({theme})=>({
    display:'flex',
    flexDirection: 'column',
    alignSelf:'center',
    width:'100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin:'auto',
    [theme.breakpoints.up('sm')]:{
        maxWidth:'450px',
    },
    boxShadow:
    'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    // ...theme.applyStyles('dark', {
    //   boxShadow:
    //     'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    // }),
}));

const SignUpContainer = styled(Stack)(({theme})=>({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    //   backgroundRepeat: 'no-repeat',
    //   ...theme.applyStyles('dark', {
    //     backgroundImage:
    //       'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    //   }),
    },
}));

const SignUp =()=>{
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');

            const validateInputs = ()=>{
                const email = document.getElementById('email')
                const password = document.getElementById('password')
                const name = document.getElementById('name')
                let isValid = true
                            if(!email.value || !/\S+@\S+\.\S+/.test(email.value)){
                                setEmailError(true);
                            setEmailErrorMessage('Please enter a valid email address.');
                            isValid = false;
                            } 
                                else {
                                setEmailError(false);
                                setEmailErrorMessage('');
                                    }
                            if(!password.value || password.value.length < 6){
                                setPasswordError(true);
                                setPasswordErrorMessage('Password must be at least 6 characters long.');
                                isValid = false;
                                } 
                                    else {
                                    setPasswordError(false);
                                    setPasswordErrorMessage('');
                                    }
                            if (!name.value || name.value.length < 1) {
                                setNameError(true);
                                setNameErrorMessage('Name is required.');
                                isValid = false;
                                } 
                                    else {
                                    setNameError(false);
                                    setNameErrorMessage('');
                                    }
                                
                                return isValid;        
                }
            const handleSubmit = (e)=>{
                if (nameError || emailError || passwordError) {
                    e.preventDefault();
                    return;
                  }
                  const data = new FormData(e.currentTarget);
                  console.log({
                    name: data.get('name'),
                    lastName: data.get('lastName'),
                    email: data.get('email'),
                    password: data.get('password'),
                  });
            }   
            
            return (
            <>
            <CssBaseline enableColorScheme/>
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant='outlined'>
                <RouterLink to="/">
                 <SitemarkIcon/>
                 </RouterLink>
                 
                    <Typography
                    component="h1"
                    variant='h4'
                    sx={{width:'100%',fontSize:'clamp(2rem,10vw,2.15rem)' }}
                    >
                        Sign up

                    </Typography>
                    <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{display:'flex', flexDirection:'column',gap:2}}
                    >
                        <FormControl>
                            <FormLabel htmlFor='name'>Full name</FormLabel>
                            <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            placeholder='Jon Snow'
                            error={nameError}
                            helperText={nameErrorMessage}
                            color={nameError ? 'error':'primary'}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='name'>email</FormLabel>
                            <TextField
                            autoComplete='email'
                            name='email'
                            required
                            fullWidth
                            id='email'
                            placeholder='your@email.com'
                            variant='outlined'
                            error={emailError}
                            helperText={emailErrorMessage}
                            color={emailError ? 'error':'primary'}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='name'>password</FormLabel>
                            <TextField
                            type='password'
                            autoComplete='new-password'
                            name='password'
                            required
                            fullWidth
                            id='password'
                            variant='outlined'
                            placeholder='••••••'
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            color={passwordError ? 'error':'primary'}/>
                        </FormControl>
                                <FormControlLabel
                                control={<Checkbox value='allowExtraEmails' color='primary'/>}
                                label='je veux recevoir des newslater par email'
                                />
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={validateInputs}
                                    >Sign up
                                    </Button>

                    </Box>
                    <Divider>
                        <Typography sx={{color:'text.secondary'}}>or</Typography>
                    </Divider>
                    <Box sx={{display:'flex', flexDirection:'column',gap:2}}>
                        <Button
                        fullWidth
                        variant='outlined'
                        onClick={()=>alert('Sign up with Google')}
                        startIcon={<GoogleIcon/>}>
                            Sign up with Google
                        </Button>
                        <Button
                        fullWidth
                        variant='outlined'
                        onClick={()=>alert('Sign up with Facebook')}
                        startIcon={<FacebookIcon/>}>
                            Sign up with Facebook
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                                Already have an account?{' '}
                                <RouterLink
                                    
                                    to="/Sign-in"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Sign in
                                </RouterLink>
                                </Typography>
                    </Box>
                </Card>

            </SignUpContainer>
            </>
            )
        
    }
    export default SignUp
