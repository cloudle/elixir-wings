defmodule MongoSupervisor do
  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, :ok, [name: __MODULE__])
  end

  def init(:ok) do
    [ worker(DB, [[database: "wire"]]),
    ] |> supervise(strategy: :one_for_one)
  end
end

defmodule DB do
  use Mongo.Pool, name: __MODULE__, adapter: Mongo.Pool.Poolboy

  def find(doc, filter, opts \\ []) do
    DB |> Mongo.find(doc, filter, opts) |> Enum.to_list
  end

  def find_one(doc, filter, opts \\ []) do
    #Alway replace limit option to 1 whenever it exist
    opts = List.keystore opts, :limit, 0, {:limit, 1}
    DB |> Mongo.find(doc, filter, opts) |> Enum.to_list |> Enum.at(0)
  end

  def insert(doc, instance) do
    DB |> Mongo.insert_one(doc, instance)
  end

  def insert_many(doc, instances) do
    DB |> Mongo.insert_many(doc, instances)
  end

  def destroy(doc, filter) do
    DB |> Mongo.delete_one(doc, filter)
  end

  def destroy_many(doc, filter) do
    DB |> Mongo.delete_many(doc, filter)
  end

  def update(doc, filter, update, opts \\ []) do
    DB |> Mongo.update_one(doc, filter, update, opts)
  end

  def update_many(doc, filter, update, opts \\ []) do
    DB |> Mongo.update_many(doc, filter, update, opts)
  end

#  def start_link do
#    {:ok, _} = MongoWorker.start_link(database: "test")
#  end
end