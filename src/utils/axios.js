const axios = require('axios');
const {
	private_token
} = require('./constants');

// axios 配置
let instance = null

instance = axios.create({
	baseURL: 'http://192.168.1.248:8080/api/v3/',
	timeout: 50000,
	withCredentials: true
})

// http request 拦截器
instance.interceptors.request.use(
	config => {
		let conf = config
		let param = 'Private-Token'

		conf.headers[param] = private_token
		
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response) // 返回接口返回的错误信息
    }
);

function checkStatus(response) {
    return new Promise((resolve, reject) => {
        if (response.status === 200) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
    })
}

module.exports = {
    post(url, data) {
        return instance({
            method: 'post',
            url,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    putform(url, data) {
        return instance({
            method: 'put',
            url,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    postJSON(url, data) {
        return instance({
            method: 'post',
            url,
            data: JSON.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    putJSON(url, data) {
        return instance({
            method: 'put',
            url,
            data: JSON.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    get(url, params) {
        return instance({
            method: 'get',
            url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    },
	put(url, data) {
        return instance({
            method: 'put',
            url,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    delete(url, params) {
        return instance({
            method: 'delete',
            url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    }

}
