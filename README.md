# Posture Estimation API Usage Application (For Lab Use)

This repository is for obtaining an AppId to create apps using the [Posture Estimation API](https://github.com/kntWT/posture-correction-backend).

# How to Start

## Set Environment Variables

- Project Root
  - Set appropriate environment variables referring to `.env.sample`.
  - Adjust the number of `BACK_END_HOST` as needed, and adjust [docker-compose.yml](docker-compose.yml) and [nginx/default.conf](nginx/default.conf.template.sample) accordingly.
- app ([README.md](app/README.md))
- nginx ([README.md](nginx/README.md))

## Start

- Start with `docker compose up --build`.
  - It can be started in development or production environment depending on the environment variable settings.

# Application Flow

- Select the backend host you want to use from the configured ones.
- Then log in with Google and register user data (or sign in) to that backend.
- Go to the application form page and enter the project name.
- When you press the create button, `appId` will be displayed, so please note it down. (Please note that it is basically displayed only once).

# Notes

- When developing an app using the Posture Estimation API, please include the `appId` obtained with this app in the request header (refer to the [repository's README.md](https://github.com/kntWT/posture-correction-backend) for details).
- Also, be careful not to make a mistake in selecting the host (data is not saved except for the selected host).
