import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export const useCounterStore = defineStore('counter', {
    state() {
        return {
            searchQuery: '',
            currentView: 'Books',
            books: [],
            lendings: [],
            currentPage: 1,
            lastPage: 1,
            total: 0,
            from: 0,
            to: 0,
            currentPageLendings: 1,
            lastPageLendings: 1,
            totalLendings: 0,
            fromLendings: 0,
            toLendings: 0,
        };
    },
    actions: {
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        async fetchBooks(page=1) {
            try {
                const params = { page };
                if (this.searchQuery.length >= 3) {
                    params.search = this.searchQuery;
                }
                const response = await axios.get('api/books');
                this.books = response.data.books;
                this.currentPage = response.data.meta.current_page;
                this.lastPage = response.data.meta.last_page;
                this.total = response.data.meta.total_entries;
                this.from = response.data.meta.from;
                this.to = response.data.meta.to;
            } catch (error) {
                let errorMessage = "An unexpected error occurred.";

                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    errorMessage = errorData.message || errorMessage;
                }

                console.error("Error fetching books:", errorMessage);
                alert(errorMessage);
            }
        },

        async addBook(book) {
            try {
                const response = await axios.post('api/create-book', book);
                this.message = response.success;
                this.error = response.error;

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your book has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                return response;
            } catch (error) {
                let errorMessage = "An unexpected error occurred.";

                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    errorMessage = errorData.message || errorMessage;
                }

                console.error("Error adding Book:", errorMessage);
                alert(errorMessage);
                throw error;
            }
        },

        async editBook(bookId, book) {
            try {
                const response = await axios.put(`api/update-book/${bookId}`, book);
                this.message = response;

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your book has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });

                return response;
            } catch (error) {
                let errorMessage = "An unexpected error occurred.";

                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    errorMessage = errorData.message || errorMessage;
                }

                console.error("Error editing book:", errorMessage);
                alert(errorMessage);
                throw error;
            }
        },

    async removeBook(bookId) {
        try {
            const response = await axios.delete(`api/delete-book/${bookId}`);
            this.message = response;

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your book has been deleted",
                showConfirmButton: false,
                timer: 1500
            });

            return response;
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (error.response && error.response.data) {
                const errorData = error.response.data;
                errorMessage = errorData.message || errorMessage;
            }

            console.error("Error removing product:", errorMessage);
            alert(errorMessage);
            throw error;
        }
    },

    async borrowBook(lend) {
        try {
            const response = await axios.post('api/lend-book', lend);
            this.message = response.success;
            this.error = response.error;

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Lend Account has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            return response;
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (error.response && error.response.data) {
                const errorData = error.response.data;
                errorMessage = errorData.message || errorMessage;
            }

            console.error("Error Lending Book:", errorMessage);
            alert(errorMessage);
            throw error;
        }
    },

    async fetchLendings(page=1) {
        try {
            const params = { page };
            if (this.searchQuery.length >= 3) {
                params.search = this.searchQuery;
            }
            const response = await axios.get('api/lendings');
            this.lendings = response.data.lendings;
            this.currentPageLendings = response.data.meta.current_page;
            this.lastPageLendings = response.data.meta.last_page;
            this.totalLendings = response.data.meta.total_entries;
            this.fromLendings = response.data.meta.from;
            this.toLendings = response.data.meta.to;
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (error.response && error.response.data) {
                const errorData = error.response.data;
                errorMessage = errorData.message || errorMessage;
            }

            console.error("Error fetching lendings:", errorMessage);
            alert(errorMessage);
        }
    },

    async returnBook(lend) {
        try {
            const response = await axios.post('api/return-book', lend);
            this.message = response.success;
            this.error = response.error;

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Book return has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            return response;
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (error.response && error.response.data) {
                const errorData = error.response.data;
                errorMessage = errorData.message || errorMessage;
            }

            console.error("Error Returning Book:", errorMessage);
            alert(errorMessage);
            throw error;
        }
    },

    async editLend(lendId, lend) {
        try {
            const response = await axios.put(`api/update-lending/${lendId}`, lend);
            this.message = response;

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Lending has been updated",
                showConfirmButton: false,
                timer: 1500
            });

            return response;
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (error.response && error.response.data) {
                const errorData = error.response.data;
                errorMessage = errorData.message || errorMessage;
            }

            console.error("Error editing Lending:", errorMessage);
            alert(errorMessage);
            throw error;
        }
    },
}

});
