Rails.application.routes.draw do
  get "/", to: "users#index"
  post "/api/create-book", to: "books#create"
  get "/api/books", to: "books#index"
  put "/api/update-book/:id", to: "books#update"
  delete "api/delete-book/:id", to: "books#destroy"
  post "api/lend-book", to: "lendings#create"
  get "api/lendings", to: "lendings#index"
  post "api/return-book", to: "lendings#return_book"
  put "api/update-lending/:id", to: "lendings#update"
  get "api/fetch-history/:name", to: "lendings#history"
end
