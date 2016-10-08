defmodule Wings.Router do
  use Wings.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
#    plug Plug.RequestId
#    plug Plug.Logger
#    plug Plug.Parsers,
#      parsers: [:urlencoded, :multipart, :json],
#      pass: ["*/*"],
#      json_decoder: Poison
  end

  scope "/" do
    pipe_through :api

    forward "/api", Absinthe.Plug.GraphiQL, schema: Schema
  end

  scope "/", Wings do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Wings do
  #   pipe_through :api
  # end
end
