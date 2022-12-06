const autoScrollDown = () => {
    setTimeout(() => {
        let streamTable = document.getElementById('streamTable')
        
        streamTable.scrollTo({
            top: streamTable.scrollHeight + streamTable.scrollTop,
            behavior: 'smooth'
        })
    }, 5)
}

export { autoScrollDown }
