import http from '../http-common';

class TodoService{
  getAll(){
    return http.get('/todoitems');
  }

  create(data) {
    return http.post('/todoitems', data)
  }

  // delete(id){
  //   return http.delete('/todoitems/'+ id)
  // }
  delete(id) {
    return http.delete(`/todoitems/${id}`)
  }

  update(id,data){
    return http.put(`/todoitems/${id}`, data)
  }
}

export default new TodoService();