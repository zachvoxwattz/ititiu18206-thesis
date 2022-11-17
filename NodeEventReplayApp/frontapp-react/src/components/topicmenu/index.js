//import { useState } from 'react'
import '../../assets/css/topicmenu.css'

const sample = ['tbSorted', 'tbSortedResults', 'jobQuery'   ]

const TopicMenu = (props) => {

    var currentTopic = props.topic

    console.log(currentTopic)

    const setTopic = (topic) => {
        props.setTopic(topic)
    }

    const toggleVisibility = () => {
        let comp = document.getElementById('topicList')
        let displayStyle = document.getElementById('topicList').style.display

        if (displayStyle === 'flex') {
            comp.style.display = 'none'
        }

        else if (displayStyle === '' || displayStyle === 'none') {
            comp.style.display = 'flex'
        }
    }

    return(
        <div id = 'topicMenuSection'>
            <button id = 'topicToggler' onClick={() => { toggleVisibility() }}>Click and choose a topic below!</button>
            <div id = 'topicList'>
                {
                    sample.map((item, index) => (
                        <button className = 'topicButton' onClick={() => { setTopic(item) }} key = {index}>{item}</button>
                    ))
                }
            </div>
            
            <div id = 'topicStatus'>
                <h3 id = 'topicCurrentLabel'>Currently selected topic:</h3>
                <h3 id = 'topicCurrentValue'>{currentTopic}</h3>
            </div>
        </div>
    )
}

export default TopicMenu
