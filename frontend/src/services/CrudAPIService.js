import axios from "axios";


/*
const myApi = new API({ url:'http://localhost:8080/api' })
myApi.createEntity({ name: 'posts' })
myApi.endpoints.posts.getAll()
.then(({ data }) => console.log(data))
*/

/**
 * 
 */
export default class CrudAPIService {
  constructor({
    url,
    createConfig
  }) {
    this.url = url
    this.endpoints = {}
    this.createConfig = createConfig

    if (!this.createConfig) {
      this.createConfig = () => {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        return config;
      }
    }
  }

  createCRUDEndPoints({
    name
  }) {
    const eps = {};

    const resourceURL = `${this.url}/${name}`;

    eps.getAll = async () => axios.get(resourceURL, this.createConfig());

    eps.getOne = async (id) => axios.get(`${resourceURL}/${id}`, this.createConfig());

    eps.create = async (toCreate) => axios.post(`${resourceURL}`, toCreate, this.createConfig());

    eps.update = async (id, toUpdate) => axios.put(`${resourceURL}/${id}`, toUpdate, this.createConfig());

    eps.delete = async (id) => axios.delete(`${resourceURL}/${id}`, this.createConfig());

    return eps;
  }

  /**
   * creates resource to CRUD endpoint
   * @param {A resource object} resource 
   */
  createResource(resource) {
    this.endpoints[resource.name] = this.createCRUDEndPoints(resource);
  }

  /**
   * 
   * @param {A array of resource object} resources 
   */
  createResources(resources) {
    resources.forEach(element => {
      this.createResource(element)
    });
  }
};