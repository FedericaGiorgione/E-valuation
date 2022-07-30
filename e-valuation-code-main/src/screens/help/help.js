import React, {useState} from 'react'
import HeaderHomeBack from '../../components/header/header-home-back'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import HelpCard from './components/help-card'
import { firestore } from '../../firebase'
import { extractDataFromDocumentSnapshot } from '../../helpers'
import { useCollection } from 'react-firebase-hooks/firestore'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



function Help(props) {
    const classes = useStyles();

    const helpCollectionRef = firestore.collection(`faq`)
    const query = helpCollectionRef.orderBy("number", "asc")
    const [helpSnapshot] = useCollection(query)

    const help = helpSnapshot?.docs.map(doc => extractDataFromDocumentSnapshot(doc))

    const [cardOpen, setCardOpen] = useState(null)

    let goBackLink = props.location.state?.prevPath
    if (goBackLink === undefined){
      goBackLink = "/"
    }

    return (
      <b>{helpSnapshot ?
        <div className={classes.root} style={{ height: '100vh', overflow: 'hidden' }}>
            <HeaderHomeBack title={`Frequently Asked Questions`} backArrow={`${goBackLink}`} isFaq="true" />

            <Container style={{ paddingTop: '60px', marginBottom: '40px', height: '100%', overflow: 'scroll' }}>
                {help && help.map(({ id, title, description, number }, index) => {
                //const homework_id = title.toLowerCase().split(" ").join("-")
                    return (
                    <HelpCard
                        open={cardOpen === id}
                        onOpen={() => { cardOpen === id ? setCardOpen(null) : setCardOpen(id)}}
                        key={id}
                        title={title}
                        description={description}
                        panel={number}
                        is_last={index === help.length - 1}
                    />
                    )
                })}
            </Container>

        </div>

        :
        <div>
          <HeaderHomeBack title={` `} backArrow={`/`} />
          <LinearProgress style={{ marginTop: 56 }} color="secondary" />
        </div>
        }</b>
    )

}

export default Help
