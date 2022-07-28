# Support
Служба поддержки.
Пользователь после регистрации может написать тикет, на который позже моожет ответить администратор.
Тикет содержит заголовок, краткое описание и детали.
Тикет может иметь 3 статуcа: заморожен, нерешённый и решён, статусы может менять только администратор.
Под каждым тикетом есть чат.
# Установка
- composer install
- make dc_up
- make app_bash
- php bin/console doctrine:create:schema (Ошибка может быть, если она уже создана)
- php bin/console doctrine:migrations:migrate
- php bin/console doctrine:fixtures:load
- yarn install
- yarn watch
- Сервер развернут на 888 порту (localhost:888)
# Данные
Стандартная учетная запись администратора:
- admin:admin
