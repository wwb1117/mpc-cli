let fun = require('./utils/fun')
let path = require('path')
let ora = require('ora')
let inquirer = require('inquirer')
let downLoadGit = require('./utils/gitClone');
const {promisify} = require('util');
let ncp = require('ncp'); 
ncp = promisify(ncp);
const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}\\template`;

downLoadGit = promisify(downLoadGit);

const download = async (repo, tag) => {
	let api = `git@192.168.1.248:mpc_cli_repoList/${repo}.git`; // 下载项目
	if (tag) {
		api += `#${tag}`;
	}
	const dest = `${downloadDirectory}/${repo}`; // 将模板下载到对应的目录中
	downLoadGit(api, dest, (err) => {
		if(!err) {
			return dest
		}
	});
	return dest; // 返回下载目录
};

// 创建项目
module.exports = async (projectName) => {
	const spinner = ora('获取项目模板');
	spinner.start(); // 开始loading

	let groupData = await fun.getRepoList()
	let repos = groupData.projects

	spinner.succeed(); // 结束loading

	const {repo} = await inquirer.prompt({
		name: 'repo',
		type: 'list',
		message: '请选择一个模板应用于项目',
		choices: repos, // 选择模式
	});

	let repoPath = await download(repo)

	await ncp(repoPath, path.join(path.resolve(), projectName));


};