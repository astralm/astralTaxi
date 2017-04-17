# astralTaxi
### Основная статья для архитектуры
https://habrahabr.ru/company/mailru/blog/303456/
### Подготовка
- 1 ) ``` git clone https://github.com/astralm/astralTaxi.git . ```
- 2 ) ``` npm i ```
### Сборка
для успешной сборки потребуется установить голобально webpack версии 1.12.14 : ``` npm i -g webpack@1.12.14 ```

также для подъёма сервера отладки понадобиться голобальный webpack-dev-server версии 1.14.1 : ``` npm i -g webpack-dev-server@1.14.1 ```

Чтобы создать bundle.js : ``` webpack ```

### Запуск

Чтобы запустить локальный сервер : ``` webpack-dev-server ```

### Тетирование

Для запуска тестов : ``` npm run test ```

Для запуска тестов при изменениях : ``` npm run test:watch ```

### Дополнения 

bundle.js содержит не только весь js код, но и весь css код.

