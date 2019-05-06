let cleanSourceCode = (source) => {

    let m = source
        .replace(/\s\n/, '\n')
        .match(/\n\s*?\w/)

    let p = m && m[0].slice(1, -1)

    return source
        .split('\n')
        .filter(v => /\S/.test(v))
        .map(v => p ? v.replace(p , '') : v)
        .join('\n')

}
