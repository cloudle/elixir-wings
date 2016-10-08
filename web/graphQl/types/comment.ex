defmodule Schema.Types.Comment do
  use Absinthe.Schema.Notation

  @desc "User's comment - with parent and child hierachy"
  object :comment do
    field :_id, :id
    field :comment, :string
    field :ower, :user do
      resolve fn _, _ ->
        {:ok, %{_id: "none", username: "Cloud"}}
      end
    end
  end
end