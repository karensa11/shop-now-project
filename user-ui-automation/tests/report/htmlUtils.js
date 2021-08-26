module.exports = {
    createBR(){
        return {
            type: 'br'
        }
    },
    createTD(text, className){
        return {
            type: 'td',
            attributes: {class: className},
            content: text
        }
    },
    createTH(text, className){
        return {
            type: 'th',
            attributes: {class: className},
            content: text
        }
    },
    createA(text, link, className){
        return {
            type: 'a',
            attributes: {class: className, href: link},
            content: text
        }
    }
}