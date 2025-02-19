class Lending < ApplicationRecord
  belongs_to :book

  validates :name, presence: true
  validates :borrowed_at, presence: true
  validates :returned_at, presence: false
end
