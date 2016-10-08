defmodule Wings.PageController do
  use Wings.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
