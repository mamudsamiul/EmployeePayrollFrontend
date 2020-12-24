import config from "../config/config"
import AxiosService from './axios-service'

export default class  EmployeeService{
    baseUrl = config.baseUrl;
    addEmployee(data) {
        return (new AxiosService()).postService(`${this.baseUrl}/create`, data);
        // return axios.post(`${this.baseUrl}/employeepayrollservice/create`, data);
    }
    getAllEmployees(){
        return (new AxiosService()).getService(`${this.baseUrl}/get`);
    }
    updateEmployee(id, data) {
        return (new AxiosService()).putService(`${this.baseUrl}/update/${id}`, data);
        // return axios.post(`${this.baseUrl}/employeepayrollservice/create`, data);
    }
    deleteEmployee(id){
        return (new AxiosService()).deleteService(`${this.baseUrl}/delete/${id}`);
    }
}