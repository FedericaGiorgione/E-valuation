import React from 'react'
import { Paper } from '@material-ui/core'
import 'firebase/firestore'
import format from 'date-fns/format'



function TextMessage({ msg, messageSender, messageBox }) {


    return(
        <ul style={{ textAlign: (msg.ID === 'you') ? 'right' : 'left', listStyle: 'none', paddingLeft: '0' }}>
            <li key={msg.id}>
                <div className={messageSender} style={{ opacity: (msg.ID === 'you') ? '0.6' : '1' }}>
                    {(msg.ID === 'you') ? 'you' : (msg.name + ' ' + msg.surname)}
                </div>
                <Paper className={messageBox} >
                    {msg.message}
                </Paper>
                <div style={{fontSize: "13.5px", color: "darkgray"}}>
                    { msg.createdAt ? format(msg?.createdAt.toDate(), "HH:mm") : "" }
                </div>
            </li>
        </ul>
    )

}

export default TextMessage