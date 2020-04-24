let http = require('./axios')

module.exports = {
	async getRepoList () {
		let data = await http.get(`/groups/113`)
		return data
	}
}