import axios from "axios";
import { bookRequest } from "./BookServices";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/admin";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export type bookUpdateRequest = {
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
  link: string;
};

type CategoryResponseitem = {
  id: number;
  category: string;
  bookList: null;
};
// "book": {
//   "id": 1,
//   "title": "Things Fall Apart",
//   "isbn": "978-0-395-07122-11",
//   "authorName": "Chinua Achebe",
//   "publisherName": "Chinua Achebe Publishers",
//   "edition": "First Edition",
//   "description": "A novel about the complexities of African society and the effects of colonization.",
//   "language": "English",
//   "pages": 209,
//   "cost": 25.99,
//   "bookCount": 49,
//   "imageURL": "images/things-fall-apart.jpg",
//   "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n"
// }
type LateLoanProps = {
  id: number;
  issueDate: string;
  returnDate: string;
  status: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    contactNo: string;
    address: string;
    noOfBooksLoan: number;
    image: string;
  };
  book: {
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
};
export type LateLoanResponse = LateLoanProps[];

export type CategoryResponse = CategoryResponseitem[];

class AdminServices {
  async getCategory() {
    const response = await axios.get(
      `${BASE_REST_API_URL}/getCategory`,
      config
    );
    return response.data;
  }
  async addCategory(category: string) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/addCategory`,
      { category: category },
      config
    );
    return response.data;
  }
  async deleteCategory(id: number) {
    const response = await axios.delete(
      `${BASE_REST_API_URL}/deleteCategory/${id}`,
      config
    );
    return response.data;
  }
  async returnRequest(UserId: number) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/returnRequest${UserId}`,
      config
    );
    return response.data;
  }
  async getBookLoanHistory(bookId: number) {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookLoanHistory/${bookId}`,
      config
    );
    return response.data;
  }
  async getBookReservationHistory(bookId: number) {
    const response = await axios.get(
      `${BASE_REST_API_URL}/bookReservationHistory/${bookId}`,
      config
    );
    return response.data;
  }
  async getUserLoanHistory(userId: number) {
    const response = await axios.post(
      `${BASE_REST_API_URL}/userLoanHistory${userId}`,
      config
    );
    return response.data;
  }
  async getTotalFine() {
    const response = await axios.get(`${BASE_REST_API_URL}/totalFine`, config);
    return response.data;
  }
  updateBook: (book: bookUpdateRequest, id: number) => Promise<bookRequest> =
    async (book, id) => {
      const response = await axios.patch(
        `${BASE_REST_API_URL}/updateBook/${id}`,
        book,
        config
      );
      return response.data;
    };

  deleteBook: (id: number) => Promise<unknown> = async (id) => {
    const response = await axios.delete(
      `${BASE_REST_API_URL}/deleteBook/${id}`,
      config
    );
    return response.data;
  };

  async getLoanWarnCount() {
    const response = await axios.get(
      `${BASE_REST_API_URL}/loanwarncount`,
      config
    );
    return response.data;
  }

  async lateLoan(): Promise<LateLoanResponse> {
    const response = await axios.get(`${BASE_REST_API_URL}/lateloan`, config);
    return response.data;
  }

  async remindBookRequest() {
    const response = await axios.post(
      `${BASE_REST_API_URL}/remind-book-request`,
      {},
      config
    );
    return response.data;
  }

  async returnBookRequest() {
    const response = await axios.post(
      `${BASE_REST_API_URL}/alert-book-request`,
      {},
      config
    );
    return response.data;
  }
}

export default new AdminServices();
