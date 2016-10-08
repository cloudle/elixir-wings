defmodule Wings.Resolver.Comment do

  def find _, _ do
    {:ok, %{id: "11", comment: "This is just a comment"}}
  end

end