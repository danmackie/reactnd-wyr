export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function avatartocircular(avatarURL) {
  return `${avatarURL.split('.').slice(0, -1).join('.')}-circular.png`
}
