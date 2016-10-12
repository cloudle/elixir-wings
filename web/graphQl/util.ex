defmodule Schema.Util do

  def resolve(_, %{source: source, definition: %{name: name}}) when is_map(source) do
    {:ok, Map.get(source, name)}
  end

  def resolve _, _ do
    {:ok, nil}
  end

  def resolve_id _, %{source: source} do
    Map.fetch source, "_id"
  end

  def args_to_document args do
     instance = args |> Map.put(:_id, args[:id]) |> Map.delete(:id)
     for {key, val} <- instance, into: %{}, do: {Atom.to_string(key), val}
  end

  def generate_response {status, response, error} do
    case status do
      :ok -> {:ok, response}
      :error -> {:error, [%{message: error}]}
      _ -> {:error, [%{message: "Unknown response status, this is system bug!"}]}
    end
  end
end