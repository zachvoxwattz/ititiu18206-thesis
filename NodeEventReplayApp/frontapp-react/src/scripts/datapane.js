import '../css/datapane.css'

const DataPane = () => {
    return(
        <div class = 'dataPane'>
            <div class = 'dpDisplaySlot' id = 'dpSelectBoxDiv'>
                <input id = 'dpSelectBoxValue' type = 'checkbox'/>
            </div>

            <div class = 'dpDisplaySlot' id = 'dpKeyDiv'>
                <p id = 'dpKeyValue'>fa10296e-4ad2-4b99-a4f6-a7f0e4b2d930</p>
            </div>
            
            <div class = 'dpDisplaySlot' id = 'dpOffsetDiv'>
                <p id = 'dpOffsetValue'>1765</p>
            </div>
            
            <div class = 'dpDisplaySlot' id = 'dpPartitionDiv'>
                <p id = 'dpPartitionValue'>0</p>
            </div>
            
            <div class = 'dpDisplaySlot' id = 'dpTopicDiv'>
                <p id = 'dpTopicValue'>tbSorted</p>
            </div>
            
            <div class = 'dpDisplaySlot' id = 'dpMessageDiv'>
                <p id = 'dpMessageValue'>Loremipsumdolorsitametahihidochothisissorandomthatidontknowwhetherwhatisrealityhaihashdhasja9euhfiusdhfuilasdfkjshdfjashdkjf</p>
            </div>
	    </div>
    )
}

export default DataPane
