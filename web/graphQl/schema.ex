defmodule Schema do
  use Absinthe.Schema

  import_types Schema.Types.User
  import_types Schema.Types.Article
  import_types Schema.Types.Comment

  default_resolve fn
    _, %{source: source, definition: %{name: name}} when is_map(source) ->
      {:ok, Map.get(source, name)}
    _, _ ->
      {:ok, nil}
  end

  query do
    field :ping, :string do
      resolve fn _, _ -> {:ok, "pong!"} end
    end

    field :user, :user do
      resolve fn _, _ ->
        {:ok, %{id: "none", username: "cloudle"}}
      end
    end

    field :article, :article do
      arg :id, non_null(:string)
      resolve fn %{id: id}, _ ->
        result = DB.find_one "articles", %{}
        {:ok, result}
      end
    end

    field :articles, list_of(:article) do
      resolve fn _, _ ->
        results = DB.find("articles", %{})
        {:ok, results}
      end
    end

    field :comment, :comment do
      resolve fn _, _ ->
        {:ok, %{id: "11", comment: "This is just a comment"}}
      end
    end
  end

  mutation do
    field :insert_article, :article do
      arg :_id, non_null(:string)
      arg :title, non_null(:string)
      arg :content, :string
      resolve fn args, _ ->
        instance = Map.put(args, :title, args[:title] <> "!")
        DB.insert "articles", instance
        res = %{"id" => instance[:_id], "title" => instance[:title], "content" => instance[:content]}
        Process.sleep(1000)
        IO.inspect args
        {:ok, res}
        #{:error, [%{"message" => "You're doing something wrong.."}]}
      end
    end


  end
end