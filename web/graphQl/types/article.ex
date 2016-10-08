defmodule Schema.Types.Article do
  use Absinthe.Schema.Notation

  @desc "An article, e.g: post, tutorial episode"
  object :article do
    field :_id, :id
    field :title, :string
    field :content, :string
  end
end