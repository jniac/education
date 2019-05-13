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
