
let cleanSourceCode = (source) => {

    source = source
        .replace(/^\s*\n/, '')
        .replace(/\s*$/, '')

    let m = source
        .match(/\s*\w/)

    let p = m && m[0].slice(0, -1)

    return source
        .split('\n')
        .map(v => p ? v.replace(p , '') : v)
        .join('\n')

}

for (let div of document.querySelectorAll('div.code')) {

    let code = cleanSourceCode(div.innerText)
    div.innerText = code

    let button = document.createElement('div')
    button.innerHTML = "exécuter le code"
    button.classList.add('execute-code')
    div.append(button)

    button.onclick = () => {

        eval(code)

    }

}
