import axios from "axios";

export class AuthService {
  baseUrl = import.meta.env.VITE_BASE_URL;

  async register(payload) {
    const response = await axios.post(
      `${this.baseUrl}/auth/register`,
      payload,
      { withCredentials: true },
    );
    return response.data; // expected: { user, message }
  }

  async login(payload) {
    const response = await axios.post(`${this.baseUrl}/auth/login`, payload, {
      withCredentials: true,
    });
    return response.data; // expected: { user, message }
  }

  async logout() {
    const response = await axios.post(
      `${this.baseUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  async getCurrentUser() {
    const response = await axios.get(`${this.baseUrl}/auth/me`, {
      withCredentials: true,
    });
    return response.data; // expected: { user }
  }
  async getAllUsersAdmin() {
    const response = await axios.get(`${this.baseUrl}/auth/admin/users`, {
      withCredentials: true,
    });

    return response.data;
    // Expected backend format:
    // {
    //   statusCode: 200,
    //   data: [ ...users ],
    //   message: "...",
    //   success: true
    // }
  }
  async deleteUserAdmin(id) {
    const response = await axios.delete(`${this.baseUrl}/auth/admin/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
}

const authService = new AuthService();
export default authService;
