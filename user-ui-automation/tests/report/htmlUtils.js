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
    },
    createSimpleTextDiv(text, className){
        return {
            type: 'div',
            attributes: {class: className},
            content: text
        }
    },
    createCheckbox(id, onClick, defaultChecked){
        return {
            type: 'input',
            attributes: {id: id, type: 'checkbox', onclick: onClick, checked: defaultChecked}
        }
    },
    createSpan(text, className, id){
        return {
            type: 'span',
            attributes: {class: className, id: id},
            content: text
        }
    },
    createCenteredDiv(content) {
        return {
            type: 'div',
            attributes: {
                align: 'center'
            },
            content: [content]
        }
    },
    createScript(path){
        return {
            type: 'script',
            attributes: {src: path},
            content: {}
        }
    },
    createScc(path){
        return {
            type: 'link',
            attributes: {rel: 'stylesheet', href: path}
        }
    },
    createTitle(title){
        return {
            type: 'title',
            content: title
        }
    }
};
