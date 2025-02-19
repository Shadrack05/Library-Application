class Book < ApplicationRecord
    has_many :lendings

    validates :title, presence: true
    validates :author, presence: false
    validates :isbn, presence: false
    validates :status, presence: true
end
