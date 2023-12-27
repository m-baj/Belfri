start:
	@export DOTENV_KEY=$$(npx dotenv-vault@latest keys production) && \
	yarn build && \
	yarn start
