const getArg = (flag, fallback) => {
  let foundArg = process.argv.find(arg => {
    return arg.indexOf(`--${flag}=`) === 0
  })
  return foundArg ? foundArg.split('=').pop() : fallback
}

module.exports = getArg
