defmodule Schema.Types.User do
  use Absinthe.Schema.Notation

  @desc "User's main record (without profile)"
  object :user do
    field :_id, :id
    field :username, :string
    field :articles, list_of(:article) do
      resolve fn _args, _ ->
        {:ok, [%{title: "Article 1"}, %{title: "Article 2"}]}
      end
    end
  end
end