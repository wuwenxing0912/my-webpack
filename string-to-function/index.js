import { writeFileSync } from 'fs'

const code = `var a = 1`;
const obj = `{
    code: function(){
        ${code}
    }
}`

writeFileSync("test.js", obj)