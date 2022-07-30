import {React, useState} from 'react'
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {TableCell, TableRow, makeStyles} from '@material-ui/core'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import WarningIcon from '@material-ui/icons/Warning'
import format from 'date-fns/format'
import { useTheme } from "@material-ui/core/styles"



const useStyle = makeStyles(theme => ({
    typo: {
        color: "textSecondary"
    }
  }
  ))

export default function StudentLine(props) {

    //const course_id = props.course_id;
    //const h_id = props.h_id;
    const student_id = props.surname.toLowerCase().split(" ")[0] + "-" + props.name.toLowerCase().split(" ")[0]

    const theme = useTheme()
    
    
    let deliveryDate = ""
    let isUpdated = true
    if (props.deliveryDate){
        isUpdated = props.deliveryDate.toDate().getTime() > props.updatedAt.toDate().getTime()
        deliveryDate = format(props.deliveryDate.toDate(), "dd/MM/yyyy")
    } else {
        deliveryDate = ""
    }

    const classes = useStyle()

    return (      
        (props.showAll) ? (
            <>
            <TableRow component={deliveryDate ? Link : undefined} 
                to={`/course/${props.course_id}/homework/${props.h_id}/${student_id}`} 
                style={{ textDecoration: 'none', flexGrow: "1" }}>
                    <TableCell style={{textAlign: 'center'}}>
                        <Typography className={classes.typo}>{props.surname+' '+props.name}</Typography>
                    </TableCell>
                    <TableCell style={{textAlign: 'center'}}>
                        <Typography className={classes.typo} >{deliveryDate}</Typography>
                    </TableCell>
                    <TableCell style={{textAlign: 'center'}}>
                        { (deliveryDate) ? (
                            (isUpdated) ? 
                                <IconButton>
                                    <ArrowForwardIosIcon 
                                        color='primary' 
                                        align='center'
                                        size='medium'
                                    ></ArrowForwardIosIcon>
                                </IconButton>
                            :
                                <>
                                    <IconButton verticalAlign="middle">
                                        <WarningIcon 
                                                style={{color: theme.palette.warning.main}}
                                                align='left'
                                                size='medium'
                                        ></WarningIcon>
                                    </IconButton>
                                    <IconButton>
                                        <ArrowForwardIosIcon 
                                            color='primary' 
                                            align='right'
                                            size='medium'
                                        ></ArrowForwardIosIcon>
                                    </IconButton>
                                </>
                                
                            ) : null
                        }
                    </TableCell>

            </TableRow> 
            
            </>) : (
                (deliveryDate) ? (
                    <>
                    <TableRow component={deliveryDate ? Link : undefined} 
                    to={`/course/${props.course_id}/homework/${props.h_id}/${student_id}`} 
                    style={{ textDecoration: 'none' }}>
                        <TableCell style={{textAlign: 'center'}}>
                            <Typography className={classes.typo}>{props.surname+' '+props.name}</Typography>
                        </TableCell>
                        <TableCell style={{textAlign: 'center'}}>
                            <Typography className={classes.typo} >{deliveryDate}</Typography>
                        </TableCell>
                        <TableCell style={{textAlign: 'center'}}>
                            {(isUpdated) ? (
                                    <IconButton>
                                        <ArrowForwardIosIcon 
                                            color='primary' 
                                            align='center'
                                            size='medium'
                                        ></ArrowForwardIosIcon>
                                    </IconButton>

                                ) : (
                                    <>
                                    <IconButton verticalAlign="middle">
                                        <WarningIcon 
                                                style={{color: theme.palette.warning.main}}
                                                align='center'
                                                size='medium'
                                        ></WarningIcon>    
                                    </IconButton>
                                    <IconButton>
                                        <ArrowForwardIosIcon 
                                            color='primary' 
                                            align='center'
                                            size='medium'
                                        ></ArrowForwardIosIcon>
                                    </IconButton>
                                    </>
                                    
                                )}
                            
                        </TableCell>
                        
                    </TableRow>
                    
                    </>) : null
                
            )

        
    )
}