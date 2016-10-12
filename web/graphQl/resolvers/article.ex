defmodule Wings.Resolver.Article do
  @collection "articles"

  def find filters, _ do
    result = DB.find_one @collection, filters
    {:ok, result}
  end

  def find_many _filters, _ do
    results = DB.find @collection, %{}
    {:ok, results}
  end

  def insert args, _ do
    instance = Map.put(args, :title, args[:title] <> "!")
      |> Schema.Util.args_to_document

    {status, response} = DB.insert @collection, instance
    Process.sleep(1000)

    Schema.Util.generate_response {status, instance, response}
  end

  def update args, _ do
    filter = %{_id: args[:id]}
    updates = Schema.Util.args_to_document args

    {status, response} = DB.update @collection, filter, %{"$set" => updates}
    instance = DB.find_one @collection, filter
    Process.sleep(1000)

    {:ok, %{"payload" => instance, "status" => %{"message" => "Success!"}}}
  end

  def destroy %{id: id}, _ do
    filter = %{_id: id}
    {status, response} = DB.destroy @collection, filter

    {:ok, %{"status" => %{"message" => "Success!"}}}
  end
end
