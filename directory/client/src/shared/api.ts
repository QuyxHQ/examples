import axios, { AxiosInstance } from 'axios';

export default class Api {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8085',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async spaceInfo() {
        return (await this.client.get('/')).data;
    }

    async getUsers(page = 1, limit = 50) {
        return (await this.client.get(`/users?page=${page}&limit=${limit}`)).data;
    }

    async getUser(address: string) {
        return (await this.client.get(`/user/${address}`)).data;
    }
}
