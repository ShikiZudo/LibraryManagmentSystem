import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/book";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export type bookRequest = {
  title: string;
  isbn: string;
  authorName: string;
  publisherName: string;
  edition: string;
  description: string;
  language: string;
  pages: number;
  cost: number;
  bookCount: number;
  imageURL: string;
  link: string;
};

export type bookResponse = {
  id: number;
  title: string;
  isbn: string;
  authorName: string;
  publisherName: string;
  edition: string;
  description: string;
  language: string;
  pages: number;
  cost: number;
  bookCount: number;
  imageURL: string;
  link: string;
};

export interface Page {
  data: bookResponse[];
  nextPage: number | undefined;
  prevPage: number | undefined;
}

export type filterRequestDataType = {
  authorList: string[];
  categoryList: string[];
  languageList: string[];
};

class BookServices {
  async getAllBooks(page: number): Promise<Page> {
    const response = await axios.get(
      `http://localhost:8080/api/v1/book/books?size=${20}&page=${page}`
      // config
    );
    // console.log("book data", response.data);
    const nextPage = page < response.data.totalPages - 1 ? page + 1 : undefined;
    const prevPage = page > 0 ? page - 1 : undefined;
    return {
      data: response.data.content,
      nextPage: nextPage,
      prevPage: prevPage,
    };
  }

  async getBookFilterPage(
    page: number,
    filterRequestData: filterRequestDataType
  ): Promise<Page> {
    const response = await axios.post(
      `http://localhost:8080/api/v1/book/bookFilter?size=${20}&page=${page}`,
      filterRequestData
    );
    const nextPage = page < response.data.totalPages - 1 ? page + 1 : undefined;
    const prevPage = page > 0 ? page - 1 : undefined;
    return {
      data: response.data.content,
      nextPage: nextPage,
      prevPage: prevPage,
    };
  }

  async getBooksByFilter(
    filterRequestData: filterRequestDataType
  ): Promise<bookResponse[]> {
    console.log(filterRequestData);

    const response = await axios.post(
      `http://localhost:8080/api/v1/book/bookFilter`,
      filterRequestData
    );
    return response.data.content;
  }

  async deleteBook(id: number) {
    const response = await axios.delete(
      `${BASE_REST_API_URL}/deletebook/${id}`,
      config
    );
    return response.data;
  }

  async addBook(requestData: bookRequest) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/addbook`,
      requestData,
      config
    );
    return response.data;
  }

  async updateBook(id: number, requestData: bookRequest) {
    const response = await axios.put(
      `${BASE_REST_API_URL}/books/${id}`,
      requestData,
      config
    );
    return response.data;
  }

  getBookById: (id: number) => Promise<bookResponse> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/books/${id}`
      // config
    );
    return response.data;
  };

  getCategoryByBookId: (id: number) => Promise<string[]> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookcategory/${id}`,
      config
    );
    return response.data;
  };

  getLoanCount: (id: number) => Promise<number> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookloancount/${id}`,
      config
    );
    return response.data;
  };

  getReservationCount: (id: number) => Promise<number> = async (id) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookreservationcount/${id}`,
      config
    );
    return response.data;
  };

  loanBook: (userId: number, bookId: number) => Promise<unknown> = async (
    userId,
    bookId
  ) => {
    const response = await axios.post(
      `${BASE_REST_API_URL}/borrow/${userId}/${bookId}`,
      {},
      config
    );
    return response.data;
  };
  reserveBook: (userId: number, bookId: number) => Promise<unknown> = async (
    userId,
    bookId
  ) => {
    const response = await axios.post(
      `${BASE_REST_API_URL}/reserve/${userId}/${bookId}`,
      {},
      config
    );
    return response.data;
  };
  searchBook: (search: string) => Promise<bookResponse[]> = async (search) => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/search/${search}`,
      config
    );
    return response.data;
  };
  getCategory: () => Promise<string[]> = async () => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/getCategory`,
      config
    );
    return response.data;
  };

  getLanguage: () => Promise<string[]> = async () => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/unique-languages`,
      config
    );
    return response.data;
  };

  getAuthor: () => Promise<string[]> = async () => {
    const response = await axios.get(
      `${BASE_REST_API_URL}/unique-authors`,
      config
    );
    return response.data;
  };
}

export default new BookServices();
