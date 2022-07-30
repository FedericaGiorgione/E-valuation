import {React, useState} from 'react'
import Box from '@material-ui/core/Box'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export default function HelpCard({title, description, open, onOpen}) {
    // silvia: chiudere automaticamente altre accordion aperte, come fare?

    const handleChange  = () => {
        onOpen()
      };

    
    return (
        
        <Box m={1} pt={1}>
            <Accordion expanded={open} onChange={handleChange}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography color="textSecondary">
                    <Box fontWeight="fontWeightMedium">
                        {title}
                    </Box>
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography color="textSecondary">
                    {description}
                </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
        
    )
}
