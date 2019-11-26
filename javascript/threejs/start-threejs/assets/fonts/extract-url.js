#!/usr/bin/env node

let main = async () => {

	let res = await fetch('https://fonts.googleapis.com/css?family=Roboto+Mono:100,100i,300,300i,400,400i,500,500i,700,700i&display=swap')
	str = await res.text()

	// str.match(/latin \*\/[\s\S]*?\/\*/g).map(v => v.match(/(https.*?woff2)/g)[0]).join('\n')

	let simplier = s => {

		let [, family] = s.match(/font-family: '(.*)';/)
		let [, style] = s.match(/font-style: (.*);/) || []
		let [,weight] = s.match(/font-weight: (\d{3});/)
		let [url] = s.match(/(https.*?woff2)/)

		let localUrl = family.replace(/\s/g, '') + '-' + style + '-' + weight + '.woff2'

		s = s.replace(url, localUrl)

		console.log(localUrl, url)

		return s
	}

	str = str.match(/\/\* latin \*\/[\s\S]*?\}/g).map(simplier).join('\n')

	console.log(str)

}

main()
