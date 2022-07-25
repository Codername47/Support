# Support
Служба поддержки.
Пользователь после регистрации может написать тикет, на который позже моожет ответить администратор.
Тикет содержит заголовок, краткое описание и детали.
Тикет может иметь 3 статуcа: заморожен, нерешённый и решён, статусы может менять только администратор.
Под каждым тикетом есть чат.
# Установка
- composer install
- make dc_up
- php bin/console doctrine:create:schema
- php bin/console doctrine:migrations:migrate
- php bin/console doctrine:fixtures:load
# Данные
Стандартная учетная запись администратора:
- admin:admin
