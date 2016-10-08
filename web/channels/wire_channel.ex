defmodule Wings.WireChannel do
  use Phoenix.Channel

  def join("wire:core", message, socket) do
    {:ok, socket}
  end

  def handle_info({:after_join, msg}, socket) do
    broadcast! socket, "user:entered", %{user: msg["user"]}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def handle_in("execute", message, socket) do
    query = message["query"]; variables = message["variables"]
    result = query |> Absinthe.run(Schema, [context: %{user_id: 1}, variables: variables])
    {:reply, result, socket}
  end
end