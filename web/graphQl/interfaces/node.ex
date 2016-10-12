defmodule Schema.Interfaces.Node do
  use Absinthe.Schema.Notation

  interface :node do
    field :id, :id
  end
end