class BooksController < ApplicationController
  before_action :set_book, only: [:update, :destroy]

  def create
    book = Book.new(book_params)
    if book.save
      render json: { message: 'Book created successfully', book: book }, status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @books = Book.includes(:lendings)
                 .where('title LIKE ?', "%#{params[:search]}%")
                 .paginate(page: params[:page], per_page: 30)

    from = ((@books.current_page - 1) * @books.per_page) + 1
    to = [@books.current_page * @books.per_page, @books.total_entries].min

    render json: {
      books: @books.as_json(include: :lendings),
      meta: {
        current_page: @books.current_page,
        total_entries: @books.total_entries,
        last_page: @books.total_pages, 
        from: from,
        to: to
      }
    }
  end

  def update
    if @book.update(book_params)
      render json: { message: 'Book successfully updated', book: @book }
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @book.destroy
      render json: { message: 'Book successfully deleted' }
    else
      render json: { error: 'Failed to delete book' }, status: :unprocessable_entity
    end
  end
  
  private

  def book_params
    params.require(:book).permit(:title, :author, :isbn, :status)
  end

  def set_book
    @book = Book.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Book not found' }, status: :not_found
  end

end
