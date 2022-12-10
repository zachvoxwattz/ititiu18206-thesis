import '../css/toggle-button.css'

const sortCycle = [
    {
        id: 'bubble', 
        name: "Bubble Sort",
        color: "#990000"
    }, 
    {
        id: 'insertion', 
        name: "Insertion Sort",
        color: "#74B72E"
    }, 
    {
        id: 'selection', 
        name: "Selection Sort",
        color: "#CC5500"
    }, 
    {
        id: 'shell', 
        name: "Shell Sort",
        color: "#5CC7B2"
    }
]

const SortAlgorithmToggleButton = (props) => {

    let currentSorter = props.sorter
    
    const update = par => {
        props.updateSorter(par)
    }

    const cycleSortAlgo = () => {
        for (let i = 0; i < sortCycle.length; i++) {
            if (sortCycle[i].id === currentSorter) {
                let nextChoice
                
                if (sortCycle.length - i === 1) nextChoice = 0
                else nextChoice = i + 1

                update(sortCycle[nextChoice].id)
                document.getElementById('toggleButton').style.backgroundColor = sortCycle[nextChoice].color
                break
            }
        }
    }

    return(
        <div id = 'sortAlgoHolder'>
            <button id = 'toggleButton' onClick={() => cycleSortAlgo()}>Algorithm - {getSortAlgoName(currentSorter)}</button>
        </div>
    )
}

const getSortAlgoName = par => {
    let sorterName

    for (let i = 0; i < sortCycle.length; i++) {
        if (sortCycle[i].id === par) {
            sorterName = sortCycle[i].name
            break
        }
    }

    return sorterName
}

export default SortAlgorithmToggleButton
