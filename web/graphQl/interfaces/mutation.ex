defmodule Schema.Interfaces.Mutation do
  use Absinthe.Schema.Notation

  object :mutation_status do
    field :error, list_of(:string)
    field :message, :string
  end

  @desc "Mutation payload of all kind"
  union :mutation_payload do
    types [:article, :user]
    resolve_type fn
      %{"title" => _, "content" => _}, _ -> :article
      _, _ -> :user
    end
  end

  @desc "Mutation response of all kind"
  object :mutation_response do
    field :status, :mutation_status
    field :payload, :mutation_payload
  end
end