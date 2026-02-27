import axios from "axios";

export class TaskService {
  baseUrl = import.meta.env.VITE_BASE_URL;

  async createTask(payload) {
    const response = await axios.post(
      `${this.baseUrl}/tasks/`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data; // { task, message }
  }

  async getAllTasks() {
    const response = await axios.get(`${this.baseUrl}/tasks`, {
      withCredentials: true,
    });
    return response.data; // { tasks }
  }

 async updateTaskAdmin(id, payload) {
    const response = await axios.put(
      `${this.baseUrl}/tasks/admin/${id}`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  }

  async deleteTaskAdmin(id) {
    const response = await axios.delete(
      `${this.baseUrl}/tasks/admin/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
  async toggleImportant(id) {
  const response = await axios.patch(
    `${this.baseUrl}/tasks/${id}/important`,
    {},
    { withCredentials: true }
  );

  return response.data; // must return { task }
}
 async moveTaskStatus(id, status) {
    const { data } = await axios.patch(
      `${this.baseUrl}/tasks/${id}/status`,
      { status },
      { withCredentials: true }
    );
    return data; // { task }
  }

  async getAllTasksAdmin() {
  const response = await axios.get(
    `${this.baseUrl}/tasks/admin`,
    { withCredentials: true }
  );
  return response.data;
}
}

const taskService = new TaskService();
export default taskService;