<template>
    <div
    v-if="isVisible"
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
  >
    <!-- Modal -->
    <div
      v-if="isVisible"
      @keydown.escape="closeModal"
      class="modal w-full px-6 py-4 overflow-y-auto bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
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
          {{ book.title }} Recent Lending History
        </p>
        <!-- Modal description -->

        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
            >
              <th class="px-4 py-3">Borrower Name</th>
              <th class="px-4 py-3">Borrowed Book</th>
              <th class="px-4 py-3">Borrowed Date</th>
              <th class="px-4 py-3">Returned Date</th>

            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            <tr class="text-gray-700 dark:text-gray-400"
            v-for="lending in book.lendings" :key="book.lendings.id">
              <td class="px-4 py-3 text-sm">
                  {{ lending.name }}
              </td>
              <td class="px-4 py-3 text-sm">
                  {{ book.title }}
              </td>
              <td class="px-4 py-3 text-sm">
                 {{ new Date(lending.borrowed_at).toLocaleString() }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ lending.returned_at ? new Date(lending.returned_at).toLocaleString() : "N/A" }}
              </td>
            </tr>
          </tbody>
        </table>
 

      </div>
      <footer
        class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
      >
        <button
          @click="closeModal"
          class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Close
        </button>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
    props: {
      isVisible: {
        type: Boolean,
        default: false,
        required: true
      },
      bookDetails: {
        type: Object,
        required: true
      }
    },
    data() {
        return {
          book: { ...this.bookDetails },
        };

    },
    methods: {
    closeModal() {
      this.$emit('closeView');
    },

  },
  watch: {
        bookDetails: {
            handler(newbook) {
              this.book = { ...newbook };
            },
            deep: true,
            immediate: true
        }
    },
}
</script>

<style>
.modal {
    max-height: 100vh;
    overflow-y: auto;
  }
</style>

