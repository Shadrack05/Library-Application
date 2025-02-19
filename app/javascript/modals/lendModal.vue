<template>
    <div
    v-if="lendVisible"
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
  >
    <div
      v-if="lendVisible"
      @keydown.escape="closeModal"
      class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
      role="dialog"
      id="modal"
    >
      <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
      <header class="flex justify-end">
        <button
          class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
          aria-label="close"
          @click="closeModal"
        >
          <svg
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </header>
      <!-- Modal body -->
      <div class="mt-4 mb-6">
        <!-- Modal title -->
        <p
          class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
        >
          Lend {{ book.title }} to
        </p>
        <!-- Modal description -->
        <label class="block text-sm">
          <span class="text-gray-700 dark:text-gray-400">Borrower Name</span>
          <input
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder=""
            v-model="borrower_name"
          />
        </label>

      </div>
      <footer
        class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
      >
        <button
          class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          @click="lendBook"
        >
          Lend Book
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from '../stores/store';
import { mapActions } from 'pinia';


export default {
    props: {
        lendVisible: {
            type: Boolean,
            default: false,
            Required: true
        },
        bookData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            book: { ...this.bookData },
            lend: {},
            borrower_name: '',
        };

    },
    methods: {
        ...mapActions(useCounterStore, ['borrowBook', 'fetchBooks', 'fetchLendings']),

    closeModal() {
      this.$emit('closeLend');
    },
    async lendBook() {
        try {
            this.lend.name = this.borrower_name; 
            this.lend.book_id = this.book.id;

            await this.borrowBook(this.lend); // Assuming addGroup is an async action

            this.fetchBooks();
            this.fetchLendings();
            this.closeModal();
            this.resetForm();
        } catch (error) {
        console.error('Error Lending book:', error);
        }
    },
    resetForm () {
        this.title = '';
        this.author = '';
        this.isbn = '';
        this.book = {};
    },

  },
  watch: {
        bookData: {
                handler(newBook) {
                this.book = { ...newBook };
            },
            deep: true,
            immediate: true
        }
    },
}
</script>

<style>
</style>

