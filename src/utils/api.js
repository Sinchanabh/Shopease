const API_BASE_URL = 'http://localhost:8000';

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'An error occurred' }));
      const detail = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
      throw new Error(detail);
    }

    return response.json();
  },

  async register(userData) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async login(credentials) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async getCart() {
    return this.request('/cart');
  },

  async addToCart(item) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async updateCartQuantity(itemId, quantity) {
    return this.request(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  async removeFromCart(itemId) {
    return this.request(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  },

  async getWishlist() {
    return this.request('/wishlist');
  },

  async addToWishlist(item) {
    return this.request('/wishlist', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async removeFromWishlist(itemId) {
    return this.request(`/wishlist/${itemId}`, {
      method: 'DELETE',
    });
  },

  async getProducts() {
    return this.request('/products');
  },
};

export default api;
