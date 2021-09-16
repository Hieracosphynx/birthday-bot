import Birthday from '../actions/Birthday'

const main = (client) => {
  setInterval(() => Birthday(client), 3600000)
}

const ready = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}`)
    main(client)
  }
}

export default ready
