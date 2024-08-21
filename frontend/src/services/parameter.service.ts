import http from './http';
import TokenService from './token.service';
import tokenService from './token.service';
import { User } from '../store/types/types';
///////////////// ajeitar /////////
const user: User = tokenService.getUser();
class ParamService {
  async create(clone_id: number, title: string, description: string) {
    return http
      .post('/parameter', {
        user_id: user.id,
        clone_id,
        title,
        description
      })
      .then((response) => {
        return response.data;
      });
  }
  async delete(id: number) {
    // console.log('dd', id);
    return http.delete(`/parameter/delete/${id}`).then((response) => {
      return response.data;
    });
  }
  async update(id: number, title: string, description: string) {
    return http
      .put(`/parameter/${id}`, {
        id,
        user_id: user.id,
        title,
        description
      })
      .then((response) => {
        return response.data;
      });
  }
  // async delete(id: number, title: string, description: string) {
  //   return http
  //     .delete(`/parameter/${id}`, {
  //       id,
  //       user_id: user.id,
  //       title,
  //       description
  //     })
  //     .then((response) => {
  //       return response.data;
  //     });
  // }

  async getByUserId() {
    return http.get(`/parameter/get-by-user-id/${user.id}`).then((response) => {
      return response.data;
    });
  }

  async updateUserParamSetting(parameter_id: number) {
    return http
      .put(`/parameter/update-user/${user.id}`, { parameter_id })
      .then((response) => {
        return response.data;
      });
  }
  // async deleteParamInfo(
  //   id: number,
  //   parameter_id: number,
  //   param_index: string,
  //   value: object
  // ) {
  //   return http
  //     .delete(`/parameter/${parameter_id}`, {
  //       parameter_id,
  //       // param_index,
  //       // value
  //     })
  //     .then((response) => {
  //       return response.data;
  //     });
  // }
  async createParamInfo(
    parameter_id: number,
    param_index: string,
    value: object
  ) {
    return http
      .post('/parameter/info', {
        parameter_id,
        param_index,
        value
      })
      .then((response) => {
        return response.data;
      });
  }

  async updateParamInfo(
    id: number,
    parameter_id: number,
    param_index: string,
    value: object
  ) {
    return http
      .put(`/parameter/info/${id}`, {
        parameter_id,
        param_index,
        value
      })
      .then((response) => {
        return response.data;
      });
  }

  async getParamInfo(parameter_id: number) {
    return http
      .get(`/parameter/info/get-all?parameter_id=${parameter_id}`)
      .then((response) => {
        return response.data;
      });
  }
}

export default new ParamService();
