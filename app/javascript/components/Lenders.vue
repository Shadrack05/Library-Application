<template>
    <div class="container px-4 py-4 mx-auto grid bg-white dark:bg-gray-800"
    >
    <!-- New Table -->
      <div class="w-full overflow-hidden rounded-lg shadow-xs mb-6">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">Borrower Name</th>
                <th class="px-4 py-3">Borrowed Book</th>
                <th class="px-4 py-3">Borrowed Date</th>
                <th class="px-4 py-3">Returned Date</th>
                <th class="px-4 py-3">Actions</th>

              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <tr class="text-gray-700 dark:text-gray-400"
              v-for="lending in lendings" :key="lending.id">
                <td class="px-4 py-3 text-sm">
                    <div class="flex items-center text-sm">
                        <div>
                         <button @click="openViewModal(lending)"> <p class="font-semibold">{{ lending.name }}</p> </button>
                        </div>
                    </div>
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ lending.book.title }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ new Date(lending.borrowed_at).toLocaleString() }}
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ lending.returned_at ? new Date(lending.returned_at).toLocaleString() : "N/A" }}
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        @click="openModal(lending)"
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
                      <editLendModal
                      :editVisible="isModalOpen"
                      :lendingData="selectedLending"
                      @closeEdit="closeEdit()"
                      @edit="updateLending"
                      />
                      <button
                      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Delete"
                      @click="returnBook(lending)"
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
            Showing {{ fromLendings }} - {{ toLendings }} of {{ totalLendings }} lendings
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
                    @click="fetchLendings(currentPageLendings - 1)" :disabled="currentPageLendings === 1"
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
                    v-for="page in lastPageLendings"
                    :key="page"
                    @click="fetchLendings(page)"
                    :class="{
                        'active': currentPageLendings === page,
                        'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple': currentPageLendings !== page,
                        'px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple': currentPageLendings === page
                    }"
                    >
                    {{ page }}
                  </button>
                </li>
                <li>
                  <button
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                    @click="fetchLendings(currentPageLendings + 1)" :disabled="currentPageLendings === lastPageLendings"
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

    <returnModal
    :lendVisible="isLendOpen"
    :lendData="selectedLending"
    @closeLend="closeLend()"
    @lend="lend()"
    />

    <viewLendModal
    :viewVisible="isViewOpen"
    :viewData="history"
    @closeView="closeViewLend()"
    />

</template>
<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import 'sweetalert2/src/sweetalert2.scss';
  import { useCounterStore } from '../stores/store';
  import { mapState, mapWritableState } from 'pinia';
  import { mapActions } from 'pinia';
  import returnModal from '../modals/returnModal.vue';
  import editLendModal from '../modals/editLendModal.vue';
  import viewLendModal from '../modals/viewLendModal.vue';

  export default {
    inject: ['darkMode'],

    data () {
        return {
            selectedLending: {},
            totallendings: 0,
            trapCleanup: null,
            showViewModal: false,
            isModalOpen: false,
            isCreateOpen: false,
            isLendOpen: false,
            isViewOpen: false,
            history: {}
        };
    },
    computed: {
        ...mapWritableState(useCounterStore, ['lendings', 'searchQuery']),
        ...mapState(useCounterStore, ['toLendings']),
        ...mapState(useCounterStore, ['fromLendings']),
        ...mapState(useCounterStore, ['totalLendings']),
        ...mapState(useCounterStore, ['lastPageLendings']),
        ...mapState(useCounterStore, ['currentPageLendings']),
        ...mapWritableState(useCounterStore, ['currentView'])
    },
    components: {
        returnModal,
        editLendModal,
        viewLendModal,
    },
    mounted() {
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchLendings', 'removeLending']),

        closeModal() {
            this.isModalOpen = false;
        },
        openModal(lending) {
            this.selectedLending = { ...lending };
            this.isModalOpen = true;
        },
        closeViewLend() {
            this.isViewOpen = false;
        },
        closeEdit() {
            this.isModalOpen = false;
        },
        returnBook(lending) {
            this.selectedLending = { ...lending };
            this.isLendOpen = true;
        },
        closeLend() {
            this.isLendOpen = false;
        },
        closeCreate() {
            this.isCreateOpen = false;
        },
        updateLending() {
            this.isModalOpen = false;
            this.fetchLendings();
        },
        async openViewModal(lending) {
            let lendingData = { ...lending };
            let name = lendingData.name;

            try {
                const response = await axios.get(`api/fetch-history/${name}`);
                this.history = response.data;

            } catch(error) {
                let errorMessage = "An unexpected error occurred.";

                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    errorMessage = errorData.message || errorMessage;
                }

                console.error("Error fetching borrower history:", errorMessage);
                alert(errorMessage);
            }
            this.isViewOpen = true;

        },
        lend() {
            //
        },
        async deletelending(lending) {
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
                    let lendingId = lending.id;
                    try {
                        this.removeLending(lendingId);
                    } catch (error) {
                        console.error('error deleting lending', error);
                    } finally {
                        this.fetchLendings();
                    }
                }
                });
        },
        closeView() {
            this.showViewModal = false;
        },
        openCreateLending() {
            this.isCreateOpen = true;
        }
    },
  };
</script>

