const switchView = (viewString) => {
    switch (viewString) {
        case 'collector':
            document.getElementById('eventCollector').style.display = 'block'
            document.getElementById('eventProcessor').style.display = 'none'
            break

        case 'processor':
            document.getElementById('eventCollector').style.display = 'none'
            document.getElementById('eventProcessor').style.display = 'block'
            break

        default:
            break
    }
}

export { switchView }
