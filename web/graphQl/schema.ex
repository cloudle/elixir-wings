defmodule Schema do
  use Absinthe.Schema
  alias Wings.Resolver, as: Resolver

  import_types Schema.Types.User
  import_types Schema.Types.Article
  import_types Schema.Types.Comment
  import_types Schema.Interfaces.Mutation
  import_types Schema.Interfaces.Node

  default_resolve &Schema.Util.resolve/2

  query do
    field :ping, :string do
      resolve fn _, _ -> {:ok, "pong!"} end
    end

    field :user, :user do
      resolve &Resolver.User.find/2
    end

    field :article, :article do
      arg :id, non_null(:string)
      resolve &Resolver.Article.find/2
    end

    field :articles, list_of(:article) do
      resolve &Resolver.Article.find_many/2
    end

    field :comment, :comment do
      resolve &Resolver.Comment.find/2
    end
  end

  mutation do
    field :insert_article, :article do
      arg :id, non_null(:id)
      arg :title, non_null(:string)
      arg :content, :string
      resolve &Resolver.Article.insert/2
    end

    field :update_article, :mutation_response do
      arg :id, non_null(:id)
      arg :title, :string
      arg :content, :string
      resolve &Resolver.Article.update/2
    end

    field :destroy_article, :mutation_response do
      arg :id, non_null(:id)
      resolve &Resolver.Article.destroy/2
    end
  end
end