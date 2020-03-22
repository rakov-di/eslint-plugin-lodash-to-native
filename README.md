Домашка по тулингу. Плагин для ESLint

# Установка <a name="#install"></a>

Сначала установите [ESLint](http://eslint.org/):

```bash
npm i -D eslint
```

Затем установите плагин с правилом `lodash-to-native`:

```bash
npm i -D https://github.com/rakov-di/eslint-plugin-lodash-to-native
```

# Использование <a name="#use"></a>

Добавьте плагин `lodash-to-native` в блог `plugin` в вашем файле с конфигурацией ESLint `.eslintrc`. Можно опустить префикс `eslint-plugin-`:
```
{
  "plugins": [
    "lodash-to-native"
  ]
}
```

В блоке `rules` укажите правило, которое хотите подключить:
```
{
  "rules": {
    "lodash-to-native/map": "warn"
  }
}
```

# Поддерживаемые правила <a name="#rules"></a>

lodash-to-native/map

# Для разработчиков <a name="#developers"></a>

Скачайте репозиторий и перейдите в него:
```bash
git clone https://github.com/MOTORIST/eslint-plugin-lodash-to-native#installation
cd eslint-plugin-lodash-to-native
```

Установите необходимые npm-пакеты:
```bash
npm install
```

Для запуска тестов наберите:
```bash
npm test
```

Для запуска тестов на реальном js-кода запустите
```bash
eslint test.js
```
