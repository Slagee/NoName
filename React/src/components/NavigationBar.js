import React from 'react'
import {Button, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import logo from '../assets/SDlogo.png'
import CustomButton from './CustomButton'

const styles = makeStyles({
    bar:{
        paddingTop: "0.5rem",
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    logo: {
        width: "12%", 
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    menuItem: {
        flexGrow: 1,
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

function NavigationBar() {
    const classes = styles()
    return (
            <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
                <img src={logo} className={classes.logo}/>
                <Typography variant="h7" className={classes.menuItem}>Nepřihlášený/á</Typography>
                <CustomButton txt="Přihlásit se"/>
            </Toolbar>
    )
}

export default NavigationBar
