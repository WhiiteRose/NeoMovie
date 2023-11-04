# my_allocine_TOM_ROGER

Neomovie is a fullstack responsive Movie Website, where you can
find the last Film, TV Series and Actors Detail.

## Table des Matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Issue](#Issue)

## Installation

To start this project, you first need to clone the GitHub repository:

```bash
git clone git@github.com:juniorconseiltaker-technicaltest/my_allocine_TOM_ROGER.git
```

## Utilisation

```bash
  docker-compose up ---build
```

After that, the server should be running in one terminal, and the client in another.

You can access the site by entering the following URL into your preferred web browser:

```bash
http://localhost:3000
```

## Issue

If you encounter any issues, here are various solutions to common problems to get the project up and running:

### Other Docker container running:

```bash
  docker-compose down -v
```

### Mongodb is running:

```bash
  sudo systemctl stop mongodb
```

### Docker Daemon not running

```bash
sudo systemctl start docker 
```

If you have any other issues, please contact me at [tom.roger@epitech.eu](mailto:tom.roger@epitech.eu) for assistance.
