<template>
    <div class="container px-4 py-4 mx-auto grid bg-white dark:bg-gray-800"
    >
    <button
    class="px- py-2 mt-4 mb-4 w-1/3 text-sm font-medium leading-5 text-white transition-colors duration-150
     bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700
     focus:outline-none focus:shadow-outline-purple"
    @click="openCreateBook()"
  >
    Add Book
  </button>
    <!-- New Table -->
      <div class="w-full overflow-hidden rounded-lg shadow-xs mb-6">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">Title</th>
                <th class="px-4 py-3">Author</th>
                <th class="px-4 py-3">isbn</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Actions</th>

              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <tr class="text-gray-700 dark:text-gray-400"
              v-for="book in books" :key="book.id">
              <td class="px-4 py-3 text-sm">
                {{ book.id }}
            </td>
                <td class="px-4 py-3">
                  <div class="flex items-center text-sm">
                    <div>
                     <button @click="openViewModal(book)"> <p class="font-semibold"> {{ book.title }}</p> </button>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ book.author }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ book.isbn }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ book.status }}
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        @click="openModal(book)"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                          ></path>
                        </svg>
                      </button>
                      <EditModal
                      :editVisible="isModalOpen"
                      :bookData="selectedbook"
                      @closeEdit="closeEdit()"
                      @edit="updatebook"
                      />
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        @click="deletebook(book)"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    <button
                      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Delete"
                      v-if="book.status === 'Available'"
                      @click="lendBook(book)"
                    >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 3v14a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H5a2 2 0 00-2 2zm2 0h10v14H5V3zm2 2h6v2H7V5zm0 4h6v2H7V9z"></path>
                    </svg>
                    </button>
                    </div>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
        >
          <span class="flex items-center col-span-3">
            Showing {{ from }} - {{ to }} of {{ total }} books
          </span>
          <span class="col-span-2"></span>
          <!-- Pagination -->
          <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul class="inline-flex items-center">
                <li>
                  <button
                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                    @click="fetchBooks(currentPage - 1)" :disabled="currentPage === 1"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    v-for="page in lastPage"
                    :key="page"
                    @click="fetchBooks(page)"
                    :class="{
                        'active': currentPage === page,
                        'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple': currentPage !== page,
                        'px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple': currentPage === page
                    }"
                    >
                    {{ page }}
                  </button>
                </li>
                <li>
                  <button
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                    @click="fetchBooks(currentPage + 1)" :disabled="currentPage === lastPage"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>

	<viewModal
    :isVisible="showViewModal"
    :bookDetails="selectedbook"
    @closeView="closeView()"
    />

    <createModal
    :isVisible="isCreateOpen"
    @close="closeCreate()"
    />

    <lendModal
    :lendVisible="isLendOpen"
    :bookData="selectedbook"
    @closeLend="closeLend()"
    @lend="lend()"
    />

</template>

<script>
  import Swal from 'sweetalert2';
  import 'sweetalert2/src/sweetalert2.scss';
  import { useCounterStore } from '../stores/store';
  import { mapState, mapWritableState } from 'pinia';
  import { mapActions } from 'pinia';
  import createModal from '../modals/createModal.vue';
  import EditModal from '../modals/editModal.vue';
  import viewModal from '../modals/viewModal.vue';
  import lendModal from '../modals/lendModal.vue';

  export default {
    inject: ['darkMode'],

    data () {
        return {
            selectedbook: {},
            totalbooks: 0,
            trapCleanup: null,
            showViewModal: false,
            isModalOpen: false,
            isCreateOpen: false,
            isLendOpen: false,
        };
    },
    computed: {
        ...mapWritableState(useCounterStore, ['books', 'searchQuery']),
        ...mapState(useCounterStore, ['to']),
        ...mapState(useCounterStore, ['from']),
        ...mapState(useCounterStore, ['total']),
        ...mapState(useCounterStore, ['lastPage']),
        ...mapState(useCounterStore, ['currentPage']),
        ...mapWritableState(useCounterStore, ['currentView'])
    },
    components: {
        viewModal,
        EditModal,
        createModal,
        lendModal,
    },
    mounted() {
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchBooks', 'removeBook']),

        closeModal() {
            this.isModalOpen = false;
        },
        openModal(book) {
            this.selectedbook = { ...book };
            this.isModalOpen = true;
        },
        closeEdit() {
            this.isModalOpen = false;
        },
        closeLend() {
            this.isLendOpen = false;
        },
        closeCreate() {
            this.isCreateOpen = false;
        },
        updatebook() {
            this.isModalOpen = false;
            this.fetchBooks();
        },
        lendBook(book) {
          this.selectedbook = { ...book };
          this.isLendOpen = true;
        },
        lend() {

        },
        async deletebook(book) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    let bookId = book.id;
                    try {
                        this.removeBook(bookId);
                    } catch (error) {
                        console.error('error deleting book', error);
                    } finally {
                        this.fetchBooks();
                    }
                }
                });
        },
        openViewModal(book) {
            this.selectedbook = { ...book };
            this.showViewModal = true;
        },
        closeView() {
            this.showViewModal = false;
        },
        openCreateBook() {
            this.isCreateOpen = true;
        }
    },
  };
</script>

