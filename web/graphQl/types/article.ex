defmodule Schema.Types.Article do
  use Absinthe.Schema.Notation

  @desc "An article, e.g: post, tutorial episode"
  object :article do
    field :id, :id ,do: resolve &Schema.Util.resolve_id/2
    field :title, :string
    field :content, :string
  end
end