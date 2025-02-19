class LendingsController < ApplicationController
    before_action :set_lending, only: [ :update ]

    def create
        book = Book.find_by(id: params[:book_id], status: "Available")

        if book.nil?
          return render json: { error: "Book not available or not found" }, status: :unprocessable_entity
        end

        ActiveRecord::Base.transaction do
          lending = Lending.create!(
            book_id: book.id,
            name: params[:name], # Borrower's name
            borrowed_at: Time.current
          )

          book.update!(status: "Borrowed") # Update book status

          render json: { message: "Book borrowed successfully", lending: lending }, status: :created
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.message }, status: :unprocessable_entity
      end


      def index
        @lendings = Lending.includes(:book)
                           .where("name LIKE ?", "%#{params[:search]}%")
                           .paginate(page: params[:page], per_page: 30)

        from = ((@lendings.current_page - 1) * @lendings.per_page) + 1
        to = [ @lendings.current_page * @lendings.per_page, @lendings.total_entries ].min

        render json: {
          lendings: @lendings.as_json(include: :book),
          meta: {
            current_page: @lendings.current_page,
            total_entries: @lendings.total_entries,
            last_page: @lendings.total_pages,
            from: from,
            to: to
          }
        }
      end


      def return_book
        lending = Lending.find_by(book_id: params[:book_id], returned_at: nil)

        if lending.nil?
          return render json: { error: "Lending record not found or book already returned" }, status: :unprocessable_entity
        end

        ActiveRecord::Base.transaction do
          lending.update!(returned_at: Time.current)
          lending.book.update!(status: "Available")

          render json: { message: "Book returned successfully", lending: lending }, status: :ok
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def update
        if @lending.update(lending_params)
          render json: { message: "Lending successfully updated", lending: @lending }
        else
          render json: { errors: @lending.errors.full_messages }, status: :unprocessable_entity
        end
      end


      def history
        borrower_name = params[:name]
        lendings = Lending.includes(:book).where(name: borrower_name)

        if lendings.exists?
          render json: {
            borrower: borrower_name,
            borrow_history: lendings.as_json(include: :book)
          }
        else
          render json: { message: "No borrowing history found for #{borrower_name}" }, status: :not_found
        end
      end

      private

      def set_lending
        @lending = Lending.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Lending not found" }, status: :not_found
      end

      def lending_params
        params.require(:lending).permit(:name) # Only allow updating borrower name
      end
end
