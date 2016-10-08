defmodule Wings.Resolver.Article do

  def find %{id: id}, _ do
    result = DB.find_one "articles", %{}
    {:ok, result}
  end

  def find_many _, _ do
    results = DB.find("articles", %{})
    {:ok, results}
  end

  def insert args, _ do
    instance = Map.put(args, :title, args[:title] <> "!")
    DB.insert "articles", instance
    res = %{"id" => instance[:_id], "title" => instance[:title], "content" => instance[:content]}
    Process.sleep(1000)
    IO.inspect args
    {:ok, res}
    #{:error, [%{"message" => "You're doing something wrong.."}]}
  end

end