//import { useState } from 'react'
import '../../assets/css/topicmenu.css'

const sample = ['tbSorted', 'tbSortedResults', 'jobQuery'   ]

const TopicMenu = (props) => {

    var currentTopic = props.topic

    console.log(currentTopic)

    const setTopic = (topic) => {

        if (topic === false) {
            props.setTopic(false)
            return
        }

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

    const clearSelection = () => {
        setTopic(false)
        let displayStyle = document.getElementById('topicList').style.display
        
        if (displayStyle === 'none' || displayStyle === '') return
        else {
            document.getElementById('topicList').style.display = 'none'
        }
    }

    return(
        <div id = 'topicMenuSection'>
            <button className = 'topicInteractionButtons' id = 'topicDisplayToggle' onClick={() => { toggleVisibility() }}>Get and show topics</button>
            <button className = 'topicInteractionButtons' id = 'topicClearer' onClick={() => { clearSelection() }}>Clear selection</button>
            <div id = 'topicList'>
                {
                    sample.map((item, index) => (
                        <button className = 'topicButton' onClick={() => { setTopic(item) }} key = {index}>{item}</button>
                    ))
                }
            </div>
            
            <div id = 'topicStatus'>
                <h3 id = 'topicCurrentLabel'>Currently selected topic:</h3>
                <h3 id = 'topicCurrentValue'>{currentTopic === false ? 'None' : currentTopic}</h3>
            </div>
        </div>
    )
}

export default TopicMenu
