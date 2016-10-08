defmodule Wings.Resolver.User do

  def find _, _ do
    {:ok, %{"id" => "none", "username" => "cloudle"}}
  end

end