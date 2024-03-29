# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :wings,
  ecto_repos: [Wings.Repo]

# Configures the endpoint
config :wings, Wings.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "N1r/hXGzTAg7TLieUoWHYN8ii/WeJsP3hpL01JPhcLzYBeNzyZOjxfPuM/kl/Qq3",
  render_errors: [view: Wings.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Wings.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :absinthe,
  schema: Schema


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
