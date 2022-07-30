import React, {useState, useCallback} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import { firestore } from '../../../firebase'
import 'firebase/firestore'
import Badge from '@material-ui/core/Badge'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useTheme } from "@material-ui/core/styles"
import { extractDataFromDocumentSnapshot } from '../../../helpers'
import useNewMessages from '../../../hooks/useNewMessages'
import Appoggio from './appoggio';


export default function CourseCard({className, course}) {
    const theme = useTheme()

    const course_id = className.concat('-', course).toLowerCase()
    const homeworkCollectionRef = firestore.collection(`courses/${course_id}/homework`)
    const [homeworkSnapshot] = useCollection(homeworkCollectionRef)
    const homework = homeworkSnapshot?.docs.map(doc => extractDataFromDocumentSnapshot(doc))
    
    const [obj, setObj] = useState({})
    const aggiorna = useCallback((id, counter) => {
        setObj(prev => ({...prev, [id] : counter}))
    }, [])

    const counter = Object.values(obj).reduce((t, value) => t + value, 0)
    //console.log("totale " + counter)
    return (
        <Link to={`/course/${className.toLowerCase()}-${course.toLowerCase()}`} style={{ textDecoration: 'none' }}>
            <Box m={1} pt={1}>    
                <Badge style={{
                        position: 'absolute',
                        display: 'block',
                        right: theme.spacing(3),
                    }} color='secondary' component='div' badgeContent={counter}/>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary">
                        {course}
                        </Typography>
                        
                        <Typography color="textSecondary">
                        {className}
                        </Typography>

                        {homework && homework.map(({ id }) => {
                            return <Appoggio course_id={course_id} homework_id={id} counter_update={aggiorna}/>
                        })}
                    </CardContent>
                </Card>
            </Box>
        </Link>
    )
}