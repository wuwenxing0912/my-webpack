const cssToJs = (code) => `
const css = ${JSON.stringify(code)}
if(document){
   const style = document.createElement('style');
   style.innerHTML = css
   document.head.append(style)
}
export default css
`;

module.exports = cssToJs