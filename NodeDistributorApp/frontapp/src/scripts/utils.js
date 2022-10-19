module.exports = {
    propsAreValid: function (a, b, c) {
        let toBeSent

        if (a === '') {
            toBeSent = {error: true, message: "ERROR: Array size is needed for creation!"}
            return toBeSent
        }

        if (isNaN(a)) {
            toBeSent = {error: true, message: "ERROR: Given array size is not a number!"}
            return toBeSent
        }

        if (b === '') {
            toBeSent = {error: true, message: "ERROR: A starting value is required!"}
            return toBeSent
        }
        
        if (isNaN(b)) {
            toBeSent = {error: true, message: "ERROR: Given starting value is not a number!"}
            return toBeSent
        }

        if (c === '') {
            toBeSent = {error: true, message: "ERROR: An ending value is required!"}
            return toBeSent
        }        

        if (isNaN(c)) {
            toBeSent = {error: true, message: "ERROR: Given ending value is not a number!"}
            return toBeSent
        }
        
        toBeSent = {error: false}
        return toBeSent
    },
    generateArray: function (a, b, c) {
        let array = []
        let size = parseInt(a)
        let start = parseInt(b)
        let end = parseInt(c)
        let sample

        if (start < end) {
            for (let i = 0; i < size; i++) {
                sample = parseInt(Math.floor(Math.random() * (end - start + 1)) + start) 
                array.push(sample)
            }
        }
        else {
            for (let i = 0; i < size; i++) {
                sample = parseInt(Math.floor(Math.random() * (start - end + 1)) + end) 
                array.push(sample)
            }
        }

        return array
    }
}
