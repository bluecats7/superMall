import axios from 'axios'

export function request(option) {
	return new Promise((res,rej)=>{
		const instance=axios.create({
		baseURL:'http://106.54.54.237:8000/api/v1',
        timeout:5000
		});
		//过滤器
		instance.interceptors.response.use(res=>{
		return 	res.data
		});
		instance(option).then(data=>{
			res(data)
		}).catch(err =>{
			rej(err)
		})
	})
}


