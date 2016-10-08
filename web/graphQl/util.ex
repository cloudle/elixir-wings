defmodule Schema.Util do

  def resolve(_, %{source: source, definition: %{name: name}}) when is_map(source) do
    {:ok, Map.get(source, name)}
  end

  def resolve _, _ do
    {:ok, nil}
  end

end