# PAP2023Z-Z30 - Platforma dla korepetytorów

## [SPECYFIKACJA](docs/SPECYFIKACJA.md)

## Setup

### 1. Install dependencies

```bash
yarn install
```

### 2. Pull the environment variables from `env.vault`

#### 2.1. Login to vault

You should have received the credentials in the email.

```bash
npx dotenv-vault@latest login
```

#### 2.2. Pull the environment variables

```bash
npx dotenv-vault@latest pull
```

[More info](https://www.dotenv.org/docs/quickstart)

## Usage

### Development

```bash
yarn dev
```

### Production

```bash
make
```